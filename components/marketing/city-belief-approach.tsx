"use client";

import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionReveal } from "@/components/motion/section-reveal";
import { cityNarrative } from "@/content/city-narrative";
import { cn } from "@/lib/utils";

/**
 * Two-band narrative: conviction (inner circle) then operating character (middle circle).
 * Concrete “what to do next” stays in hero CTAs, voter strip, journey cards, and events.
 */
export function CityBeliefApproach() {
  const { stake, approach } = cityNarrative;

  return (
    <>
      <SectionShell muted className="!py-16 md:!py-20">
        <SectionReveal>
          <SectionHeading eyebrow={stake.eyebrow} title={stake.title} />
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
            {stake.body}
          </p>
        </SectionReveal>
      </SectionShell>

      <SectionShell className="!py-16 md:!py-20">
        <SectionReveal>
          <SectionHeading eyebrow={approach.eyebrow} title={approach.title} subtitle={approach.body} />
          <ul className="mx-auto mt-10 max-w-3xl space-y-4">
            {approach.highlights.map((line) => (
              <li
                key={line}
                className={cn(
                  "relative pl-6 text-sm leading-relaxed text-muted-foreground md:text-base md:leading-relaxed",
                  "before:absolute before:left-0 before:top-[0.55em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary",
                )}
              >
                {line}
              </li>
            ))}
          </ul>
        </SectionReveal>
      </SectionShell>
    </>
  );
}
