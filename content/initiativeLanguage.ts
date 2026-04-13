/**
 * Initiative language for /initiative/language.
 * Replace `legalText` strings with verbatim text from the official petition PDF when finalizing.
 */
export const initiativeLanguageMeta = {
  title: "Initiative language",
  description:
    "Popular name, ballot title, and ordinance sections — with plain-English notes. Not legal advice; read the official petition.",
};

export const popularName =
  "Jacksonville Ward-Based Representation Initiative Ordinance of 2026";

export const ballotTitle =
  "An ordinance to establish ward-based (nonpartisan) elections for Jacksonville City Council and to abolish at-large council elections for ward seats.";

export type InitiativeSection = {
  id: string;
  shortTitle: string;
  legalText: string;
  plainEnglish: string;
  whyMatters: string;
};

export const initiativeSections: InitiativeSection[] = [
  {
    id: "sec-1",
    shortTitle: "Section 1 — Short Title",
    legalText:
      "[Verbatim from petition pages 2–3.] Ordinance may be cited as the “Jacksonville Ward-Based Representation Initiative Ordinance of 2026.”",
    plainEnglish: "This is the official short name people will see on materials and filings.",
    whyMatters: "It ties every reference to one clear measure.",
  },
  {
    id: "sec-2",
    shortTitle: "Section 2 — Purpose and Intent",
    legalText:
      "[Verbatim.] The people find that at-large elections for ward seats dilute neighborhood accountability; the purpose is to align council representation with residents of each ward.",
    plainEnglish:
      "Explains why the measure exists: so people who live in a ward have the primary say in who represents that ward.",
    whyMatters: "Courts and voters look here for the policy goal behind the text.",
  },
  {
    id: "sec-3",
    shortTitle: "Section 3 — Abolition of the Current At-Large Voting System",
    legalText:
      "[Verbatim.] Describes ending the practice of citywide voting for ward-designated council seats.",
    plainEnglish:
      "The current system lets any registered voter in the city vote in every ward race; this section ends that for ward seats.",
    whyMatters: "This is the core structural change.",
  },
  {
    id: "sec-4",
    shortTitle: "Section 4 — Ward-Based Representation Voting System",
    legalText:
      "[Verbatim.] Describes how ward-only elections would work, including two nonpartisan representatives per ward and staggered terms as set out in the measure.",
    plainEnglish:
      "Sets up the replacement system: wards elect their own council members under the rules in the ordinance.",
    whyMatters: "This is what would go into city law if voters approve.",
  },
  {
    id: "sec-5",
    shortTitle: "Section 5 — Powers and Duties",
    legalText: "[Verbatim.] Council powers and duties consistent with the charter and state law.",
    plainEnglish: "Clarifies that the council still operates within Arkansas law and the city charter.",
    whyMatters: "Avoids confusion that the measure creates powers outside normal city government.",
  },
  {
    id: "sec-6",
    shortTitle: "Section 6 — Qualifications",
    legalText: "[Verbatim.] Qualifications for candidates for ward seats.",
    plainEnglish: "Who may run for a ward seat under the new system (as stated in the measure).",
    whyMatters: "Voters and candidates need to know eligibility rules.",
  },
  {
    id: "sec-7",
    shortTitle: "Section 7 — Codification",
    legalText: "[Verbatim.] How the ordinance fits into the municipal code.",
    plainEnglish: "Technical section about how the law is filed in the city’s code.",
    whyMatters: "Important for clerks and attorneys; most residents skim.",
  },
  {
    id: "sec-8",
    shortTitle: "Section 8 — Severability",
    legalText: "[Verbatim.] If one part is held invalid, the rest may remain in effect where allowed.",
    plainEnglish: "A standard clause so one problem does not automatically erase the whole ordinance.",
    whyMatters: "Protects as much of the reform as possible if part is challenged.",
  },
  {
    id: "sec-9",
    shortTitle: "Section 9 — Effective Date",
    legalText: "[Verbatim.] When the ordinance would take effect if adopted.",
    plainEnglish: "Tells you the timeline for implementation after a successful vote.",
    whyMatters: "Residents and officials need to know when rules change.",
  },
];

export const initiativePlainOverview = {
  title: "Plain-English overview",
  body:
    "If adopted, the ordinance would move Jacksonville from citywide (at-large) voting for ward council seats to ward-based elections: residents in each ward would be the primary electorate for that ward’s two nonpartisan council representatives, with qualifications, terms, and details as written in the full text. Read the sections below alongside the official petition language.",
};
