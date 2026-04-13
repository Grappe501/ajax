"use client";

import { CheckCircle2 } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { site } from "@/content/site";

import { MultilineAnswer } from "@/components/marketing/multiline-answer";

export function WhyJacksonvilleContent() {
  return (
    <Accordion multiple={false} className="w-full space-y-3">
      {site.whyJacksonville.benefits.map((b, i) => (
        <AccordionItem
          key={b.title}
          value={`why-jax-${i}`}
          className="rounded-2xl border border-border/70 bg-card/95 px-4 shadow-sm transition-shadow data-[state=open]:border-primary/20 data-[state=open]:shadow-ajax"
        >
          <AccordionTrigger className="py-4 text-left hover:no-underline">
            <span className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span>
                <span className="font-display text-base font-bold text-foreground">{b.title}</span>
                <span className="mt-1 block text-sm font-normal text-muted-foreground">
                  {b.summary}
                </span>
              </span>
            </span>
          </AccordionTrigger>
          <AccordionContent className="pb-4 pl-8 text-muted-foreground sm:pl-11">
            <MultilineAnswer text={b.detail} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
