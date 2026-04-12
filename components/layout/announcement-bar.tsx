"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";

import { site } from "@/content/site";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

export function AnnouncementBar() {
  const { announcement } = site;
  return (
    <div className="border-b border-primary/20 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2.5 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="flex items-start gap-2 font-medium sm:items-center">
          <Megaphone className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>
            <span className="font-semibold">{announcement.goal}</span>
            <span className="mx-2 text-primary-foreground/80">·</span>
            <span className="text-primary-foreground/90">{announcement.sub}</span>
          </span>
        </p>
        <Link
          href={announcement.ctaHref}
          onClick={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {announcement.ctaLabel}
        </Link>
      </div>
    </div>
  );
}
