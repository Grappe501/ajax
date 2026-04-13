#!/usr/bin/env node
/**
 * Lists voices from your ElevenLabs account so you can copy a Voice ID into ELEVENLABS_VOICE_ID.
 * Usage: ELEVENLABS_API_KEY=... node scripts/list-elevenlabs-voices.mjs
 * Or:    npm run list-voices:elevenlabs   (reads .env.local via dotenv if you add it, or use env var)
 */

const key = process.env.ELEVENLABS_API_KEY?.trim();
if (!key) {
  console.error("Set ELEVENLABS_API_KEY in the environment.\n");
  process.exit(1);
}

const res = await fetch("https://api.elevenlabs.io/v1/voices", {
  headers: { "xi-api-key": key },
});

if (!res.ok) {
  const t = await res.text();
  console.error("Request failed:", res.status, t.slice(0, 500));
  process.exit(1);
}

const data = await res.json();
const voices = data.voices ?? [];

if (voices.length === 0) {
  console.log("No voices returned. Check your API key and account.");
  process.exit(0);
}

console.log("Voice name — Voice ID (use ELEVENLABS_VOICE_ID)\n");
for (const v of voices) {
  const name = v.name ?? "(unnamed)";
  const id = v.voice_id ?? v.voiceId ?? "?";
  const labels = v.labels ? JSON.stringify(v.labels) : "";
  console.log(`${name}`);
  console.log(`  ${id}${labels ? `  ${labels}` : ""}\n`);
}
