/** Default map center: Jacksonville, Pulaski County, Arkansas */
export const JACKSONVILLE_AR_CENTER = { lat: 34.8672, lng: -92.1102 } as const;

/** Rough bounding box to validate API viewport queries (Pulaski / Jacksonville area). */
export const JACKSONVILLE_AR_REGION = {
  minLat: 34.72,
  maxLat: 35.05,
  minLng: -92.38,
  maxLng: -91.82,
} as const;
