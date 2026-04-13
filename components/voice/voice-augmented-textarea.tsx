"use client";

import { Mic, Square } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useVoicePipeline } from "@/hooks/use-voice-pipeline";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Textarea with cloud transcription (OpenAI Whisper + cleanup) for campaign notes.
 * Human-in-the-loop: user reviews text before save.
 */
export function VoiceAugmentedTextarea({
  id,
  value,
  onChange,
  rows = 3,
  placeholder,
  disabled,
  className,
}: Props) {
  const pipeline = useVoicePipeline();
  const [busy, setBusy] = useState(false);

  const recording = pipeline.state.status === "recording";

  async function toggleMic() {
    if (disabled || busy) return;
    if (recording) {
      setBusy(true);
      const result = await pipeline.transcribeAndCleanup("notes");
      setBusy(false);
      if (result?.cleaned) {
        const next = value.trim() ? `${value.trim()}\n${result.cleaned}` : result.cleaned;
        onChange(next);
      }
      pipeline.reset();
      return;
    }
    await pipeline.startRecording();
  }

  return (
    <div className={cn("relative", className)}>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled || busy || recording}
        className="pr-12"
      />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className={cn(
          "absolute bottom-2 right-2 h-9 w-9 rounded-lg",
          recording && "border-red-400/80 bg-red-50 text-red-700",
        )}
        disabled={disabled || busy}
        title={recording ? "Stop and insert transcript" : "Dictate notes (cloud)"}
        onClick={() => void toggleMic()}
      >
        {recording ? <Square className="size-3.5 fill-current" aria-hidden /> : <Mic className="size-4" aria-hidden />}
      </Button>
      {pipeline.error ? (
        <p className="mt-1 text-xs text-red-600" role="alert">
          {pipeline.error}
        </p>
      ) : null}
      {busy || pipeline.state.status === "uploading" || pipeline.state.status === "cleaning" ? (
        <p className="mt-1 text-xs text-muted-foreground">Processing audio…</p>
      ) : null}
    </div>
  );
}
