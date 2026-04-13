import { Quote } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { site } from "@/content/site";

export function VolunteerStorySection() {
  return (
    <SectionShell>
      <SectionHeading
        title={site.volunteerStory.title}
        subtitle={
          <>
            {site.volunteerStory.body.map((p) => (
              <p key={p.slice(0, 24)} className="mb-3 last:mb-0">
                {p}
              </p>
            ))}
          </>
        }
      />
      <blockquote className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-white via-ajax-mist/80 to-secondary/60 px-8 py-6 text-lg font-medium leading-relaxed text-foreground shadow-ajax md:px-10 md:py-8">
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-accent via-primary to-accent"
          aria-hidden
        />
        <Quote className="mb-3 size-8 text-primary/25" aria-hidden />
        {site.volunteerStory.reassurance}
      </blockquote>
    </SectionShell>
  );
}
