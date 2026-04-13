import type { Metadata } from "next";
import Link from "next/link";

import { CanvassMapShell } from "@/components/canvass/canvass-map-shell";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { SupabaseNotice } from "@/components/wards/supabase-notice";
import { WardMagicLinkForm } from "@/components/wards/ward-magic-link-form";
import { isGoogleMapsConfigured } from "@/lib/canvass/env";
import { getRequestOrigin } from "@/lib/request-origin";
import { createSupabaseServer } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Canvass map",
  description: "Field map for authorized AJAX volunteers — voter units and approach notes.",
  robots: { index: false, follow: false },
};

export default async function CanvassMapPage() {
  if (!isSupabaseConfigured()) {
    return (
      <SectionShell className="min-h-[40vh]">
        <SupabaseNotice />
      </SectionShell>
    );
  }

  const supabase = await createSupabaseServer();
  if (!supabase) {
    return (
      <SectionShell className="min-h-[40vh]">
        <SupabaseNotice />
      </SectionShell>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = await getRequestOrigin();
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? "";

  if (!user) {
    return (
      <SectionShell className="min-h-[50vh]">
        <SectionHeading
          title="Field canvass map"
          subtitle="Voter file details are restricted. Sign in with the same magic link you use for ward organizing. After you confirm your email, you will land back here."
        />
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm">
          <WardMagicLinkForm redirectOrigin={origin} nextPath="/canvass/map" />
        </div>
        <p className="mx-auto mt-8 max-w-xl text-center text-xs leading-relaxed text-muted-foreground">
          This tool is for authorized volunteers only. Handle all voter information under Arkansas law
          and your data-use agreement — never export or share lists publicly.
        </p>
      </SectionShell>
    );
  }

  if (!isGoogleMapsConfigured() || !mapsKey) {
    return (
      <SectionShell>
        <SectionHeading
          title="Maps API key missing"
          subtitle="Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your environment (Netlify or .env.local) and enable the Maps JavaScript API for your Google Cloud project. Restrict the key by HTTP referrer."
        />
        <p className="mt-4 text-sm text-muted-foreground">
          <Link href="/volunteer" className="font-semibold text-primary underline-offset-4 hover:underline">
            Back to volunteer hub
          </Link>
        </p>
      </SectionShell>
    );
  }

  return (
    <div>
      <div className="mb-6 max-w-4xl">
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          Field canvass map
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Supercharged mini-van mode: pull pins by viewport, preview the household before you knock,
          and keep turf notes at your side. Data loads from the campaign database — import geocoded
          Jacksonville voter rows into Supabase to populate the field layer.
        </p>
        <p className="mt-3 rounded-xl border border-amber-400/40 bg-amber-50/80 px-4 py-3 text-xs leading-relaxed text-amber-950 dark:bg-amber-950/25 dark:text-amber-50">
          <strong>Demo pins</strong> are labeled in-app. Replace them with your real voter file
          imports; coordinate with counsel on lawful use and retention.
        </p>
      </div>
      <CanvassMapShell apiKey={mapsKey} />
    </div>
  );
}
