# AJAX Voice System — spec aligned with this codebase

This document turns the campaign voice product spec into **phased work** that matches **OpenAI** (STT + cleanup + reasoning) and **ElevenLabs** (TTS), with **human review before save**.

## Current implementation snapshot

| Capability | Status | Where |
|------------|--------|--------|
| TTS (ElevenLabs) | Shipped | `POST /api/assistant/speech`, `hooks/use-voice-chat.ts` |
| Public assistant chat | Shipped | `POST /api/assistant`, `components/assistant/ajax-assistant-dock.tsx` |
| Browser STT (mic) | Shipped | Web Speech API in `use-voice-chat.ts` |
| OpenAI STT (upload audio) | Not built | Needs `POST /api/voice/transcribe` |
| Cleanup / structured extraction | Not built | Needs `POST /api/voice/cleanup` |
| DB tables `voice_*` | Not built | Spec below |
| Campaign vocabulary file | Not built | Recommended: `content/vocabulary.ts` |

## Product goals (unchanged)

- One tap to record; fast feedback; **editable** before save.
- Modes: Notes, Data entry, Quick tag, Ask AJAX (align prompts per mode).
- TTS: **user intent** before playing long audio (your spec: avoid autoplay — marketing dock currently auto-speaks when enabled; reconcile when building unified `TTSPlayer`).

## Architecture (target)

```
[Mic] → capture blob → POST /api/voice/transcribe (OpenAI STT + vocabulary prompt)
     → raw transcript UI
     → POST /api/voice/cleanup (mode + context → cleaned + optional JSON)
     → user confirms → save to notes / pending voter update / etc.
[TTS] → POST /api/assistant/speech (existing) or POST /api/voice/tts alias
```

## Campaign vocabulary

Add `content/vocabulary.ts` (see platform spec) with places, officials, campaign terms. Inject into:

- STT `prompt` parameter (OpenAI audio API),
- Cleanup system prompt,
- Optional post-processing regex mappers for known tokens.

## Suggested API routes

| Route | Role |
|-------|------|
| `POST /api/voice/transcribe` | multipart audio → `{ transcript, duration?, usage? }` |
| `POST /api/voice/cleanup` | `{ mode, raw, context }` → `{ cleaned, structured?, confidence? }` |
| `POST /api/voice/tts` | Optional alias to same pipeline as `/api/assistant/speech` (single entry point for “voice module”) |
| `POST /api/voice/ask` | Optional: transcript + session → same grounding as Ajax + optional TTS flag |

**Security:** All `voice/*` routes require **auth** except where explicitly public (generally **none** for transcripts containing voter notes).

## Data model (when ready)

Tables as in your spec §12 — implement **after** Phase B proves value:

- `voice_transcripts`
- `voice_playbacks` (optional if only ephemeral TTS)
- `voice_settings` (per user prefs)

Use Supabase migrations; RLS by `user_id` and org.

## UI components (build order)

1. `VoiceRecorderButton` + `RecordingPanel` (timer, state)
2. `TranscriptPreview` + `TranscriptEditor`
3. `VoiceModeSelector`
4. `ConfidenceHighlights` (when API exposes segments)
5. `TTSPlayer` (play/pause/stop — align with “no autoplay” rule for long content)
6. `AskAjaxVoicePanel` — ties STT → text question → `/api/assistant` → optional TTS

## Phases (Cursor-sized)

### Phase A — Foundation

- Mic permission UX; record to `Blob`; upload stub.
- **Commit message:** `feat: add voice recording foundation`

### Phase B — Transcription + cleanup

- Implement `transcribe` + `cleanup` with OpenAI; wire `content/vocabulary.ts`.
- **Commit message:** `feat: add context-aware transcription and cleanup`

### Phase C — Workflow integrations

- Embed voice notes in **one** real workflow (e.g. ward dashboard notes field or admin note).
- **Commit message:** `feat: integrate voice into [surface] workflow`

### Phase D — TTS polish

- Unified `TTSPlayer`; script read-aloud; ensure parity with ElevenLabs route.
- **Commit message:** `feat: add ElevenLabs read-aloud controls`

### Phase E — Ask AJAX voice mode

- End-to-end: speak question → show transcript → grounded answer → tap to play answer.
- **Commit message:** `feat: add voice-enabled Ask AJAX flow`

## Testing checklist (abbrev.)

- Mobile Safari + Chrome: permission, background noise, long pause, phone numbers, addresses.
- Verify **no save** without explicit user action on structured voter fields.

## Governance (must hold)

- Do not silently overwrite voter fields (your §16).
- Structured updates → confirm or pending approval, per existing campaign rules.

## Related

- `ajax-agent-platform.md` — trust tiers, tools, named agents (Comet, Agent409, Piney, Ivory, Dawn).
