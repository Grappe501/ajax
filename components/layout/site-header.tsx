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
import { site } from "@/content/site";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const joinHref = "/#volunteer-form";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Image
            src="/logos/ajax-logo.svg"
            alt="AJAX campaign logo"
            width={120}
            height={72}
            className="h-11 w-auto rounded-lg"
            priority
          />
          <span className="font-display text-lg font-bold leading-tight text-primary">
            Volunteer Hub
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
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
                  "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                  active && "bg-muted text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={joinHref}
            onClick={() => trackEvent(ANALYTICS_EVENT.joinVolunteerCta)}
            className={cn(
              buttonVariants({ size: "lg" }),
              "hidden rounded-xl px-5 font-semibold shadow-sm sm:inline-flex",
            )}
          >
            Join the Team
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "lg:hidden",
              )}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(100%,380px)]">
              <SheetHeader>
                <SheetTitle className="font-display text-left text-xl">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1" aria-label="Mobile">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
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
                    "mt-4 flex h-11 items-center justify-center rounded-xl font-semibold",
                  )}
                >
                  Join the Team
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
