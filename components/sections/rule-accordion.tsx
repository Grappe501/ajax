"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { rules } from "@/content/rules";

export function RuleAccordion() {
  return (
    <Accordion multiple={false} className="w-full">
      {rules.map((r, i) => (
        <AccordionItem
          key={r.title}
          value={`item-${i}`}
          className="rounded-xl border border-border/80 bg-card px-4 data-[state=open]:shadow-sm"
        >
          <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
            {r.title}
          </AccordionTrigger>
          <AccordionContent className="space-y-3 pb-4 text-muted-foreground">
            <p className="font-medium text-foreground">{r.summary}</p>
            <p>{r.details}</p>
            {r.mistakes ? (
              <p>
                <span className="font-semibold text-foreground">Watch for: </span>
                {r.mistakes}
              </p>
            ) : null}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
