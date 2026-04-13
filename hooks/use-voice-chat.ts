"use client";

import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export type VoiceChatControls = {
  /** Browser can capture speech (Chrome/Edge/Safari; may need permission). */
  listenSupported: boolean;
  /** Read-aloud is available (ElevenLabs via API and/or browser speech synthesis). */
  speakSupported: boolean;
  /** Mic is actively listening. */
  isListening: boolean;
  /** When true, assistant replies are read aloud. */
  autoSpeak: boolean;
  setAutoSpeak: Dispatch<SetStateAction<boolean>>;
  /** Toggle listening; final text is passed to onTranscript. */
  toggleListen: (onTranscript: (text: string) => void, onInterim?: (text: string) => void) => void;
  stopListening: () => void;
  speak: (text: string) => void;
  stopSpeaking: () => void;
};

/** Canonical campaign TTS route (shared with voice module). */
const VOICE_TTS_URL = "/api/voice/tts";

/**
 * Push-to-talk via Web Speech API. Assistant replies: ElevenLabs TTS from `/api/voice/tts`
 * when configured server-side, otherwise browser `speechSynthesis`.
 */
export function useVoiceChat(): VoiceChatControls {
  const [listenSupported, setListenSupported] = useState(false);
  const [speakSupported, setSpeakSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onTranscriptRef = useRef<(text: string) => void>(() => {});
  const onInterimRef = useRef<((text: string) => void) | undefined>(undefined);

  const abortSpeechRef = useRef<AbortController | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setListenSupported(getSpeechRecognitionCtor() !== null);
      setSpeakSupported(true);
    });
  }, []);

  const stopListening = useCallback(() => {
    const r = recognitionRef.current;
    if (r) {
      try {
        r.abort();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  const stopSpeaking = useCallback(() => {
    abortSpeechRef.current?.abort();
    abortSpeechRef.current = null;

    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = "";
      } catch {
        /* ignore */
      }
      audioRef.current = null;
    }

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!autoSpeak || !text.trim()) return;
      stopSpeaking();

      const trimmed = text.trim();
      const ac = new AbortController();
      abortSpeechRef.current = ac;

      const fallbackBrowserTts = () => {
        if (typeof window === "undefined" || !window.speechSynthesis) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(trimmed);
        u.lang = "en-US";
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      };

      void (async () => {
        try {
          const res = await fetch(VOICE_TTS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: trimmed }),
            signal: ac.signal,
          });

          if (ac.signal.aborted) return;

          const contentType = res.headers.get("content-type") ?? "";
          if (res.ok && contentType.includes("audio")) {
            const blob = await res.blob();
            if (ac.signal.aborted) return;

            const url = URL.createObjectURL(blob);
            blobUrlRef.current = url;
            const audio = new Audio(url);
            audioRef.current = audio;
            audio.onended = () => {
              if (blobUrlRef.current === url) {
                URL.revokeObjectURL(url);
                blobUrlRef.current = null;
              }
            };

            try {
              await audio.play();
            } catch {
              if (blobUrlRef.current === url) {
                URL.revokeObjectURL(url);
                blobUrlRef.current = null;
              }
              audioRef.current = null;
              if (!ac.signal.aborted) fallbackBrowserTts();
            }
            return;
          }
        } catch (e) {
          if (ac.signal.aborted) return;
          if (e instanceof DOMException && e.name === "AbortError") return;
        }

        if (!ac.signal.aborted) fallbackBrowserTts();
      })();
    },
    [autoSpeak, stopSpeaking],
  );

  const toggleListen = useCallback(
    (onTranscript: (text: string) => void, onInterim?: (text: string) => void) => {
      const Ctor = getSpeechRecognitionCtor();
      if (!Ctor) return;

      if (recognitionRef.current) {
        stopListening();
        return;
      }

      onTranscriptRef.current = onTranscript;
      onInterimRef.current = onInterim;

      const rec = new Ctor();
      recognitionRef.current = rec;
      rec.lang = "en-US";
      rec.interimResults = true;
      rec.continuous = false;
      rec.maxAlternatives = 1;

      rec.onresult = (ev) => {
        let interim = "";
        let finalText = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const r = ev.results[i];
          const t = r[0]?.transcript ?? "";
          if (r.isFinal) finalText += t;
          else interim += t;
        }
        if (interim && onInterimRef.current) onInterimRef.current(interim);
        if (finalText.trim()) {
          onTranscriptRef.current(finalText.trim());
        }
      };

      rec.onerror = () => {
        recognitionRef.current = null;
        setIsListening(false);
      };

      rec.onend = () => {
        recognitionRef.current = null;
        setIsListening(false);
      };

      try {
        rec.start();
        setIsListening(true);
      } catch {
        recognitionRef.current = null;
        setIsListening(false);
      }
    },
    [stopListening],
  );

  useEffect(() => {
    return () => {
      stopListening();
      stopSpeaking();
    };
  }, [stopListening, stopSpeaking]);

  return useMemo(
    () => ({
      listenSupported,
      speakSupported,
      isListening,
      autoSpeak,
      setAutoSpeak,
      toggleListen,
      stopListening,
      speak,
      stopSpeaking,
    }),
    [
      listenSupported,
      speakSupported,
      isListening,
      autoSpeak,
      toggleListen,
      stopListening,
      speak,
      stopSpeaking,
    ],
  );
}
