"use client";

import { Headphones, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAssistant } from "@/components/assistant/assistant-context";

/** Future ElevenLabs read-aloud — disabled until wired. */
export function ReadAloudPlaceholder({ label = "Read aloud" }: { label?: string }) {
  return (
    <Button type="button" variant="outline" size="sm" className="gap-2" disabled title="Read aloud — coming soon">
      <Headphones className="size-4" aria-hidden />
      {label}
    </Button>
  );
}

/** Opens AJAX Guide with optional prefill about the petition. */
export function AskAjaxPlaceholder({ prefill }: { prefill?: string }) {
  const { openAssistant } = useAssistant();
  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      className="gap-2"
      onClick={() =>
        openAssistant(
          prefill ??
            "Summarize the Jacksonville ward-based petition in plain language and link me to the right initiative pages.",
        )
      }
    >
      <MessageCircle className="size-4" aria-hidden />
      Ask AJAX
    </Button>
  );
}
