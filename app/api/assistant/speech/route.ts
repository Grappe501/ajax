import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { NextResponse } from "next/server";

/** Align with assistant reply length; protects quota / cost. */
const MAX_TEXT_CHARS = 4000;

/** Default matches ElevenLabs README; override with ELEVENLABS_MODEL_ID (e.g. eleven_turbo_v2_5). */
const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

export async function POST(request: Request) {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const voiceId = process.env.ELEVENLABS_VOICE_ID?.trim();
  if (!apiKey || !voiceId) {
    return NextResponse.json(
      { error: "not_configured", message: "ElevenLabs voice is not configured on this server." },
      { status: 503 },
    );
  }

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

  const modelId = process.env.ELEVENLABS_MODEL_ID?.trim() || DEFAULT_MODEL_ID;

  const client = new ElevenLabsClient({ apiKey });

  try {
    const stream = await client.textToSpeech.convert(voiceId, {
      text,
      modelId,
      outputFormat: "mp3_44100_128",
      voiceSettings: {
        stability: 0.45,
        similarityBoost: 0.8,
      },
    });

    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error("ElevenLabs TTS (SDK):", e);
    return NextResponse.json(
      { error: "tts_unavailable", message: "Voice synthesis failed. Try again." },
      { status: 502 },
    );
  }
}
