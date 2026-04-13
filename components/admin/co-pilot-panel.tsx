"use client";

import { Loader2, Send } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const starters = [
  "What should we prioritize today given the current queue?",
  "Suggest a weekly rhythm for approvals and volunteer follow-up.",
  "Any risks if pending events pile up over the weekend?",
];

export function CoPilotPanel() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(text: string) {
    const t = text.trim();
    if (!t || pending) return;
    setPending(true);
    setError(null);
    const next = [...log, { role: "user" as const, text: t }];
    setLog(next);
    setInput("");

    try {
      const res = await fetch("/api/admin/co-pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: t }),
      });
      const data = (await res.json()) as { reply?: string; message?: string };
      if (!res.ok) {
        setError(data.message ?? "Request failed");
        return;
      }
      if (data.reply) {
        setLog((prev) => [...prev, { role: "assistant", text: data.reply! }]);
      }
    } catch {
      setError("Network error");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div className="flex min-h-[420px] flex-col rounded-2xl border border-white/10 bg-[#070f1c]">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          {log.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Ask about backlog, pacing, or how to structure the week. The co-pilot reads live pulse
              data from Supabase (counts + pending event titles) — not Netlify forms or email inboxes.
            </p>
          ) : null}
          {log.map((m, i) => (
            <div
              key={i}
              className={
                m.role === "user"
                  ? "ml-8 rounded-2xl bg-[#002d62] px-4 py-3 text-sm text-white"
                  : "mr-4 rounded-2xl border border-white/10 bg-[#050a12] px-4 py-3 text-sm leading-relaxed text-zinc-200"
              }
            >
              {m.text}
            </div>
          ))}
          {pending ? (
            <p className="flex items-center gap-2 text-xs text-zinc-500">
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Synthesizing…
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          ) : null}
        </div>
        <div className="border-t border-white/10 p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="Ask the co-pilot…"
              className="border-white/10 bg-[#050a12] text-sm text-zinc-100"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
            />
            <Button
              type="button"
              className="h-auto shrink-0 bg-[#fdb913] text-[#001a35] hover:bg-[#ffc82d]"
              disabled={pending || !input.trim()}
              onClick={() => void send(input)}
              aria-label="Send"
            >
              <Send className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <aside className="space-y-3">
        <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Starters</p>
        {starters.map((s) => (
          <button
            key={s}
            type="button"
            disabled={pending}
            onClick={() => void send(s)}
            className="w-full rounded-xl border border-white/10 bg-[#070f1c] px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-[#fdb913]/40 hover:text-white disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </aside>
    </div>
  );
}
