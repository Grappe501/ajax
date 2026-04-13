import { BookOpen } from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { Card } from "@/components/ui/card";

const guides = [
  {
    title: "Sign & drive",
    blurb: "Curbside flow, witness roles, and safety for quick signatures.",
  },
  {
    title: "Tabling & booths",
    blurb: "Materials, volunteer roles, and neighbor conversations that convert.",
  },
  {
    title: "House parties",
    blurb: "Intimate settings for Q&A and signing with people who trust the host.",
  },
  {
    title: "Door-to-door & canvass",
    blurb: "Scripts, turf, and pairing — coming as the field program expands.",
  },
] as const;

export function OpportunityGuides() {
  return (
    <section className="mt-16 border-t border-border/70 pt-14">
      <SectionHeading
        eyebrow="Field playbooks"
        title="Opportunity guides (building)"
        subtitle="We are assembling short, shareable guides for each format. For now, list your event on the calendar and coordinators can help you plan."
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {guides.map((g) => (
          <Card
            key={g.title}
            className="relative rounded-2xl border border-dashed border-border/80 bg-muted/20 p-5"
          >
            <span className="absolute right-4 top-4 rounded-md bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
              Soon
            </span>
            <BookOpen className="size-5 text-primary" aria-hidden />
            <h3 className="font-display mt-3 text-lg font-bold text-foreground">{g.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.blurb}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
