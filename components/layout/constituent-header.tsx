"use client";

import Image from "next/image";
import Link from "next/link";

import { PrimaryButton } from "@/components/cta/primary-button";
import { PublicThemeToggle } from "@/components/layout/public-theme-toggle";
import { site } from "@/content/site";

/** Slim header for the constituent explainer — no full volunteer nav. */
export function ConstituentHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/90 shadow-sm shadow-primary/5 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3.5 sm:px-6">
        <Link
          href="/initiative"
          className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image
            src={site.brand.logoSrc}
            alt={site.brand.logoAlt}
            width={site.brand.logoWidth}
            height={site.brand.logoHeight}
            className="h-10 w-auto max-w-[120px] object-contain object-left sm:h-11"
            priority
          />
          <span className="font-display text-sm font-bold leading-tight text-primary sm:text-base">
            Initiative
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          <PublicThemeToggle />
          <PrimaryButton href="/" size="lg" className="rounded-xl px-4 text-sm sm:px-5 sm:text-base">
            Join the Volunteer Hub
          </PrimaryButton>
        </div>
      </div>
    </header>
  );
}
