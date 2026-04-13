"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type PublicThemeChoice = "light" | "dark" | "system";

const STORAGE_KEY = "ajax-public-theme";

type PublicThemeContextValue = {
  theme: PublicThemeChoice;
  setTheme: (t: PublicThemeChoice) => void;
  /** Resolved appearance for styling */
  resolved: "light" | "dark";
};

const PublicThemeContext = createContext<PublicThemeContextValue | null>(null);

function readStoredTheme(): PublicThemeChoice {
  if (typeof window === "undefined") return "system";
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "light" || v === "dark" || v === "system") return v;
  } catch {
    /* ignore */
  }
  return "system";
}

export function PublicThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<PublicThemeChoice>("system");
  const [systemDark, setSystemDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(mq.matches);
    mq.addEventListener("change", onChange);
    queueMicrotask(() => {
      setMounted(true);
      setThemeState(readStoredTheme());
      setSystemDark(mq.matches);
    });
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const resolved: "light" | "dark" = useMemo(() => {
    if (!mounted) return "light";
    if (theme === "dark") return "dark";
    if (theme === "light") return "light";
    return systemDark ? "dark" : "light";
  }, [mounted, theme, systemDark]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("public-dark", resolved === "dark");
    return () => document.documentElement.classList.remove("public-dark");
  }, [mounted, resolved]);

  const setTheme = useCallback((t: PublicThemeChoice) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, resolved }),
    [theme, setTheme, resolved],
  );

  return (
    <PublicThemeContext.Provider value={value}>{children}</PublicThemeContext.Provider>
  );
}

export function usePublicTheme() {
  const ctx = useContext(PublicThemeContext);
  if (!ctx) {
    throw new Error("usePublicTheme must be used within PublicThemeProvider");
  }
  return ctx;
}
