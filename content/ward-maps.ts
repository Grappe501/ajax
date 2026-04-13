/**
 * Ward coverage copy + simplified map geometry for organizing.
 * Boundaries are vertical strips approximating city extent — not legal survey lines.
 * Replace `boundaryPath` with GIS-exported coordinates when available.
 */
import type { Ward } from "@/content/wards";

export const OFFICIAL_JACKSONVILLE_WARD_MAP_PDF =
  "https://www.cityofjacksonville.net/DocumentCenter/View/699/Jacksonville-Ward-Map-2012-PDF";

export const PULASKI_JACKSONVILLE_WARD_MAP_PDF =
  "https://votepulaskiar.gov/maps/Municipals/City%20of%20Jacksonville%2036x48.pdf";

/** City extent used for simplified ward strips (lat/lng). */
const EXTENT = {
  south: 34.805,
  north: 34.935,
  /** West → east edges; five wards sit between these longitudes. */
  lngEdges: [-92.205, -92.164, -92.123, -92.082, -92.041, -92.0] as const,
};

function rect(
  south: number,
  north: number,
  west: number,
  east: number,
): { lat: number; lng: number }[] {
  return [
    { lat: south, lng: west },
    { lat: north, lng: west },
    { lat: north, lng: east },
    { lat: south, lng: east },
    { lat: south, lng: west },
  ];
}

export type WardMapContent = {
  slug: Ward["slug"];
  /** Map camera if not fitting bounds */
  center: { lat: number; lng: number };
  defaultZoom: number;
  boundaryPath: readonly { lat: number; lng: number }[];
  /** Fill color for polygon (hex + alpha via Maps API) */
  fillColor: string;
  neighborhoods: readonly string[];
  majorStreets: readonly string[];
  landmarks: readonly string[];
  /** Short paragraph describing geography / organizing focus */
  coverageSummary: string;
};

function centerOfRect(
  south: number,
  north: number,
  west: number,
  east: number,
): { lat: number; lng: number } {
  return { lat: (south + north) / 2, lng: (west + east) / 2 };
}

const { south, north, lngEdges } = EXTENT;

const wardGeometries: Record<Ward["slug"], Omit<WardMapContent, "neighborhoods" | "majorStreets" | "landmarks" | "coverageSummary">> =
  {
    "ward-1": {
      slug: "ward-1",
      boundaryPath: rect(south, north, lngEdges[0], lngEdges[1]),
      center: centerOfRect(south, north, lngEdges[0], lngEdges[1]),
      defaultZoom: 12,
      fillColor: "#1d4ed8",
    },
    "ward-2": {
      slug: "ward-2",
      boundaryPath: rect(south, north, lngEdges[1], lngEdges[2]),
      center: centerOfRect(south, north, lngEdges[1], lngEdges[2]),
      defaultZoom: 12,
      fillColor: "#0d9488",
    },
    "ward-3": {
      slug: "ward-3",
      boundaryPath: rect(south, north, lngEdges[2], lngEdges[3]),
      center: centerOfRect(south, north, lngEdges[2], lngEdges[3]),
      defaultZoom: 13,
      fillColor: "#b45309",
    },
    "ward-4": {
      slug: "ward-4",
      boundaryPath: rect(south, north, lngEdges[3], lngEdges[4]),
      center: centerOfRect(south, north, lngEdges[3], lngEdges[4]),
      defaultZoom: 12,
      fillColor: "#15803d",
    },
    "ward-5": {
      slug: "ward-5",
      boundaryPath: rect(south, north, lngEdges[4], lngEdges[5]),
      center: centerOfRect(south, north, lngEdges[4], lngEdges[5]),
      defaultZoom: 12,
      fillColor: "#7c3aed",
    },
  };

const wardCopy: Record<
  Ward["slug"],
  Pick<WardMapContent, "neighborhoods" | "majorStreets" | "landmarks" | "coverageSummary">
> = {
  "ward-1": {
    coverageSummary:
      "West and northwest Jacksonville — older residential grids, schools, and corridors toward the Little Rock Air Force Base approach. Use this list with the shaded area to plan turf; lines are simplified.",
    neighborhoods: [
      "Northwest residential grids",
      "Areas west of Main Street / AR-67",
      "Neighborhoods near Dupree Park and north city limits",
    ],
    majorStreets: [
      "Main Street (US-67 / North / South)",
      "Graham Road",
      "North Redmond Road",
      "Marshall Road",
    ],
    landmarks: ["Dupree Park", "US-67 / I-440 interchange area", "Schools — verify ward by address"],
  },
  "ward-2": {
    coverageSummary:
      "Northeast Jacksonville — mixed residential and commercial strips along the Highway 67 / Main corridor toward the north and east. Coordinate canvassing from the official PDF if a block sits on a boundary.",
    neighborhoods: [
      "Northeast subdivisions",
      "Corridors along US-67 / Main north of downtown",
      "Residential pockets toward the eastern city edge",
    ],
    majorStreets: ["North Redmond Road", "Main Street / US-67", "Harris Road", "Vandenberg Boulevard (nearby)"],
    landmarks: ["US-67 retail and service corridors", "Schools — verify ward by address"],
  },
  "ward-3": {
    coverageSummary:
      "Central Jacksonville — city hall, municipal services, and the densest street grid. Good for tabling and foot traffic if permitted; parking and safety first.",
    neighborhoods: [
      "Downtown / Municipal Drive core",
      "Central Main Street blocks",
      "Mixed-use and older neighborhoods ringing city hall",
    ],
    majorStreets: ["Main Street", "1st–7th Street grid (numbered streets)", "South Redmond Road", "Municipal Drive"],
    landmarks: ["City Hall (1 Municipal Drive)", "Central Main Street business strip", "Schools — verify ward by address"],
  },
  "ward-4": {
    coverageSummary:
      "Southeast Jacksonville — residential growth areas and connectors toward the south and east. Pair map study with the official ward PDF for edge cases.",
    neighborhoods: ["Southeast subdivisions", "South of downtown residential belts", "Areas east of central Main"],
    majorStreets: ["South Redmond Road", "East Main approaches", "Zion Street", "Deerwood Drive (area)"],
    landmarks: ["Southside commercial strips", "Parks — check official city listings"],
  },
  "ward-5": {
    coverageSummary:
      "Southwest Jacksonville — western approaches and neighborhoods along Graham and southern connectors. Often used for corridor-style organizing.",
    neighborhoods: ["Southwest residential areas", "Neighborhoods along Graham Road", "Western edge toward county line"],
    majorStreets: ["Graham Road", "South Redmond Road", "Marshall Road", "AR-440 / interchange access roads"],
    landmarks: ["Graham Road commercial nodes", "Schools — verify ward by address"],
  },
};

export function getWardMapContent(slug: Ward["slug"]): WardMapContent {
  const g = wardGeometries[slug];
  const c = wardCopy[slug];
  return { ...g, ...c };
}

export const wardMapDisclaimer =
  "Shaded area is a simplified organizing overlay split into five columns — not a legal survey. For exact ward lines, annexations, and redistricting, use the official city / county maps below.";
