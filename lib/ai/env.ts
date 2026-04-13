import "server-only";

/**
 * OpenAI API key for server routes (chat, Whisper, cleanup, co-pilot).
 * Set `OPENAI_API_KEY` in `.env.local` (local) or Netlify/hosting env — never `NEXT_PUBLIC_*`.
 *
 * Run `npm run setup:openai` to validate against OpenAI and write `.env.local`.
 */
export function getOpenAIApiKey(): string | undefined {
  const k = process.env.OPENAI_API_KEY?.trim();
  if (!k) return undefined;
  return k;
}

export function isOpenAIConfigured(): boolean {
  return Boolean(getOpenAIApiKey());
}

/** Model used for public AJAX Guide chat — exposed for status endpoint only. */
export const OPENAI_CHAT_MODEL = "gpt-4o-mini" as const;
