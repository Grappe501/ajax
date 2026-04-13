"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PublicThemeToggle } from "@/components/layout/public-theme-toggle";
import { site } from "@/content/site";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const joinHref = "/hub";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-card/70 shadow-[0_8px_32px_-18px_rgba(0,45,98,0.18)] backdrop-blur-2xl supports-[backdrop-filter]:bg-card/55">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-80"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent"
        aria-hidden
      />
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl p-1 pr-2 transition hover:bg-primary/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image
            src={site.brand.logoSrc}
            alt={site.brand.logoAlt}
            width={site.brand.logoWidth}
            height={site.brand.logoHeight}
            className="h-12 w-auto max-w-[min(168px,40vw)] object-contain object-left transition group-hover:drop-shadow-md sm:h-14 sm:max-w-[188px]"
            priority
          />
          <span className="hidden font-display text-lg font-bold leading-tight text-primary sm:block">
            Volunteer Hub
          </span>
        </Link>

        <nav
          className="hidden max-w-[min(100%,52rem)] flex-wrap items-center justify-end gap-x-0.5 gap-y-1.5 text-[13px] lg:flex xl:max-w-none xl:text-sm"
          aria-label="Primary"
        >
          {site.nav.map((item) => {
            const isHash = item.href.includes("#");
            const active = !isHash && pathname === item.href.split("#")[0];
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:bg-primary/[0.07] hover:text-primary",
                  active &&
                    "bg-primary/[0.08] text-primary shadow-inner shadow-primary/10",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <PublicThemeToggle className="hidden sm:inline-flex" />
          <Link
            href={joinHref}
            onClick={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden rounded-xl border border-accent/30 px-5 font-semibold shadow-ajax transition hover:shadow-ajax-lg sm:inline-flex",
            )}
          >
            Volunteer hub
          </Link>

          <PublicThemeToggle className="sm:hidden" />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "rounded-xl border-primary/20 lg:hidden",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[min(100%,380px)] border-l border-primary/10 bg-gradient-to-b from-card to-secondary/40"
            >
              <SheetHeader>
                <SheetTitle className="font-display text-left text-xl text-primary">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-semibold text-foreground transition hover:bg-primary/10 hover:text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href={joinHref}
                  onClick={() => {
                    trackEvent(ANALYTICS_EVENT.joinVolunteerCta);
                    setOpen(false);
                  }}
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "mt-4 flex h-11 items-center justify-center rounded-xl border border-accent/30 font-semibold shadow-ajax",
                  )}
                >
                  Volunteer hub
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
