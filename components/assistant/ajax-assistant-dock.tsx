"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Mic, Send, Sparkles, Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ASSISTANT_QUICK_PROMPTS } from "@/content/assistant-knowledge";
import { AssistantCloudMic } from "@/components/assistant/assistant-cloud-mic";
import { useAssistant } from "@/components/assistant/assistant-context";
import { useVoiceChat } from "@/hooks/use-voice-chat";
import { cn } from "@/lib/utils";

type Msg = { role: "user" | "assistant"; content: string };

export function AjaxAssistantDock() {
  const pathname = usePathname();
  /** Keep the AJAX Guide FAB on canvass and field tools; hide only inside admin to reduce overlap with ops UI. */
  const hideChrome = pathname?.startsWith("/admin") ?? false;
  const { isOpen, openAssistant, closeAssistant, consumePrefill } = useAssistant();
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Hi — I’m the AJAX Guide. Ask anything about the campaign, the petition, or how to get involved. I’m not a lawyer, but I can point you to the right pages.",
    },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Server has OPENAI — from public /api/assistant/status (no key exposed). */
  const [aiBackend, setAiBackend] = useState<"unknown" | "configured" | "offline">("unknown");
  const listRef = useRef<HTMLDivElement>(null);
  const voice = useVoiceChat();

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/assistant/status")
      .then((r) => r.json() as Promise<{ configured?: boolean }>)
      .then((d) => {
        if (cancelled) return;
        setAiBackend(d.configured ? "configured" : "offline");
      })
      .catch(() => {
        if (!cancelled) setAiBackend("offline");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const scrollToEnd = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToEnd();
  }, [messages, scrollToEnd]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || pending) return;
      setError(null);
      setPending(true);
      const nextMessages: Msg[] = [...messages, { role: "user", content: trimmed }];
      setMessages(nextMessages);
      setInput("");

      try {
        const res = await fetch("/api/assistant", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        let data: { reply?: string; message?: string; error?: string };
        try {
          data = (await res.json()) as typeof data;
        } catch {
          setMessages((prev) => prev.slice(0, -1));
          setError(
            res.ok
              ? "The assistant returned an invalid response. Please try again."
              : `Assistant error (${res.status}). Please try again or use the FAQ.`,
          );
          return;
        }

        if (!res.ok) {
          setMessages((prev) => prev.slice(0, -1));
          setError(
            data.message ??
              (data.error === "not_configured"
                ? "The assistant is not enabled on this deployment yet. Add OPENAI_API_KEY in Netlify (or .env.local locally), redeploy, then try again — or use the FAQ and hello@ajaxcampaign.org."
                : data.error === "rate_limited"
                  ? "Too many requests right now. Wait a minute and try again."
                  : "Something went wrong. Please try again."),
          );
          return;
        }

        const reply = typeof data.reply === "string" ? data.reply.trim() : "";
        if (!reply) {
          setMessages((prev) => prev.slice(0, -1));
          setError("The assistant did not return text. Try a shorter question or open the FAQ.");
          return;
        }

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        voice.speak(reply);
      } catch {
        setMessages((prev) => prev.slice(0, -1));
        setError("Network error — check your connection and try again.");
      } finally {
        setPending(false);
      }
    },
    [messages, pending, voice],
  );

  const prevOpen = useRef(isOpen);
  useEffect(() => {
    if (isOpen && !prevOpen.current) {
      const pre = consumePrefill();
      if (pre) void send(pre);
    }
    prevOpen.current = isOpen;
  }, [isOpen, consumePrefill, send]);

  useEffect(() => {
    if (!isOpen) {
      voice.stopSpeaking();
      voice.stopListening();
    }
  }, [isOpen, voice]);

  if (hideChrome) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openAssistant()}
        className={cn(
          "group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-gradient-to-br from-[#002d62] via-[#002852] to-[#001a35] text-white shadow-ajax-fab transition motion-safe:hover:scale-[1.04] motion-safe:hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fdb913]",
          aiBackend === "configured" && "ring-2 ring-emerald-400/45",
          isOpen && "pointer-events-none opacity-0",
        )}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open AJAX Guide assistant"
        title={
          aiBackend === "configured"
            ? "AJAX Guide — AI backend connected"
            : aiBackend === "offline"
              ? "AJAX Guide — add OPENAI_API_KEY for full AI answers"
              : "AJAX Guide"
        }
      >
        <span
          className={cn(
            "absolute right-2 top-2 size-2 rounded-full ring-2 ring-white/30",
            aiBackend === "configured" && "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]",
            aiBackend === "offline" && "bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)]",
            aiBackend === "unknown" && "bg-slate-300/80",
          )}
          aria-hidden
        />
        <Sparkles className="relative size-7 motion-safe:transition-transform motion-safe:group-hover:rotate-6" aria-hidden />
      </button>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="AJAX Guide assistant"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-50 transition-[opacity,visibility] duration-200",
          isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none",
        )}
      >
        <button
          type="button"
          className="absolute inset-0 bg-[#001a35]/50 backdrop-blur-md motion-safe:transition-opacity"
          aria-label="Close assistant overlay"
          onClick={closeAssistant}
        />
        <aside
          className={cn(
            "absolute flex max-h-[92dvh] w-full flex-col border-l border-white/15 bg-card/95 text-foreground shadow-ajax-xl backdrop-blur-xl motion-safe:transition-transform motion-safe:duration-300 motion-reduce:transition-none",
            "bottom-0 right-0 top-auto max-h-[88dvh] rounded-t-3xl sm:bottom-0 sm:top-0 sm:max-h-none sm:w-[min(100%,420px)] sm:rounded-none",
            isOpen ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full",
          )}
        >
          <header className="ajax-glass-header flex shrink-0 items-start justify-between gap-3 px-4 py-4">
            <div>
              <p className="font-display text-lg font-bold tracking-tight">AJAX Guide</p>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-white/88">
                <span>Approved campaign info — not legal advice.</span>
                {aiBackend === "configured" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-200">
                    <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" aria-hidden />
                    AI online
                  </span>
                ) : aiBackend === "offline" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100">
                    <span className="size-1.5 rounded-full bg-amber-400" aria-hidden />
                    Key needed
                  </span>
                ) : null}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {voice.speakSupported ? (
                <button
                  type="button"
                  onClick={() => voice.setAutoSpeak((v) => !v)}
                  className="rounded-lg p-2 text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fdb913]"
                  aria-pressed={voice.autoSpeak}
                  aria-label={voice.autoSpeak ? "Read replies aloud: on" : "Read replies aloud: off"}
                  title={voice.autoSpeak ? "Mute voice replies" : "Read replies aloud"}
                >
                  {voice.autoSpeak ? (
                    <Volume2 className="size-5" aria-hidden />
                  ) : (
                    <VolumeX className="size-5" aria-hidden />
                  )}
                </button>
              ) : null}
              <button
                type="button"
                onClick={closeAssistant}
                className="rounded-lg p-2 text-white/90 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#fdb913]"
                aria-label="Close assistant"
              >
                <X className="size-5" />
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
            role="log"
            aria-live="polite"
          >
            {messages.map((m, i) => (
              <div
                key={`${i}-${m.role}`}
                className={cn(
                  "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-6 bg-gradient-to-br from-[#002d62] to-[#001f45] text-white shadow-md shadow-primary/20"
                    : "mr-4 border border-border/80 bg-background/90 text-foreground shadow-sm backdrop-blur-sm",
                )}
              >
                {m.content}
              </div>
            ))}
            {pending ? (
              <p className="text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <MessageCircle className="size-4 animate-pulse" aria-hidden />
                  Thinking…
                </span>
              </p>
            ) : null}
            {error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-900" role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className="shrink-0 border-t border-border bg-card px-3 pb-4 pt-3">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Quick prompts
            </p>
            <div className="mb-3 flex flex-wrap gap-1.5">
              {ASSISTANT_QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  disabled={pending}
                  onClick={() => void send(p)}
                  className="rounded-full border border-[#d4dde9] bg-[#f4f7fb] px-2.5 py-1 text-[11px] font-medium text-[#002d62] transition hover:border-[#002d62]/40 hover:bg-white disabled:opacity-50"
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  voice.isListening ? "Listening… speak now" : "Type a question or use the mic…"
                }
                rows={2}
                className="min-h-0 flex-1 resize-none rounded-xl border-border text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send(input);
                  }
                }}
                disabled={pending}
              />
              <AssistantCloudMic
                disabled={pending}
                onQuestionText={(text) => {
                  setInput(text);
                  void send(text);
                }}
              />
              {voice.listenSupported ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className={cn(
                    "h-auto shrink-0 rounded-xl border-border",
                    voice.isListening && "border-red-400/80 bg-red-50 text-red-700",
                  )}
                  disabled={pending}
                  aria-pressed={voice.isListening}
                  aria-label={voice.isListening ? "Stop voice input" : "Voice input"}
                  title={voice.isListening ? "Stop listening" : "Speak your question"}
                  onClick={() =>
                    voice.toggleListen((text) =>
                      setInput((prev) => (prev.trim() ? `${prev.trim()} ${text}` : text)),
                    )
                  }
                >
                  <Mic className={cn("size-4", voice.isListening && "animate-pulse")} aria-hidden />
                </Button>
              ) : null}
              <Button
                type="button"
                size="icon"
                className="h-auto shrink-0 rounded-xl bg-[#002d62] text-white hover:bg-[#001a35]"
                disabled={pending || !input.trim()}
                onClick={() => void send(input)}
                aria-label="Send message"
              >
                <Send className="size-4" />
              </Button>
            </div>
            {voice.listenSupported ? (
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                Browser mic: fast dictation. <strong className="font-semibold text-foreground">Cloud</strong> uses
                OpenAI transcription (better in noise). Speaker in the header controls read-aloud (ElevenLabs when
                configured).
              </p>
            ) : (
              <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground">
                Use <strong className="font-semibold text-foreground">Cloud</strong> to speak your question (OpenAI
                Whisper).
              </p>
            )}
            <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
              For rules & witnessing, see{" "}
              <Link href="/rules" className="font-semibold text-primary underline-offset-2 hover:underline">
                Petition rules
              </Link>
              . Questions for coordinators:{" "}
              <a href="mailto:hello@ajaxcampaign.org" className="font-semibold underline-offset-2 hover:underline">
                hello@ajaxcampaign.org
              </a>
              .
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
