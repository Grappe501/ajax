import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { site } from "@/content/site";

export function SiteFooter() {
  const quick = [
    { label: "Why It Matters", href: "/#why-it-matters" },
    { label: "Volunteer", href: "/#volunteer-form" },
    { label: "Rules", href: "/#rules" },
    { label: "Events", href: "/events" },
    { label: "FAQ", href: "/#faq" },
    { label: "Resources", href: "/resources" },
  ];
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
              <Image
                src={site.brand.logoSrc}
                alt=""
                width={site.brand.logoWidth}
                height={site.brand.logoHeight}
                className="h-16 w-auto max-w-[140px] shrink-0 object-contain object-left"
              />
              <div className="space-y-3">
                <p className="font-display text-xl font-bold">
                  AJAX Volunteer Hub
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-primary-foreground/85">
                  {site.footer.mission}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Quick links
            </p>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {quick.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-primary-foreground/90 underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-accent">
              Connect
            </p>
            <p>
              <a
                href={`mailto:${site.footer.email}`}
                className="text-sm font-medium underline-offset-4 hover:underline"
              >
                {site.footer.email}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              {site.footer.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-sm text-primary-foreground/90 underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-primary-foreground/20" />
        <p className="text-center text-xs text-primary-foreground/75">
          {site.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
