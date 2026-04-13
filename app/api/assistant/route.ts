import { NextResponse } from "next/server";

import { getAssistantSystemContent } from "@/content/assistant-knowledge";
import { getOpenAIApiKey, OPENAI_CHAT_MODEL } from "@/lib/ai/env";

const MAX_MESSAGES = 16;
const MAX_USER_CHARS = 2000;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "not_configured",
        message:
          "The assistant is not configured on this server yet. Use the FAQ or email the campaign.",
      },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(rawMessages)) {
    return NextResponse.json({ error: "messages array required" }, { status: 400 });
  }

  const cleaned: ChatMessage[] = [];
  for (const m of rawMessages.slice(-MAX_MESSAGES)) {
    if (!m || typeof m !== "object") continue;
    const role = (m as { role?: string }).role;
    const content = (m as { content?: string }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string" || !content.trim()) continue;
    cleaned.push({
      role,
      content: content.slice(0, role === "user" ? MAX_USER_CHARS : 8000),
    });
  }

  if (cleaned.length === 0 || cleaned[cleaned.length - 1]?.role !== "user") {
    return NextResponse.json(
      { error: "Last message must be from the user" },
      { status: 400 },
    );
  }

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OPENAI_CHAT_MODEL,
        temperature: 0.4,
        max_tokens: 900,
        messages: [{ role: "system", content: getAssistantSystemContent() }, ...cleaned],
      }),
    });

    const rawText = await res.text();

    if (!res.ok) {
      let openaiMessage = "";
      try {
        const errJson = JSON.parse(rawText) as { error?: { message?: string; code?: string } };
        openaiMessage = errJson.error?.message ?? "";
      } catch {
        /* ignore */
      }
      console.error("OpenAI error:", res.status, openaiMessage || rawText.slice(0, 300));

      if (res.status === 401) {
        return NextResponse.json(
          {
            error: "not_configured",
            message:
              "Assistant API key is invalid or expired. Check OPENAI_API_KEY on the server (e.g. Netlify env vars).",
          },
          { status: 503 },
        );
      }
      if (res.status === 429) {
        return NextResponse.json(
          {
            error: "rate_limited",
            message: "The assistant is busy right now. Please try again in a minute.",
          },
          { status: 503 },
        );
      }
      return NextResponse.json(
        {
          error: "assistant_unavailable",
          message: "The assistant could not complete a reply. Try again in a moment.",
        },
        { status: 502 },
      );
    }

    let data: { choices?: { message?: { content?: string | null }; finish_reason?: string }[] };
    try {
      data = JSON.parse(rawText) as typeof data;
    } catch {
      console.error("OpenAI: non-JSON success body", rawText.slice(0, 200));
      return NextResponse.json(
        { error: "assistant_unavailable", message: "Unexpected response from assistant." },
        { status: 502 },
      );
    }

    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      const reason = data.choices?.[0]?.finish_reason;
      console.error("OpenAI: empty assistant content", { finish_reason: reason });
      return NextResponse.json(
        { error: "empty_response", message: "No reply from assistant. Try rephrasing your question." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error("assistant route:", e);
    return NextResponse.json(
      { error: "network", message: "Could not reach assistant." },
      { status: 502 },
    );
  }
}
