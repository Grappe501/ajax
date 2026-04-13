import type { Metadata } from "next";
import Link from "next/link";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { Card } from "@/components/ui/card";
import { isDevPortalEnabled } from "@/lib/dev-mode";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Volunteer hub",
  description:
    "Campaign tools in one place — petition education, ward teams, events, training, and the AJAX Guide.",
};

const tiles = [
  {
    title: "Petition Coach",
    body: "Role-based guided walkthrough — fields, mistakes, and practice.",
    href: "/initiative/petition",
  },
  {
    title: "Initiative & language",
    body: "Ordinance overview, ballot title, and how to sign.",
    href: "/initiative",
  },
  {
    title: "Ward teams",
    body: "Pick your ward board, join, and open your organizer dashboard.",
    href: "/wards",
  },
  {
    title: "Events & signing",
    body: "Where to sign and host.",
    href: "/events",
  },
  {
    title: "Rules & training",
    body: "Petition mechanics and previews.",
    href: "/rules",
  },
  {
    title: "FAQ + AJAX Guide",
    body: "Searchable answers — or ask the assistant from any page.",
    href: "/faq",
  },
  {
    title: "Notary support",
    body: "Full public guide — role, petition map, and sign-up.",
    href: "/initiative/notaries",
  },
  {
    title: "Notary workspace",
    body: "Compact training view with the official PDF embed.",
    href: "/hub/notary",
  },
  {
    title: "Connect",
    body: "Signing alerts, hosting, leadership interest.",
    href: "/connect",
  },
] as const;

export default function VolunteerHubPage() {
  const showDev = isDevPortalEnabled();

  return (
    <SectionShell className="min-h-[70vh]">
      <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
        {site.name}
      </div>
      <SectionHeading
        title="Volunteer hub"
        subtitle="Everything you need to learn the initiative, carry petitions correctly, and coordinate with your ward — in one place. The public site stays at the homepage; this hub is for people stepping up."
      />

      {showDev ? (
        <Card className="mb-10 rounded-2xl border-amber-500/30 bg-amber-500/10 p-4 text-sm">
          <strong className="font-semibold text-foreground">Development tools:</strong>{" "}
          <Link href="/dev" className="font-semibold text-primary underline-offset-4 hover:underline">
            Open the dev portal
          </Link>{" "}
          for dummy admin access and a demo ward dashboard with Power of 5 preview.
        </Card>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href} className="group block rounded-2xl">
            <Card className="h-full rounded-2xl border-border/80 p-5 transition group-hover:border-primary/35 group-hover:shadow-md">
              <h2 className="font-display text-lg font-bold text-primary">{t.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                Open →
              </span>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-4 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/[0.06] to-card p-8 shadow-inner sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl font-bold text-foreground">Ready to join the roster?</p>
          <p className="mt-1 text-sm text-muted-foreground">Tell us how you want to help — same form as before.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryButton href="/volunteer#join-form">Join the volunteer team</PrimaryButton>
          <SecondaryButton href="/">Back to public homepage</SecondaryButton>
        </div>
      </div>
    </SectionShell>
  );
}
