/**
 * Legacy static homepage preview data — prefer the Supabase-backed calendar at /events.
 * Kept for typing only; `events` is empty so we never show fake dates as real events.
 */
export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  ctaLabel: string;
  ctaHref: string;
};

export const events: EventItem[] = [];
