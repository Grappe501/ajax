"use client";

import { useCallback, useRef, useState } from "react";

import type { VoiceCleanupMode } from "@/lib/voice/modes";

export type VoicePipelineState =
  | { status: "idle" }
  | { status: "recording"; seconds: number }
  | { status: "uploading" }
  | { status: "cleaning" };

export function useVoicePipeline() {
  const [state, setState] = useState<VoicePipelineState>({ status: "idle" });
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const startedAtRef = useRef<number>(0);

  const stopTimer = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const captureBlob = useCallback((): Blob | null => {
    const parts = chunksRef.current;
    if (parts.length === 0) return null;
    const first = parts[0] as Blob;
    return new Blob(parts, { type: first.type || "audio/webm" });
  }, []);

  /** Stop MediaRecorder and wait until final chunks are flushed. */
  const finalizeBlob = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const rec = mediaRecorderRef.current;
      const stream = mediaStreamRef.current;

      const cleanup = () => {
        if (stream) {
          stream.getTracks().forEach((t) => t.stop());
          mediaStreamRef.current = null;
        }
        mediaRecorderRef.current = null;
        stopTimer();
      };

      if (!rec) {
        cleanup();
        resolve(captureBlob());
        return;
      }

      if (rec.state === "inactive") {
        cleanup();
        resolve(captureBlob());
        return;
      }

      rec.addEventListener(
        "stop",
        () => {
          cleanup();
          queueMicrotask(() => resolve(captureBlob()));
        },
        { once: true },
      );

      try {
        rec.stop();
      } catch {
        cleanup();
        resolve(captureBlob());
      }
    });
  }, [captureBlob, stopTimer]);

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaStreamRef.current = stream;
    const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
      ? "audio/webm;codecs=opus"
      : "audio/webm";
    const rec = new MediaRecorder(stream, { mimeType: mime });
    mediaRecorderRef.current = rec;

    rec.ondataavailable = (ev) => {
      if (ev.data.size > 0) chunksRef.current.push(ev.data);
    };

    startedAtRef.current = Date.now();
    setState({ status: "recording", seconds: 0 });
    timerRef.current = window.setInterval(() => {
      setState({
        status: "recording",
        seconds: Math.floor((Date.now() - startedAtRef.current) / 1000),
      });
    }, 500);

    rec.start(200);
  }, []);

  const transcribeBlob = useCallback(
    async (
      blob: Blob,
      mode: VoiceCleanupMode,
    ): Promise<{ transcript: string; cleaned: string; structured?: unknown } | null> => {
      if (!blob || blob.size < 50) {
        setError("Recording too short.");
        return null;
      }

      setState({ status: "uploading" });
      setError(null);

      const fd = new FormData();
      fd.append("file", blob, "clip.webm");

      try {
        const tr = await fetch("/api/voice/transcribe", {
          method: "POST",
          body: fd,
        });
        const trData = (await tr.json()) as { transcript?: string; message?: string; error?: string };
        if (!tr.ok) {
          setError(trData.message ?? trData.error ?? "Transcription failed");
          setState({ status: "idle" });
          return null;
        }

        const transcript = typeof trData.transcript === "string" ? trData.transcript.trim() : "";
        if (!transcript) {
          setError("No speech detected.");
          setState({ status: "idle" });
          return null;
        }

        setState({ status: "cleaning" });

        const cl = await fetch("/api/voice/cleanup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ raw: transcript, mode }),
        });
        const clData = (await cl.json()) as {
          cleaned?: string;
          structured?: unknown;
          error?: string;
        };
        if (!cl.ok) {
          setError(clData.error ?? "Cleanup failed");
          setState({ status: "idle" });
          return { transcript, cleaned: transcript, structured: undefined };
        }

        const cleaned = typeof clData.cleaned === "string" ? clData.cleaned : transcript;
        setState({ status: "idle" });
        return { transcript, cleaned, structured: clData.structured };
      } catch {
        setError("Network error");
        setState({ status: "idle" });
        return null;
      }
    },
    [],
  );

  const transcribeAndCleanup = useCallback(
    async (mode: VoiceCleanupMode) => {
      const blob = await finalizeBlob();
      if (!blob) {
        setError("Nothing recorded.");
        setState({ status: "idle" });
        return null;
      }
      return transcribeBlob(blob, mode);
    },
    [finalizeBlob, transcribeBlob],
  );

  const reset = useCallback(() => {
    void finalizeBlob().finally(() => {
      chunksRef.current = [];
      setState({ status: "idle" });
      setError(null);
    });
  }, [finalizeBlob]);

  return {
    state,
    error,
    setError,
    startRecording,
    finalizeBlob,
    transcribeBlob,
    transcribeAndCleanup,
    reset,
  };
}
