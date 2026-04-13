import { NextResponse } from "next/server";

import { getOpenAIApiKey, OPENAI_CHAT_MODEL } from "@/lib/ai/env";

/**
 * Public status for UI: whether the AJAX Guide can call OpenAI (no secrets exposed).
 */
export async function GET() {
  const configured = Boolean(getOpenAIApiKey());
  return NextResponse.json({
    configured,
    model: OPENAI_CHAT_MODEL,
  });
}
