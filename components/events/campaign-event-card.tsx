import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

import {
  campaignEventKindLabel,
  type CampaignEventKind,
} from "@/lib/campaign-events/kinds";
import {
  formatCampaignEventDate,
  formatCampaignEventTimeRange,
} from "@/lib/campaign-events/format";
import type { CampaignEventPublic } from "@/lib/campaign-events/types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function labelForKind(k: string): string {
  return k in campaignEventKindLabel
    ? campaignEventKindLabel[k as CampaignEventKind]
    : k;
}

export function CampaignEventCard({ event }: { event: CampaignEventPublic }) {
  const kind = labelForKind(event.event_kind);

  return (
    <Card
      className={cn(
        "relative flex flex-col rounded-2xl border p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md",
        event.is_demo && "border-amber-400/60 bg-amber-50/40 dark:bg-amber-950/20",
      )}
    >
      {event.is_demo ? (
        <p className="absolute right-4 top-4 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          Demo
        </p>
      ) : null}
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{kind}</p>
      <h3 className="font-display mt-2 pr-16 text-xl font-bold leading-snug text-foreground">
        {event.title}
      </h3>
      <p className="mt-3 text-sm font-medium text-foreground">
        {formatCampaignEventDate(event.starts_at)} ·{" "}
        {formatCampaignEventTimeRange(event.starts_at, event.ends_at)}
      </p>
      <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
        <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
        <span>
          <span className="font-medium text-foreground">{event.location_label}</span>
          {event.address ? (
            <>
              <br />
              {event.address}
            </>
          ) : null}
          {event.ward_hint ? (
            <span className="mt-1 block text-xs">Ward / area: {event.ward_hint}</span>
          ) : null}
        </span>
      </p>
      {event.audience ? (
        <div className="mt-4 text-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Who</p>
          <p className="mt-1 leading-relaxed text-muted-foreground">{event.audience}</p>
        </div>
      ) : null}
      {event.format_notes ? (
        <div className="mt-3 text-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            How it works
          </p>
          <p className="mt-1 leading-relaxed text-muted-foreground">{event.format_notes}</p>
        </div>
      ) : null}
      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border/60 pt-4 text-sm">
        <span className="text-muted-foreground">Host / contact:</span>
        <span className="font-medium text-foreground">{event.organizer_name}</span>
        <Link
          href={`mailto:${encodeURIComponent(event.organizer_email)}?subject=${encodeURIComponent(`Event: ${event.title}`)}`}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
        >
          <Mail className="size-4" aria-hidden />
          Email
        </Link>
        {event.organizer_phone ? (
          <a href={`tel:${event.organizer_phone.replace(/\D/g, "")}`} className="font-medium text-primary hover:underline">
            {event.organizer_phone}
          </a>
        ) : null}
      </div>
    </Card>
  );
}
