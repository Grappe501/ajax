import { SectionHeading } from "@/components/layout/section-heading";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { WardCoverageMapClient } from "@/components/wards/ward-coverage-map-client";
import {
  getWardMapContent,
  OFFICIAL_JACKSONVILLE_WARD_MAP_PDF,
  PULASKI_JACKSONVILLE_WARD_MAP_PDF,
  wardMapDisclaimer,
} from "@/content/ward-maps";
import { isGoogleMapsConfigured } from "@/lib/canvass/env";
import type { Ward } from "@/content/wards";

export function WardCoverageSection({
  wardSlug,
  wardName,
  mapsApiKey,
}: {
  wardSlug: Ward["slug"];
  wardName: string;
  mapsApiKey: string;
}) {
  const map = getWardMapContent(wardSlug);
  const hasKey = isGoogleMapsConfigured() && mapsApiKey.length > 0;

  return (
    <section className="space-y-6" aria-label={`${wardName} map and coverage`}>
      <SectionHeading
        title="Ward map & coverage"
        subtitle={`Streets and neighborhoods organizers use to describe ${wardName}. Compare with the official PDFs — boundaries on the interactive map are simplified.`}
      />

      <p className="rounded-xl border border-amber-500/35 bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-foreground">
        {wardMapDisclaimer}
      </p>

      {hasKey ? (
        <WardCoverageMapClient apiKey={mapsApiKey} content={map} />
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-muted/40 px-4 py-8 text-center text-sm text-muted-foreground">
          <p>
            Add <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{" "}
            to Netlify or <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">.env.local</code> to show
            the shaded ward map. You can still use the official PDFs and the street lists below.
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        <SecondaryButton href={OFFICIAL_JACKSONVILLE_WARD_MAP_PDF}>City ward map (PDF)</SecondaryButton>
        <SecondaryButton href={PULASKI_JACKSONVILLE_WARD_MAP_PDF}>County ward map (PDF)</SecondaryButton>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">{map.coverageSummary}</p>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary">Neighborhoods & areas</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
            {map.neighborhoods.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary">Major streets & corridors</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
            {map.majorStreets.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card/80 p-5 shadow-sm">
        <h3 className="font-display text-sm font-bold uppercase tracking-wide text-primary">Landmarks & reference points</h3>
        <ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-relaxed text-muted-foreground">
          {map.landmarks.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-muted-foreground">
          Confirm schools, parks, and public buildings by address — ward edges can split blocks.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        OpenStreetMap / Google basemap © respective providers. Campaign overlay only.
      </p>
    </section>
  );
}
