"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { site } from "@/content/site";

import { MultilineAnswer } from "@/components/marketing/multiline-answer";

export function CampaignPageContent() {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl border-border/80 p-6 shadow-sm">
          <h3 className="font-display text-xl font-bold text-primary">At-large voting</h3>
          <p className="mt-3 text-muted-foreground">{site.whatCampaign.atLarge}</p>
        </Card>
        <Card className="rounded-2xl border-primary/25 bg-primary/5 p-6 shadow-sm">
          <h3 className="font-display text-xl font-bold text-primary">Ward-only voting</h3>
          <p className="mt-3 text-muted-foreground">{site.whatCampaign.wardOnly}</p>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl border-border/80 p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold">What the petition does</h3>
          <p className="mt-3 text-muted-foreground">{site.whatCampaign.petition}</p>
        </Card>
        <Card className="rounded-2xl border-border/80 p-6 shadow-sm">
          <h3 className="font-display text-lg font-bold">Why it matters locally</h3>
          <p className="mt-3 text-muted-foreground">{site.whatCampaign.local}</p>
        </Card>
      </div>
      <div className="mt-8">
        <p className="font-display text-lg font-bold text-foreground">
          Go deeper: Jacksonville’s system and what reform changes
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Short version above — open a topic below for the full case we make at doors and tables.
        </p>
        <Accordion multiple={false} className="mt-4 w-full space-y-3">
          {site.whatCampaign.deepDive.map((item, i) => (
            <AccordionItem
              key={item.title}
              value={`campaign-deep-${i}`}
              className="rounded-2xl border border-border/70 bg-card/95 px-4 shadow-sm transition-shadow data-[state=open]:border-primary/20 data-[state=open]:shadow-ajax"
            >
              <AccordionTrigger className="text-left font-display text-base font-semibold hover:no-underline">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                <MultilineAnswer text={item.body} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
