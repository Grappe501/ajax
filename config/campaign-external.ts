/**
 * External campaign URLs — AJAX-specific. Override via env in Netlify/hosting.
 * GoodChange: same vendor family as RedDirt; AJAX uses its own account when live.
 */

const PLACEHOLDER_GOODCHANGE =
  "https://goodchange.app/donate/REPLACE-WITH-AJAX-SLUG-ONCE-LIVE";

export function getAjaxDonateUrl(): string {
  const o = process.env.NEXT_PUBLIC_AJAX_GOODCHANGE_URL?.trim();
  if (o) return o.replace(/\/$/, "");
  return PLACEHOLDER_GOODCHANGE;
}

/** Pass-through markup on Twilio/SendGrid (and similar) — billable = vendor_cost * (1 + this). */
export const COMMS_PASS_THROUGH_MARKUP = 0.25;

export function applyCommsMarkup(vendorCostUsd: number): number {
  if (!Number.isFinite(vendorCostUsd) || vendorCostUsd < 0) return 0;
  return Math.round(vendorCostUsd * (1 + COMMS_PASS_THROUGH_MARKUP) * 100) / 100;
}
