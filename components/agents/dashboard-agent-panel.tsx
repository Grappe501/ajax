"use client";

import { Loader2, Mic, Send, Sparkles, Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useVoiceChat } from "@/hooks/use-voice-chat";
import { useVoicePipeline } from "@/hooks/use-voice-pipeline";
import { cn } from "@/lib/utils";

const startersWard = [
  "Who’s in the voter file that matches this name?",
  "How many people are on my reach list?",
  "Quick tips before I knock doors today.",
];

const startersAdmin = [
  "What does the pulse look like right now?",
  "What should we clear first in approvals?",
  "Summarize organizer and volunteer counts.",
];

export function DashboardAgentPanel({
  variant,
  agentId,
  wardSlug,
  title,
  subtitle,
  className,
}: {
  variant: "ward" | "admin";
  agentId: string;
  wardSlug?: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  const [input, setInput] = useState("");
  const [log, setLog] = useState<{ role: "user" | "assistant"; text: string }[]>([]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const voice = useVoiceChat();
  const pipeline = useVoicePipeline();

  useEffect(() => {
    return () => {
      voice.stopSpeaking();
      voice.stopListening();
    };
  }, [voice]);

  const send = useCallback(
    async (text: string) => {
      const t = text.trim();
      if (!t || pending) return;
      setPending(true);
      setError(null);
      const nextLog = [...log, { role: "user" as const, text: t }];
      setLog(nextLog);
      setInput("");

      const messages = nextLog.map((m) => ({ role: m.role, content: m.text }));

      try {
        const res = await fetch("/api/assistant/agent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agent: agentId,
            wardSlug: variant === "ward" ? wardSlug : undefined,
            messages,
          }),
        });
        let data: { reply?: string; message?: string; error?: string };
        try {
          data = (await res.json()) as typeof data;
        } catch {
          setLog((prev) => prev.slice(0, -1));
          setError("Invalid response from assistant.");
          return;
        }
        if (!res.ok) {
          setLog((prev) => prev.slice(0, -1));
          setError(data.message ?? data.error ?? "Request failed");
          return;
        }
        const reply = typeof data.reply === "string" ? data.reply.trim() : "";
        if (!reply) {
          setLog((prev) => prev.slice(0, -1));
          setError("Empty reply. Try again.");
          return;
        }
        setLog((prev) => [...prev, { role: "assistant", text: reply }]);
        voice.speak(reply);
      } catch {
        setLog((prev) => prev.slice(0, -1));
        setError("Network error");
      } finally {
        setPending(false);
      }
    },
    [agentId, log, pending, variant, voice, wardSlug],
  );

  async function finishVoiceQuestion() {
    const result = await pipeline.transcribeAndCleanup("ask_ajax");
    if (result?.cleaned) {
      setInput(result.cleaned);
      await send(result.cleaned);
    }
    pipeline.reset();
  }

  const isRecording = pipeline.state.status === "recording";
  const starters = variant === "ward" ? startersWard : startersAdmin;

  const cardClass =
    variant === "ward"
      ? "rounded-2xl border border-primary/25 bg-gradient-to-br from-[#f4f7fb] to-white shadow-sm"
      : "rounded-2xl border border-white/10 bg-[#070f1c]";

  const textClass = variant === "ward" ? "text-foreground" : "text-zinc-200";
  const mutedClass = variant === "ward" ? "text-muted-foreground" : "text-zinc-500";

  return (
    <section className={cn("space-y-4", className)} aria-label={`${title} assistant`}>
      <div>
        <h2 className="font-display flex items-center gap-2 text-xl font-bold text-primary">
          <Sparkles className="size-5" aria-hidden />
          {title}
        </h2>
        <p className={cn("mt-1 text-sm", mutedClass)}>{subtitle}</p>
      </div>

      <div className={cn("flex min-h-[280px] flex-col", cardClass)}>
        <div
          className={cn(
            "flex shrink-0 items-center justify-end gap-1 border-b px-3 py-2",
            variant === "ward" ? "border-border" : "border-white/10",
          )}
        >
          {voice.speakSupported ? (
            <button
              type="button"
              onClick={() => voice.setAutoSpeak((v) => !v)}
              className={cn(
                "rounded-lg p-2 transition",
                variant === "ward"
                  ? "text-muted-foreground hover:bg-muted"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white",
              )}
              aria-pressed={voice.autoSpeak}
              aria-label={voice.autoSpeak ? "Read replies aloud: on" : "Read replies aloud: off"}
            >
              {voice.autoSpeak ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
            </button>
          ) : null}
        </div>

        <div className={cn("min-h-0 flex-1 space-y-3 overflow-y-auto p-4 text-sm", textClass)}>
          {log.length === 0 ? (
            <p className={mutedClass}>
              Ask a question. {variant === "ward" ? "I can search your ward directory and summarize your reach list." : "I can read live campaign pulse metrics."}
            </p>
          ) : null}
          {log.map((m, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl px-3 py-2.5 leading-relaxed",
                m.role === "user"
                  ? variant === "ward"
                    ? "ml-6 bg-[#002d62] text-white"
                    : "ml-6 bg-[#002d62] text-white"
                  : variant === "ward"
                    ? "mr-4 border border-border bg-background"
                    : "mr-4 border border-white/10 bg-[#050a12]",
              )}
            >
              {m.text}
            </div>
          ))}
          {pending ? (
            <p className={cn("flex items-center gap-2 text-xs", mutedClass)}>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Thinking…
            </p>
          ) : null}
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          {pipeline.error ? (
            <p className="text-sm text-red-600" role="alert">
              {pipeline.error}
            </p>
          ) : null}
        </div>

        <div className={cn("border-t p-3", variant === "ward" ? "border-border" : "border-white/10")}>
          <p className={cn("mb-2 text-[10px] font-bold uppercase tracking-wide", mutedClass)}>Starters</p>
          <div className="mb-3 flex flex-wrap gap-1.5">
            {starters.map((s) => (
              <button
                key={s}
                type="button"
                disabled={pending}
                onClick={() => void send(s)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium transition disabled:opacity-50",
                  variant === "ward"
                    ? "border-[#d4dde9] bg-white text-[#002d62] hover:border-primary/40"
                    : "border-white/15 bg-white/5 text-zinc-200 hover:bg-white/10",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder={
                isRecording
                  ? `Recording… ${pipeline.state.status === "recording" ? `${pipeline.state.seconds}s` : ""}`
                  : "Type a question…"
              }
              disabled={pending || isRecording}
              className={cn(
                "min-h-0 flex-1 resize-none rounded-xl text-sm",
                variant === "admin" && "border-white/10 bg-[#050a12] text-zinc-100",
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className={cn(
                  "h-12 w-12 shrink-0 rounded-xl",
                  isRecording && "border-red-400/80 bg-red-50 text-red-700",
                )}
                disabled={pending}
                title={isRecording ? "Stop and send" : "Speak question (cloud transcript)"}
                onClick={() => {
                  if (isRecording) void finishVoiceQuestion();
                  else void pipeline.startRecording();
                }}
              >
                <Mic className={cn("size-4", isRecording && "animate-pulse")} aria-hidden />
              </Button>
              <Button
                type="button"
                size="icon"
                className={cn(
                  "h-12 w-12 shrink-0 rounded-xl",
                  variant === "ward" ? "bg-[#002d62] text-white hover:bg-[#001a35]" : "bg-[#fdb913] text-[#001a35] hover:bg-[#e5a917]",
                )}
                disabled={pending || !input.trim()}
                onClick={() => void send(input)}
                aria-label="Send"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
          <p className={cn("mt-2 text-[10px]", mutedClass)}>
            Cloud voice sends audio for transcription (OpenAI). Review replies before acting. Tools respect your ward or admin permissions.
          </p>
        </div>
      </div>
    </section>
  );
}
