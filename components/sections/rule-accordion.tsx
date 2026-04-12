"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { rules } from "@/content/rules";

function TextBlocks({ text, className }: { text: string; className?: string }) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className={className}>
      {parts.map((para, idx) => (
        <p key={idx} className="leading-relaxed [&:not(:first-child)]:mt-3">
          {para}
        </p>
      ))}
    </div>
  );
}

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
            <div className="font-medium text-foreground">
              <TextBlocks text={r.summary} />
            </div>
            <TextBlocks text={r.details} />
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
