/** Normalize origin (no trailing slash) for building paths. */
export function normalizeSiteBase(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

export function publicCampaignUrls(base: string) {
  const b = normalizeSiteBase(base);
  return {
    home: `${b}/`,
    initiative: `${b}/initiative`,
    campaign: `${b}/campaign`,
  } as const;
}
