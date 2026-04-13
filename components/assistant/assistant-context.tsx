"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type AssistantContextValue = {
  isOpen: boolean;
  openAssistant: (prefillMessage?: string) => void;
  closeAssistant: () => void;
  /** Consumed by the dock once to auto-send */
  consumePrefill: () => string | undefined;
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const prefillRef = useRef<string | undefined>(undefined);

  const openAssistant = useCallback((prefillMessage?: string) => {
    if (prefillMessage?.trim()) {
      prefillRef.current = prefillMessage.trim();
    }
    setOpen(true);
  }, []);

  const closeAssistant = useCallback(() => {
    setOpen(false);
  }, []);

  const consumePrefill = useCallback(() => {
    const v = prefillRef.current;
    prefillRef.current = undefined;
    return v;
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openAssistant,
      closeAssistant,
      consumePrefill,
    }),
    [isOpen, openAssistant, closeAssistant, consumePrefill],
  );

  return <AssistantContext.Provider value={value}>{children}</AssistantContext.Provider>;
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) {
    throw new Error("useAssistant must be used within AssistantProvider");
  }
  return ctx;
}
