"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { usePublicTheme, type PublicThemeChoice } from "@/components/layout/public-theme";
import { cn } from "@/lib/utils";

const cycle: Record<PublicThemeChoice, PublicThemeChoice> = {
  light: "dark",
  dark: "system",
  system: "light",
};

const labels: Record<PublicThemeChoice, string> = {
  light: "Light theme",
  dark: "Dark theme",
  system: "Match system theme",
};

export function PublicThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = usePublicTheme();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className={cn(
        "rounded-xl border-border/70 bg-card/80 text-foreground shadow-sm backdrop-blur-sm hover:bg-muted/80",
        className,
      )}
      aria-label={labels[theme]}
      title={`Theme: ${labels[theme]} — click to change`}
      onClick={() => setTheme(cycle[theme])}
    >
      {theme === "light" ? (
        <Sun className="size-[1.15rem]" aria-hidden />
      ) : theme === "dark" ? (
        <Moon className="size-[1.15rem]" aria-hidden />
      ) : (
        <Monitor className="size-[1.15rem]" aria-hidden />
      )}
    </Button>
  );
}
