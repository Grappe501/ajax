/** Ballot initiative stance for UI banners — editorial; update when verified. */
export type OfficialStance = "for" | "against" | "unknown" | "no_response";

export type JacksonvilleOfficial = {
  slug: string;
  name: string;
  office: "mayor" | "council";
  wardLabel?: string;
  position?: string;
  yearsInOfficeNote: string;
  stance: OfficialStance;
  stanceNote?: string;
  summary: string;
  newsHighlights: { headline: string; year?: string; url?: string }[];
};

export const officialSurvey = {
  intro:
    "Short questionnaire we email to each officeholder. Answers publish on their page when returned.",
  questions: [
    "Do you support putting ward-based voting for Jacksonville council seats on the ballot for voters to decide? (Yes / No / Undecided)",
    "What is the main reason for your position?",
    "What would you want voters in each ward to understand about how council representation works today?",
    "How should residents contact your office about this topic?",
    "May we publish your responses on the AJAX public site? (Yes / No — partial quotes)",
  ],
} as const;

export const jacksonvilleOfficials: JacksonvilleOfficial[] = [
  {
    slug: "mayor",
    name: "Mayor of Jacksonville",
    office: "mayor",
    yearsInOfficeNote: "Verify current mayor and term dates on the city website.",
    stance: "unknown",
    stanceNote: "Update when public statement or survey is on file.",
    summary:
      "The mayor leads the city’s executive branch. This page will track public statements, timelines in office, and news relevant to governance and elections.",
    newsHighlights: [],
  },
  {
    slug: "council-ward-1-position-a",
    name: "City Council · Ward 1 · Position A",
    office: "council",
    wardLabel: "Ward 1",
    position: "A",
    yearsInOfficeNote: "Pull from city clerk / official roster.",
    stance: "unknown",
    summary: "Council member representing Ward 1 (Position A) under the current at-large election system.",
    newsHighlights: [],
  },
  {
    slug: "council-ward-1-position-b",
    name: "City Council · Ward 1 · Position B",
    office: "council",
    wardLabel: "Ward 1",
    position: "B",
    yearsInOfficeNote: "Pull from city clerk / official roster.",
    stance: "unknown",
    summary: "Council member representing Ward 1 (Position B).",
    newsHighlights: [],
  },
  // Stubs for Wards 2–5 × 2 positions — replace names when roster is imported
  ...[2, 3, 4, 5].flatMap((w) =>
    (["A", "B"] as const).map((pos) => ({
      slug: `council-ward-${w}-position-${pos.toLowerCase()}`,
      name: `City Council · Ward ${w} · Position ${pos}`,
      office: "council" as const,
      wardLabel: `Ward ${w}`,
      position: pos,
      yearsInOfficeNote: "Pull from city clerk / official roster.",
      stance: "unknown" as const,
      summary: `Council member for Ward ${w} (Position ${pos}).`,
      newsHighlights: [] as { headline: string; year?: string; url?: string }[],
    })),
  ),
];

export function getOfficialBySlug(slug: string): JacksonvilleOfficial | undefined {
  return jacksonvilleOfficials.find((o) => o.slug === slug);
}
