"use client";

import { Sparkles } from "lucide-react";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { Card } from "@/components/ui/card";
import { site } from "@/content/site";

export function LadderSection() {
  return (
    <SectionShell id="ladder" muted>
      <SectionHeading title={site.ladder.title} subtitle={site.ladder.subtitle} />
      <div className="grid gap-6 md:grid-cols-3">
        {site.ladder.columns.map((col) => (
          <Card
            key={col.id}
            className="flex flex-col rounded-2xl border-border/80 p-6 shadow-sm"
          >
            <h3 className="font-display text-xl font-bold text-primary">{col.title}</h3>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
              {col.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <PrimaryButton href={col.href} className="mt-6 w-full justify-center">
              {col.cta}
            </PrimaryButton>
          </Card>
        ))}
      </div>
    </SectionShell>
  );
}
