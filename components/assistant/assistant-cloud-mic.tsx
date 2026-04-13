"use client";

import { Cloud, Square } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useVoicePipeline } from "@/hooks/use-voice-pipeline";
import { cn } from "@/lib/utils";

/**
 * OpenAI Whisper transcription + cleanup for Ask AJAX (public assistant).
 * Separate from browser Web Speech API dictation.
 */
export function AssistantCloudMic({
  disabled,
  onQuestionText,
}: {
  disabled: boolean;
  onQuestionText: (text: string) => void;
}) {
  const pipeline = useVoicePipeline();
  const recording = pipeline.state.status === "recording";

  async function onClick() {
    if (disabled) return;
    if (recording) {
      const result = await pipeline.transcribeAndCleanup("ask_ajax");
      if (result?.cleaned) onQuestionText(result.cleaned);
      pipeline.reset();
      return;
    }
    await pipeline.startRecording();
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "h-auto shrink-0 rounded-xl border-border",
          recording && "border-sky-500/80 bg-sky-50 text-sky-900",
        )}
        disabled={disabled || pipeline.state.status === "uploading" || pipeline.state.status === "cleaning"}
        title={recording ? "Stop — transcribe with cloud" : "Cloud voice (Whisper) — better in noise"}
        aria-label={recording ? "Stop cloud recording" : "Start cloud voice question"}
        onClick={() => void onClick()}
      >
        {recording ? <Square className="size-3.5 fill-current" aria-hidden /> : <Cloud className="size-4" aria-hidden />}
      </Button>
      <span className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Cloud</span>
      {pipeline.error ? (
        <span className="max-w-[4.5rem] text-center text-[9px] text-red-600">{pipeline.error}</span>
      ) : null}
    </div>
  );
}
