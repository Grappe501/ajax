import { headers } from "next/headers";

/** Public site origin for magic-link redirects (falls back to env or localhost). */
export async function getSiteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto =
    h.get("x-forwarded-proto") ??
    (host?.includes("localhost") ? "http" : "https");
  if (host) return `${proto}://${host}`;
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
}
