const DISPLAY_TZ = "America/Chicago";

export function formatCampaignEventDate(iso: string): string {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(d);
}

export function formatCampaignEventTimeRange(
  startsIso: string,
  endsIso: string | null,
): string {
  const start = new Date(startsIso);
  const timeFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: DISPLAY_TZ,
    hour: "numeric",
    minute: "2-digit",
  });
  const startStr = timeFmt.format(start);
  if (!endsIso) return `${startStr} CT (end time TBD)`;
  const end = new Date(endsIso);
  return `${startStr} – ${timeFmt.format(end)} CT`;
}
