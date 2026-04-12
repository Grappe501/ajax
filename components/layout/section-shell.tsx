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
        "scroll-mt-28 border-b border-border/60 py-16 md:py-24",
        muted && "bg-secondary/40",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
