import { ANALYTICS_EVENT } from "@/lib/constants";

type AnalyticsEventName =
  (typeof ANALYTICS_EVENT)[keyof typeof ANALYTICS_EVENT];

/** Hook for future analytics (GA4, Plausible, etc.). No-op in Phase 1. */
export function trackEvent(
  name: AnalyticsEventName,
  payload?: Record<string, string | number | boolean | undefined>,
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("ajax:analytics", { detail: { name, ...payload } }),
  );
}
