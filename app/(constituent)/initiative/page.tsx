import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { initiativeEducation } from "@/content/initiative-education";
import { site } from "@/content/site";
import { MultilineAnswer } from "@/components/marketing/multiline-answer";

const { meta, hero, snapshot, whySign, signing, hubCta, secondaryLinks, deepDiveEyebrow, deepDiveTitle, deepDiveSubtitle } =
  initiativeEducation;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: `${meta.title} · AJAX`,
    description: meta.description,
    type: "article",
  },
};

export default function InitiativeEducationPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <InitiativeSubnav className="mb-10" />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{hero.eyebrow}</p>
      <h1 className="font-display mt-3 text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
        {hero.title}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{hero.dek}</p>

      <section className="mt-10 rounded-2xl border border-primary/20 bg-card p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-lg font-bold text-foreground">Petition education hub</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Walk through the real petition layout, read the ordinance text, and learn how signing works — step by step.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <PrimaryButton href="/initiative/petition" className="justify-center">
            Petition Coach
          </PrimaryButton>
          <SecondaryButton href="/initiative/language" className="justify-center">
            Initiative language
          </SecondaryButton>
          <SecondaryButton href="/initiative/how-to-sign" className="justify-center">
            How to sign
          </SecondaryButton>
          <SecondaryButton href="/initiative/instructions" className="justify-center">
            Full instructions
          </SecondaryButton>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-foreground">{snapshot.title}</h2>
        <ul className="mt-5 space-y-4">
          {snapshot.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-muted-foreground">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
              <span className="leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">{whySign.title}</h2>
        <p className="leading-relaxed text-muted-foreground">{whySign.body}</p>
      </section>

      <Card className="mt-10 rounded-2xl border-primary/20 bg-primary/[0.04] p-6 shadow-sm">
        <h2 className="font-display text-lg font-bold text-primary">{signing.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{signing.body}</p>
      </Card>

      <section className="mt-14 rounded-2xl border border-accent/30 bg-gradient-to-br from-primary/10 via-card to-ajax-mist/50 p-6 shadow-ajax sm:p-8">
        <h2 className="font-display text-xl font-bold text-foreground">{hubCta.title}</h2>
        <p className="mt-2 text-muted-foreground">{hubCta.body}</p>
        <PrimaryButton href={hubCta.hubHref} className="mt-6 w-full justify-center sm:w-auto">
          {hubCta.buttonLabel}
        </PrimaryButton>
        <div className="mt-6 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:flex-wrap sm:gap-3">
          {secondaryLinks.map((l) => (
            <SecondaryButton key={l.href} href={l.href} className="justify-center">
              {l.label}
            </SecondaryButton>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{deepDiveEyebrow}</p>
        <h2 className="font-display mt-2 text-xl font-bold text-foreground">{deepDiveTitle}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{deepDiveSubtitle}</p>
        <Accordion multiple={false} className="mt-5 w-full space-y-2">
          {site.whatCampaign.deepDive.map((item, i) => (
            <AccordionItem
              key={item.title}
              value={`initiative-deep-${i}`}
              className="rounded-xl border border-border/70 bg-card px-3 shadow-sm"
            >
              <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-sm text-muted-foreground">
                <MultilineAnswer text={item.body} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        Share this page:{" "}
        <Link href="/initiative" className="font-medium text-primary underline-offset-4 hover:underline">
          /initiative
        </Link>
      </p>
    </div>
  );
}
