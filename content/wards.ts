export type WardStatus = "building" | "recruiting" | "launching";

export type Ward = {
  slug: string;
  name: string;
  summary: string;
  status: WardStatus;
  captain: string;
};

export const wards: Ward[] = [
  {
    slug: "ward-1",
    name: "Ward 1",
    summary: "Northside and surrounding neighborhoods — outreach hubs forming.",
    status: "recruiting",
    captain: "Captain recruiting (placeholder)",
  },
  {
    slug: "ward-2",
    name: "Ward 2",
    summary: "Northeast Jacksonville — US-67 / Main corridor and nearby neighborhoods.",
    status: "building",
    captain: "Captain recruiting (placeholder)",
  },
  {
    slug: "ward-3",
    name: "Ward 3",
    summary: "Urban core — high-traffic signing and coalition partners.",
    status: "launching",
    captain: "Captain recruiting (placeholder)",
  },
  {
    slug: "ward-4",
    name: "Ward 4",
    summary: "Southside — neighborhood captains mapping coverage.",
    status: "building",
    captain: "Captain recruiting (placeholder)",
  },
  {
    slug: "ward-5",
    name: "Ward 5",
    summary: "Westside — faith and civic networks building the team.",
    status: "recruiting",
    captain: "Captain recruiting (placeholder)",
  },
];
