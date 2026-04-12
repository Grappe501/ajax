"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CopyReferralButton({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="rounded-lg font-mono"
      onClick={copy}
    >
      {done ? (
        <Check className="mr-1 size-4 text-primary" aria-hidden />
      ) : (
        <Copy className="mr-1 size-4" aria-hidden />
      )}
      {label}
    </Button>
  );
}
