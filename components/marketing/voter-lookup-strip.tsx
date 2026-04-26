"use client";

import { SearchCheck } from "lucide-react";

import { SecondaryButton } from "@/components/cta/secondary-button";
import { buttonVariants } from "@/components/ui/button";
import { voterLookup } from "@/content/voter-lookup";
import { cn } from "@/lib/utils";

/** Front-and-center voter verification — homepage + hub. */
export function VoterLookupStrip({ className }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] via-card to-ajax-mist/40 p-6 shadow-ajax sm:p-8 ${className ?? ""}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary">
            <SearchCheck className="size-6" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Step zero</p>
            <h2 className="font-display mt-1 text-xl font-bold text-foreground sm:text-2xl">
              {voterLookup.heroCallout.title}
            </h2>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
              {voterLookup.heroCallout.body}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a
            href={voterLookup.voterviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "rounded-xl px-6 font-semibold shadow-sm",
            )}
          >
            Open official VoterView
          </a>
          <SecondaryButton href="/initiative/voter-status" className="justify-center sm:min-w-[220px]">
            How to use the lookup
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}
