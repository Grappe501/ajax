import { NextResponse } from "next/server";

import { getCampaignAdminSession } from "@/lib/admin/auth";
import { getCampaignPulse, listPendingCampaignEvents } from "@/lib/admin/queries";
import { CO_PILOT_SYSTEM_PROMPT } from "@/content/admin-co-pilot";

export async function POST(request: Request) {
  const session = await getCampaignAdminSession();
  if (!session.ok) {
    const status = session.reason === "not_signed_in" ? 401 : 403;
    return NextResponse.json({ error: "Unauthorized" }, { status });
  }

  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "not_configured", message: "OPENAI_API_KEY is not set on the server." },
      { status: 503 },
    );
  }

  let body: { message?: string };
  try {
    body = (await request.json()) as { message?: string };
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = typeof body.message === "string" ? body.message.trim().slice(0, 4000) : "";
  if (!message) {
    return NextResponse.json({ error: "message required" }, { status: 400 });
  }

  const [pulse, pending] = await Promise.all([getCampaignPulse(), listPendingCampaignEvents()]);

  const pulsePayload = {
    generated_at: new Date().toISOString(),
    admin_role: session.role,
    pulse: pulse ?? { error: "pulse_unavailable" },
    pending_event_titles: (pending ?? []).slice(0, 12).map((p) => ({
      id: p.id,
      title: p.title,
      starts_at: p.starts_at,
      organizer_email: p.organizer_email,
    })),
  };

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
        max_tokens: 900,
        messages: [
          { role: "system", content: CO_PILOT_SYSTEM_PROMPT },
          {
            role: "user",
            content: `Pulse snapshot (JSON):\n${JSON.stringify(pulsePayload, null, 2)}\n\n---\n\nAdmin question:\n${message}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const t = await res.text();
      console.error("co-pilot OpenAI:", res.status, t.slice(0, 200));
      return NextResponse.json({ error: "assistant_unavailable" }, { status: 502 });
    }

    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) {
      return NextResponse.json({ error: "empty_response" }, { status: 502 });
    }

    return NextResponse.json({ reply: text });
  } catch (e) {
    console.error("co-pilot route:", e);
    return NextResponse.json({ error: "network" }, { status: 502 });
  }
}
