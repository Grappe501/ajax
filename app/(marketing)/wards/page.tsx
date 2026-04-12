import type { Metadata } from "next";
import Link from "next/link";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { Card } from "@/components/ui/card";
import { PrimaryButton } from "@/components/cta/primary-button";
import { wards } from "@/content/wards";

export const metadata: Metadata = {
  title: "Wards",
  description: "Jacksonville ward teams building for the AJAX campaign.",
};

export default function WardsPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Ward overview"
        subtitle="Each ward will grow its own volunteer circle with a captain coordinating coverage."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {wards.map((w) => (
          <Card key={w.slug} className="rounded-2xl border-border/80 p-5">
            <h2 className="font-display text-xl font-bold">{w.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{w.summary}</p>
            <Link
              href={`/wards/${w.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-primary"
            >
              Open ward preview →
            </Link>
          </Card>
        ))}
      </div>
      <div className="mt-10">
        <PrimaryButton href="/">Back to homepage</PrimaryButton>
      </div>
    </SectionShell>
  );
}
