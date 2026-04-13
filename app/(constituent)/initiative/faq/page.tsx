import type { Metadata } from "next";
import Link from "next/link";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { AskAjaxPlaceholder } from "@/components/initiative/petition-placeholders";
import { Card } from "@/components/ui/card";
import { initiativeFaqItems, initiativeFaqMeta } from "@/content/initiative-faq";
import { SecondaryButton } from "@/components/cta/secondary-button";

export const metadata: Metadata = {
  title: initiativeFaqMeta.title,
  description: initiativeFaqMeta.description,
};

export default function InitiativeFaqPage() {
  return (
    <InitiativePageShell>
      <header className="mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Help</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {initiativeFaqMeta.title}
        </h1>
        <p className="mt-3 text-muted-foreground">{initiativeFaqMeta.description}</p>
        <div className="mt-4">
          <AskAjaxPlaceholder prefill="Answer common questions about the Jacksonville ward petition." />
        </div>
      </header>

      <div className="space-y-4">
        {initiativeFaqItems.map((item) => (
          <Card key={item.q} className="rounded-2xl border-border/80 p-5 shadow-sm">
            <h2 className="font-display text-base font-bold text-foreground">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-10 rounded-2xl border-primary/20 bg-primary/[0.04] p-6">
        <p className="text-sm font-medium text-foreground">More questions?</p>
        <p className="mt-2 text-sm text-muted-foreground">
          The site FAQ covers volunteering, events, and general campaign topics.
        </p>
        <SecondaryButton href="/faq" className="mt-4 justify-center sm:inline-flex">
          Open full FAQ
        </SecondaryButton>
      </Card>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        <Link href="/initiative" className="font-medium text-primary underline-offset-4 hover:underline">
          Back to initiative overview
        </Link>
      </p>
    </InitiativePageShell>
  );
}
