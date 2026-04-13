import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { site } from "@/content/site";

export function SiteFooter() {
  const quick = [
    { label: "Initiative explainer", href: "/initiative" },
    { label: "Campaign", href: "/campaign" },
    { label: "Why It Matters", href: "/why-it-matters" },
    { label: "Volunteer", href: "/volunteer" },
    { label: "Get Involved", href: "/connect" },
    { label: "Events", href: "/events" },
    { label: "Wards", href: "/wards" },
    { label: "Movement", href: "/movement" },
    { label: "Rules", href: "/rules" },
    { label: "Training", href: "/training" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/resources" },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-accent/20 bg-gradient-to-b from-ajax-navy-deep via-primary to-ajax-navy-deep text-primary-foreground">
      <div
        className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-accent/20 blur-md" aria-hidden />
                <Image
                  src={site.brand.logoSrc}
                  alt=""
                  width={site.brand.logoWidth}
                  height={site.brand.logoHeight}
                  className="relative h-16 w-auto max-w-[140px] object-contain object-left drop-shadow-lg"
                />
              </div>
              <div className="space-y-3">
                <p className="font-display text-xl font-bold tracking-tight">
                  AJAX Volunteer Hub
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/85">
                  {site.footer.mission}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Site map
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm font-medium text-primary-foreground/90 transition hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Connect
            </p>
            <p>
              <a
                href={`mailto:${site.footer.email}`}
                className="text-sm font-semibold text-white underline-offset-4 transition hover:text-accent hover:underline"
              >
                {site.footer.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-4">
              {site.footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm font-medium text-primary-foreground/85 transition hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-10 bg-white/15" />
        <p className="text-center text-xs text-primary-foreground/65">
          {site.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
