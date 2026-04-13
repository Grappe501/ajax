import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SecondaryButton } from "@/components/cta/secondary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { Card } from "@/components/ui/card";
import { wards } from "@/content/wards";

export function WardsPreviewSection() {
  return (
    <SectionShell id="wards" muted>
      <SectionHeading
        title="Jacksonville’s five wards"
        subtitle="Each ward grows a team anchored by a ward captain. Phase 1 introduces the map — Phase 2 deepens tools and dashboards."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {wards.map((w) => (
          <Card
            key={w.slug}
            className="rounded-2xl border-border/80 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg font-bold">{w.name}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold capitalize text-muted-foreground">
                {w.status}
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{w.summary}</p>
            <p className="mt-3 text-xs text-muted-foreground">{w.captain}</p>
            <Link
              href={`/wards/${w.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Ward preview
              <ArrowRight className="size-4" />
            </Link>
          </Card>
        ))}
      </div>
      <div className="mt-6">
        <SecondaryButton href="/wards">Explore ward overview</SecondaryButton>
      </div>
    </SectionShell>
  );
}
