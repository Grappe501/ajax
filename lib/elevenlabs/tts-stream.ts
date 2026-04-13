import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const DEFAULT_MODEL_ID = "eleven_multilingual_v2";

export async function elevenLabsMp3Stream(text: string): Promise<ReadableStream<Uint8Array>> {
  const apiKey = process.env.ELEVENLABS_API_KEY?.trim();
  const voiceId = process.env.ELEVENLABS_VOICE_ID?.trim();
  if (!apiKey || !voiceId) {
    throw new Error("elevenlabs_not_configured");
  }

  const modelId = process.env.ELEVENLABS_MODEL_ID?.trim() || DEFAULT_MODEL_ID;
  const client = new ElevenLabsClient({ apiKey });

  return client.textToSpeech.convert(voiceId, {
    text,
    modelId,
    outputFormat: "mp3_44100_128",
    voiceSettings: {
      stability: 0.45,
      similarityBoost: 0.8,
    },
  });
}
