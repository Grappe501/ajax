import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl space-y-4 md:mb-14",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div className={cn(align === "center" && "flex justify-center")}>
          <p className="inline-flex items-center rounded-r-full border border-primary/10 border-l-4 border-l-accent bg-white/90 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.18em] text-primary shadow-sm shadow-primary/5 backdrop-blur-sm">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-extrabold tracking-[-0.03em] text-foreground md:text-4xl lg:text-[2.65rem] lg:leading-[1.12]",
          align === "center" && "text-balance-safe",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <div className="text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
          {subtitle}
        </div>
      ) : null}
    </div>
  );
}
