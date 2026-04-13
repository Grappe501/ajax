import { NextResponse } from "next/server";

import { ASSISTANT_SYSTEM_PROMPT } from "@/content/assistant-knowledge";

const MAX_MESSAGES = 16;
const MAX_USER_CHARS = 2000;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
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
        model: "gpt-4o-mini",
        temperature: 0.35,
        max_tokens: 700,
        messages: [{ role: "system", content: ASSISTANT_SYSTEM_PROMPT }, ...cleaned],
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("OpenAI error:", res.status, t.slice(0, 200));
      return NextResponse.json(
        { error: "assistant_unavailable", message: "Try again in a moment." },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json(
        { error: "empty_response", message: "No reply from assistant." },
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
