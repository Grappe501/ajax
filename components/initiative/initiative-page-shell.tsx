import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { cn } from "@/lib/utils";

export function InitiativePageShell({
  children,
  className,
  wide,
}: {
  children: React.ReactNode;
  className?: string;
  /** Wider layout for petition two-column */
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto px-4 py-10 sm:px-6",
        wide ? "max-w-6xl" : "max-w-3xl lg:max-w-4xl",
        className,
      )}
    >
      <InitiativeSubnav className="mb-8" />
      {children}
    </div>
  );
}
