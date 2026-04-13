import { NextResponse } from "next/server";

import { getSttPromptHint } from "@/content/vocabulary";
import type { VoiceCleanupMode } from "@/lib/voice/modes";

const MAX_IN = 8000;

function modeInstructions(mode: VoiceCleanupMode): string {
  switch (mode) {
    case "notes":
      return `You clean up spoken campaign notes. Output JSON only with keys: summary (string), support_hint (string|null), follow_up_hint (string|null), contact_note (string|null).
Keep summary under 400 characters. Use null when unknown. Jacksonville, Arkansas context.`;
    case "data_entry":
      return `You normalize spoken data for forms. Output JSON only: { "normalized": string, "field_type": "phone"|"email"|"address"|"other", "low_confidence": boolean }
Expand spoken digits to phone format when clearly a phone number.`;
    case "quick_tag":
      return `Map speech to a short status tag. Output JSON only: { "tag": string, "detail": string }
Use tags like: supporter, undecided, wrong_number, moved, callback, declined, other.`;
    case "ask_ajax":
      return `Polish a spoken question for the AJAX assistant (no answer, just clearer phrasing). Output JSON only: { "question": string }`;
    default:
      return "Return JSON { \"text\": string } with cleaned transcript.";
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "OPENAI_API_KEY is not set on the server." },
      { status: 503 },
    );
  }

  let body: { raw?: string; mode?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw = typeof body.raw === "string" ? body.raw.trim() : "";
  if (!raw || raw.length > MAX_IN) {
    return NextResponse.json({ error: "raw transcript required" }, { status: 400 });
  }

  const mode = (body.mode ?? "notes") as VoiceCleanupMode;
  if (!["notes", "data_entry", "quick_tag", "ask_ajax"].includes(mode)) {
    return NextResponse.json({ error: "invalid mode" }, { status: 400 });
  }

  const vocab = getSttPromptHint();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 500,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content: `${modeInstructions(mode)}\nCampaign vocabulary context: ${vocab}`,
          },
          { role: "user", content: raw },
        ],
      }),
    });

    const rawText = await res.text();
    if (!res.ok) {
      console.error("cleanup OpenAI:", res.status, rawText.slice(0, 200));
      return NextResponse.json({ error: "cleanup_failed" }, { status: 502 });
    }

    const data = JSON.parse(rawText) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content?.trim();
    if (!content) {
      return NextResponse.json({ error: "empty_response" }, { status: 502 });
    }

    let structured: Record<string, unknown>;
    try {
      structured = JSON.parse(content) as Record<string, unknown>;
    } catch {
      structured = { raw: content };
    }

    let cleanedText = content;
    if (mode === "notes" && typeof structured.summary === "string") {
      cleanedText = structured.summary;
    } else if (mode === "ask_ajax" && typeof structured.question === "string") {
      cleanedText = structured.question;
    } else if (mode === "data_entry" && typeof structured.normalized === "string") {
      cleanedText = structured.normalized;
    } else if (mode === "quick_tag" && typeof structured.tag === "string") {
      cleanedText = [structured.tag, typeof structured.detail === "string" ? structured.detail : ""]
        .filter(Boolean)
        .join(" — ");
    }

    return NextResponse.json({
      cleaned: cleanedText,
      structured,
    });
  } catch (e) {
    console.error("cleanup route:", e);
    return NextResponse.json({ error: "network" }, { status: 502 });
  }
}
