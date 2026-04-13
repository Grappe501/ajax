/** Maps JavaScript API — restrict key by HTTP referrer in Google Cloud Console. */
export function isGoogleMapsConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim().length);
}
