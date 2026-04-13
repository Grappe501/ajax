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
  /** Browser can speak replies. */
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

/**
 * Web Speech API: push-to-talk input + optional TTS for assistant replies.
 */
export function useVoiceChat(): VoiceChatControls {
  const [listenSupported, setListenSupported] = useState(false);
  const [speakSupported, setSpeakSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onTranscriptRef = useRef<(text: string) => void>(() => {});
  const onInterimRef = useRef<((text: string) => void) | undefined>(undefined);

  useEffect(() => {
    setListenSupported(getSpeechRecognitionCtor() !== null);
    setSpeakSupported(typeof window !== "undefined" && "speechSynthesis" in window);
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
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!autoSpeak || !text.trim()) return;
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text.trim());
      u.lang = "en-US";
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
    },
    [autoSpeak],
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
