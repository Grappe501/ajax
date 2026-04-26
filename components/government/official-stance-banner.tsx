import { cn } from "@/lib/utils";
import type { OfficialStance } from "@/content/jacksonville-officials";

export function OfficialStanceBanner({ stance, name }: { stance: OfficialStance; name: string }) {
  const copy: Record<OfficialStance, { label: string; className: string }> = {
    for: {
      label: "PUBLIC STANCE: SUPPORTS letting voters decide (ward-based ballot measure)",
      className: "bg-emerald-600 text-white",
    },
    against: {
      label: "PUBLIC STANCE: OPPOSES the ballot measure as described by AJAX",
      className: "bg-rose-700 text-white",
    },
    unknown: {
      label: "PUBLIC STANCE: NOT YET ON FILE — survey or public statement pending",
      className: "bg-amber-600 text-white",
    },
    no_response: {
      label: "NO RESPONSE YET — questionnaire sent; page will update when answered",
      className: "bg-zinc-600 text-white",
    },
  };

  const cfg = copy[stance];

  return (
    <div
      className={cn(
        "w-full px-4 py-6 text-center font-display text-base font-extrabold uppercase leading-snug tracking-wide md:text-xl md:leading-tight",
        cfg.className,
      )}
      role="status"
      aria-label={`Initiative stance for ${name}`}
    >
      {cfg.label}
    </div>
  );
}
