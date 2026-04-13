import { NextResponse } from "next/server";

import { getCampaignAdminSession } from "@/lib/admin/auth";
import {
  getAdminPersona,
  getWardPersona,
  type AdminAgentId,
  type WardAgentId,
} from "@/lib/agents/personas";
import {
  toolCampaignPulseSnapshot,
  toolSearchVotersInWard,
  toolSummarizeReachList,
} from "@/lib/agents/tool-executors";
import { getOpenAIApiKey } from "@/lib/ai/env";
import { getMyOrganizerIdForWard } from "@/lib/reach/organizer";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const MAX_MESSAGES = 24;
const MAX_USER_CHARS = 2000;
const MAX_TOOL_ROUNDS = 6;

const WARD_AGENTS = new Set<string>(["piney", "comet", "dawn"]);
const ADMIN_AGENTS = new Set<string>(["ivory", "agent409", "comet_ops", "dawn_ops", "ajax_ops"]);

type ChatRole = "user" | "assistant" | "system" | "tool";
type ChatMessage = { role: ChatRole; content: string | null; tool_call_id?: string; name?: string };

const wardTools = [
  {
    type: "function" as const,
    function: {
      name: "search_voters_in_my_ward",
      description:
        "Search the voter directory for the organizer's current ward. Use for name or address lookups.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Search text (name, street, etc.)" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "summarize_my_reach_list",
      description:
        "Summarize how many people are on this organizer's Power of 5 reach list and sample names.",
      parameters: { type: "object", properties: {} },
    },
  },
];

const adminTools = [
  {
    type: "function" as const,
    function: {
      name: "get_campaign_pulse_snapshot",
      description:
        "Live counts: events by status, organizers, volunteer signups, and pending event submission titles.",
      parameters: { type: "object", properties: {} },
    },
  },
];

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "not_configured", message: "Supabase not configured." }, { status: 503 });
  }

  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "OPENAI_API_KEY is not set on the server." },
      { status: 503 },
    );
  }

  let body: {
    agent?: string;
    wardSlug?: string;
    messages?: { role: string; content?: string }[];
  };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const agent = typeof body.agent === "string" ? body.agent.trim() : "";
  const wardSlug = typeof body.wardSlug === "string" ? body.wardSlug.trim() : "";

  if (!WARD_AGENTS.has(agent) && !ADMIN_AGENTS.has(agent)) {
    return NextResponse.json({ error: "unknown_agent" }, { status: 400 });
  }

  const isWard = WARD_AGENTS.has(agent);
  if (isWard) {
    if (!wardSlug) {
      return NextResponse.json({ error: "wardSlug required for this agent" }, { status: 400 });
    }
    const gate = await getMyOrganizerIdForWard(wardSlug);
    if (!gate.ok) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
  } else {
    const admin = await getCampaignAdminSession();
    if (!admin.ok) {
      const status = admin.reason === "not_signed_in" ? 401 : 403;
      return NextResponse.json({ error: "Unauthorized" }, { status });
    }
  }

  const rawMessages = Array.isArray(body.messages) ? body.messages : [];
  const cleaned: { role: "user" | "assistant"; content: string }[] = [];
  for (const m of rawMessages.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") continue;
    const role = m.role;
    const content = typeof m.content === "string" ? m.content : "";
    if (role !== "user" && role !== "assistant") continue;
    if (!content.trim()) continue;
    cleaned.push({
      role,
      content: content.slice(0, role === "user" ? MAX_USER_CHARS : 8000),
    });
  }

  if (cleaned.length === 0 || cleaned[cleaned.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "Last message must be from the user" }, { status: 400 });
  }

  const systemContent = isWard
    ? getWardPersona(agent as WardAgentId)
    : getAdminPersona(agent as AdminAgentId);

  const tools = isWard ? wardTools : adminTools;

  type Msg = {
    role: "system" | "user" | "assistant" | "tool";
    content: string | null;
    tool_calls?: unknown;
    tool_call_id?: string;
    name?: string;
  };

  const messages: Msg[] = [{ role: "system", content: systemContent }, ...cleaned];

  let rounds = 0;
  let lastAssistantText = "";

  while (rounds < MAX_TOOL_ROUNDS) {
    rounds += 1;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 900,
        messages,
        tools,
        tool_choice: "auto",
      }),
    });

    const rawText = await res.text();
    if (!res.ok) {
      console.error("agent OpenAI:", res.status, rawText.slice(0, 400));
      return NextResponse.json(
        { error: "assistant_unavailable", message: "Assistant request failed." },
        { status: 502 },
      );
    }

    const data = JSON.parse(rawText) as {
      choices?: {
        message?: {
          role?: string;
          content?: string | null;
          tool_calls?: Array<{
            id: string;
            type?: string;
            function?: { name: string; arguments: string };
          }>;
        };
      }[];
    };

    const choice = data.choices?.[0]?.message;
    if (!choice) {
      return NextResponse.json({ error: "empty_response" }, { status: 502 });
    }

    const toolCalls = choice.tool_calls;
    if (toolCalls && toolCalls.length > 0) {
      messages.push({
        role: "assistant",
        content: choice.content ?? null,
        tool_calls: toolCalls,
      });

      for (const tc of toolCalls) {
        const fn = tc.function?.name ?? "";
        let result: unknown = { error: "unknown_tool" };
        try {
          if (isWard) {
            if (fn === "search_voters_in_my_ward") {
              const args = JSON.parse(tc.function?.arguments ?? "{}") as { query?: string };
              const q = typeof args.query === "string" ? args.query : "";
              result = await toolSearchVotersInWard(wardSlug, q);
            } else if (fn === "summarize_my_reach_list") {
              result = await toolSummarizeReachList(wardSlug);
            }
          } else if (fn === "get_campaign_pulse_snapshot") {
            result = await toolCampaignPulseSnapshot();
          }
        } catch (e) {
          console.error("agent tool:", fn, e);
          result = { error: "tool_failed" };
        }

        messages.push({
          role: "tool",
          tool_call_id: tc.id,
          content: JSON.stringify(result),
        });
      }
      continue;
    }

    lastAssistantText = choice.content?.trim() ?? "";
    break;
  }

  if (!lastAssistantText) {
    return NextResponse.json(
      { error: "empty_response", message: "No assistant reply after tool use." },
      { status: 502 },
    );
  }

  return NextResponse.json({ reply: lastAssistantText });
}
