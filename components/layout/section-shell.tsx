import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  children,
  className,
  muted,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-border/50 py-20 md:py-28",
        muted && "ajax-section-muted relative",
        className,
      )}
    >
      {muted ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(253,185,19,0.06),transparent)]"
          aria-hidden
        />
      ) : null}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
