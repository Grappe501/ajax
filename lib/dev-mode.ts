/**
 * Development / preview tools: dummy sessions, demo dashboards, admin bypass (local only).
 * Never enable admin bypass in production builds.
 */

export function isDevPortalEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true;
  return process.env.NEXT_PUBLIC_DEV_PORTAL === "true";
}

export function isDevAdminBypassAllowed(): boolean {
  return process.env.NODE_ENV === "development";
}

/** Cookie names — set via POST /api/dev/session */
export const DEV_COOKIE = {
  adminBypass: "ajax-dev-admin",
  wardDemoSlug: "ajax-dev-ward-demo",
} as const;
