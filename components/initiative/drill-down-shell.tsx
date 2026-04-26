import type { ReactNode } from "react";
import Link from "next/link";

import { rulesLegalDisclaimer } from "@/content/rules";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function DrillDownShell({
  eyebrow,
  title,
  subtitle,
  crumbs,
  children,
  showDisclaimer = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  children: ReactNode;
  showDisclaimer?: boolean;
  /** Merge to drop outer padding when nested in a page shell */
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16", className)}>
      {crumbs?.length ? (
        <nav aria-label="Breadcrumb" className="mb-8 text-xs font-semibold text-muted-foreground">
          <ol className="flex flex-wrap gap-x-2 gap-y-1">
            {crumbs.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden>/</span> : null}
                {c.href ? (
                  <Link href={c.href} className="text-primary underline-offset-4 hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-foreground">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
      ) : null}
      <h1 className="font-display mt-2 text-3xl font-extrabold tracking-[-0.03em] text-foreground sm:text-4xl">
        {title}
      </h1>
      {subtitle ? <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{subtitle}</p> : null}
      {showDisclaimer ? (
        <p className="mt-8 rounded-2xl border border-primary/15 bg-primary/[0.04] px-4 py-3 text-sm leading-relaxed text-muted-foreground">
          {rulesLegalDisclaimer}
        </p>
      ) : null}
      <div className="mt-10 space-y-10">{children}</div>
    </div>
  );
}

export function ProseBlock({
  heading,
  children,
  kicker,
}: {
  heading: string;
  children: ReactNode;
  kicker?: string;
}) {
  return (
    <section className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-sm">
      {kicker ? <p className="text-xs font-bold uppercase tracking-wide text-primary">{kicker}</p> : null}
      <h2 className="font-display mt-1 text-xl font-bold text-foreground">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
