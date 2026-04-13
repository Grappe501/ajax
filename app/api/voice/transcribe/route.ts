import { NextResponse } from "next/server";

import { getSttPromptHint } from "@/content/vocabulary";
import { getOpenAIApiKey } from "@/lib/ai/env";

const MAX_BYTES = 24 * 1024 * 1024; /* ~25MB Whisper cap */

export async function POST(request: Request) {
  const apiKey = getOpenAIApiKey();
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "OPENAI_API_KEY is not set on the server." },
      { status: 503 },
    );
  }

  const ct = request.headers.get("content-type") ?? "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ error: "expected multipart/form-data" }, { status: 400 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file field required" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "file_too_large" }, { status: 413 });
  }

  const prompt = getSttPromptHint();

  const fd = new FormData();
  fd.append("file", file, file.name || "audio.webm");
  fd.append("model", "whisper-1");
  fd.append("language", "en");
  fd.append("prompt", prompt);

  try {
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: fd,
    });

    const raw = await res.text();
    if (!res.ok) {
      console.error("Whisper:", res.status, raw.slice(0, 400));
      return NextResponse.json(
        { error: "transcription_failed", message: "Could not transcribe audio." },
        { status: 502 },
      );
    }

    const data = JSON.parse(raw) as { text?: string };
    const text = typeof data.text === "string" ? data.text.trim() : "";
    return NextResponse.json({ transcript: text });
  } catch (e) {
    console.error("transcribe route:", e);
    return NextResponse.json({ error: "network" }, { status: 502 });
  }
}
