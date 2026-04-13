import { NextResponse } from "next/server";

import { elevenLabsMp3Stream } from "@/lib/elevenlabs/tts-stream";

/** Alias for `/api/assistant/speech` — voice module entry point. */
const MAX_TEXT_CHARS = 4000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const text = typeof (body as { text?: unknown }).text === "string" ? (body as { text: string }).text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "text required" }, { status: 400 });
  }
  if (text.length > MAX_TEXT_CHARS) {
    return NextResponse.json({ error: "text_too_long" }, { status: 400 });
  }

  try {
    const stream = await elevenLabsMp3Stream(text);
    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    if ((e as Error).message === "elevenlabs_not_configured") {
      return NextResponse.json(
        { error: "not_configured", message: "ElevenLabs is not configured." },
        { status: 503 },
      );
    }
    console.error("voice tts:", e);
    return NextResponse.json({ error: "tts_unavailable" }, { status: 502 });
  }
}
