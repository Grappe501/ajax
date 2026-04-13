"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";

import { site } from "@/content/site";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function AnnouncementBar() {
  const { announcement } = site;
  return (
    <div className="relative overflow-hidden border-b border-white/10 bg-gradient-to-r from-[#002d62] via-[#003a7a] to-[#002d62] text-white">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent_0%,rgba(253,185,19,0.08)_45%,transparent_70%)]"
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="flex items-start gap-2.5 font-medium sm:items-center">
          <Megaphone
            className="mt-0.5 size-4 shrink-0 text-accent drop-shadow-sm"
            aria-hidden
          />
          <span>
            <span className="font-semibold text-white">{announcement.goal}</span>
            <span className="mx-2 text-primary-foreground/70">·</span>
            <span className="text-primary-foreground/90">{announcement.sub}</span>
          </span>
        </p>
        <Link
          href={announcement.ctaHref}
          onClick={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-bold text-accent-foreground shadow-ajax-gold transition hover:bg-ajax-gold-soft hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {announcement.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
