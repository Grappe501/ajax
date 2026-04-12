"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  rules,
  rulesLegalDisclaimer,
  type RuleItem,
} from "@/content/rules";

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

function RuleLinks({ links }: { links: RuleItem["links"] }) {
  if (!links?.length) return null;
  return (
    <div className="rounded-xl border border-primary/15 bg-primary/[0.04] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-primary">
        Official references & reading
      </p>
      <ul className="mt-2 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function RuleAccordion() {
  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-border/80 bg-muted/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        {rulesLegalDisclaimer}
      </p>
      <Accordion multiple className="w-full">
        {rules.map((r, i) => (
          <AccordionItem
            key={r.title}
            value={`item-${i}`}
            className="rounded-xl border border-border/80 bg-card px-4 data-[state=open]:shadow-sm"
          >
            <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
              {r.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pb-4 text-muted-foreground">
              <div className="font-medium text-foreground">
                <TextBlocks text={r.summary} />
              </div>
              <TextBlocks text={r.details} />
              <RuleLinks links={r.links} />
              {r.sources ? (
                <p className="text-xs leading-relaxed text-muted-foreground/90">
                  <span className="font-semibold text-foreground">Note: </span>
                  {r.sources}
                </p>
              ) : null}
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
    </div>
  );
}
