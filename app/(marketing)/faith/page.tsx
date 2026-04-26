import type { Metadata } from "next";
import Link from "next/link";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { faithInvolvement } from "@/content/faith-involvement";
import { getAjaxDonateUrl } from "@/config/campaign-external";

export const metadata: Metadata = {
  title: "Faith involvement",
  description:
    "How Jacksonville congregations can connect civic duty with neighborhood voice — education, signing, and respectful partnership.",
};

export default function FaithInvolvementPage() {
  const donate = getAjaxDonateUrl();

  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading title={faithInvolvement.title} subtitle={faithInvolvement.dek} />

      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        {faithInvolvement.heroPoints.map((block) => (
          <article
            key={block.title}
            className="rounded-2xl border border-primary/15 bg-gradient-to-br from-card to-secondary/30 p-6 shadow-sm md:p-8"
          >
            <h2 className="font-display text-xl font-bold text-primary md:text-2xl">{block.title}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">{block.body}</p>
          </article>
        ))}

        <section className="rounded-2xl border border-accent/25 bg-accent/10 p-6 md:p-8">
          <h2 className="font-display text-xl font-bold text-primary">{faithInvolvement.pastorPacket.title}</h2>
          <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
            {faithInvolvement.pastorPacket.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <PrimaryButton href={faithInvolvement.pastorPacket.ctaHref}>
              {faithInvolvement.pastorPacket.ctaLabel}
            </PrimaryButton>
            <SecondaryButton href="/hub">Volunteer hub</SecondaryButton>
          </div>
        </section>

        <p className="text-sm leading-relaxed text-muted-foreground">{faithInvolvement.wardAlignment}</p>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-primary">Support the field work</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Donations process through GoodChange (same platform family as our statewide site). Replace the placeholder
            slug when the AJAX account is live — or use the env override{" "}
            <code className="rounded bg-muted px-1 text-xs">NEXT_PUBLIC_AJAX_GOODCHANGE_URL</code>.
          </p>
          <Link
            href={donate}
            className="mt-4 inline-flex rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-ajax transition hover:opacity-95"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate (GoodChange) ↗
          </Link>
        </section>
      </div>
    </SectionShell>
  );
}
