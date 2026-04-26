/**
 * Arkansas & U.S. ballot-measure history — progressive archive.
 * Measures arrays are intentionally partial; expand with clerk records + Ballotpedia imports over time.
 */

import { getLegalSourceById } from "@/content/legal/sourceRegistry";

export type HistoryMeasure = {
  year: number;
  shortName: string;
  /** neutral label */
  result: "adopted" | "failed" | "qualified" | "litigated" | "context";
  blurb: string;
  /** optional external deep read */
  href?: string;
};

export type DecadeBlock = {
  id: string;
  label: string;
  usContext: string;
  arkansasContext: string;
  measures: HistoryMeasure[];
};

export const ballotHistoryIntro = {
  title: "Ballot measure history",
  subtitle:
    "How initiative power spread across the U.S., how Arkansas adopted it in 1910, and decade-by-decade notes you can expand into a full archive.",
  disclaimer:
    "Historical summaries are for education. Measure lists are seeded, not exhaustive — researchers should verify dates and vote totals with official canvasses.",
} as const;

export const decadeBlocks: DecadeBlock[] = [
  {
    id: "1910s",
    label: "1910s",
    usContext:
      "The Progressive Era exported initiative and referendum from western states across the country — a reaction to machine politics and corporate dominance in legislatures.",
    arkansasContext:
      "Voters ratified Amendment 10 in September 1910, adding initiative and referendum to Article 5 after legislative passage the prior year — Arkansas joined the wave of southern and midwestern states expanding direct democracy.",
    measures: [
      {
        year: 1910,
        shortName: "Amendment 10 — Initiative & referendum framework",
        result: "adopted",
        blurb: "Created the constitutional backbone for citizen lawmaking and veto referenda in Arkansas.",
        href: getLegalSourceById("legal-ballotpedia-ar-1910-amendment-10").url,
      },
    ],
  },
  {
    id: "1920s",
    label: "1920s",
    usContext:
      "Post-WWI politics tested whether direct democracy would mature into stable administration or become a battleground for prohibition, labor, and tax fights.",
    arkansasContext:
      "Arkansas usage remained lighter than western counterparts — documentation is sparse online; county archives often hold the real paper trail.",
    measures: [],
  },
  {
    id: "1930s",
    label: "1930s",
    usContext:
      "Depression-era ballot measures tackled finance, utilities, and relief — voters sometimes used initiatives when legislatures froze.",
    arkansasContext:
      "Southern legislatures often resisted broad initiative cultures; Arkansas’s rules still mattered mostly for constitutional amendments and targeted statutes.",
    measures: [],
  },
  {
    id: "1940s",
    label: "1940s",
    usContext:
      "Wartime centralization slowed initiative innovation; postwar suburbs later reshaped signature geography.",
    arkansasContext:
      "Document wartime measures locally if any qualified — many archives are unscanned.",
    measures: [],
  },
  {
    id: "1950s",
    label: "1950s",
    usContext:
      "Cold-war politics and civil-rights tensions sometimes bypassed legislatures via direct democracy in other states — Arkansas’s story is more court- and legislature-driven until later decades.",
    arkansasContext:
      "Use this decade to log school, tax, and liquor measures if clerks have records.",
    measures: [],
  },
  {
    id: "1960s",
    label: "1960s",
    usContext:
      "Federal civil-rights enforcement reshaped state politics; initiatives elsewhere addressed fair housing and taxation.",
    arkansasContext:
      "Good era to research county liquor-option and tax votes that prefigured modern local petition fights.",
    measures: [],
  },
  {
    id: "1970s",
    label: "1970s",
    usContext:
      "Post-Watergate skepticism boosted transparency and ethics measures on ballots nationwide.",
    arkansasContext:
      "Start logging tax, environmental, and governance proposals — cross-check Arkansas State Archives.",
    measures: [],
  },
  {
    id: "1980s",
    label: "1980s",
    usContext:
      "Tax limitation movements (think Tabor-style DNA) spread; states experimented with supermajority rules.",
    arkansasContext:
      "Tie-in upcoming research on term limits and fiscal measures that shaped modern Arkansas campaigning.",
    measures: [],
  },
  {
    id: "1990s",
    label: "1990s",
    usContext:
      "Term limits, gambling, and education reforms dominated initiative headlines across the South and Midwest.",
    arkansasContext:
      "Arkansas saw high-profile constitutional fights — use this card to anchor future deep pages per measure.",
    measures: [],
  },
  {
    id: "2000s",
    label: "2000s",
    usContext:
      "Post-Bush v. Gore, election-administration fights intersected with initiative campaigns on ID, redistricting, and ethics.",
    arkansasContext:
      "Lottery and education measures often define this era in popular memory — verify specifics before publishing hero stats.",
    measures: [],
  },
  {
    id: "2010s",
    label: "2010s",
    usContext:
      "Medicaid expansion, marijuana, and minimum-wage battles showed how Medicaid and labor groups weaponized direct democracy in red states.",
    arkansasContext:
      "National reporters learned Arkansas shorthand: wage and cannabis measures collided with legislative attempts to tighten the process.",
    measures: [
      {
        year: 2018,
        shortName: "Minimum wage & medical cannabis package (context)",
        result: "context",
        blurb: "Illustrates how Arkansas campaigns paired labor and health measures — research exact certification timelines locally.",
        href: getLegalSourceById("legal-ballotpedia-ar-issue-5-2018-minwage").url,
      },
    ],
  },
  {
    id: "2020s",
    label: "2020s",
    usContext:
      "Post-2020, legislatures in many states passed aggressive circulator regulations — Arkansas’s 2021–2025 wave fits that national pattern.",
    arkansasContext:
      "Document everything from Act 951 through the 2025 package and the League of Women Voters litigation — this is living history.",
    measures: [
      {
        year: 2025,
        shortName: "Direct-democracy litigation (preliminary injunction)",
        result: "litigated",
        blurb: "Federal court limited enforcement of some 2025 statutes pending trial — pair with /initiative/law/litigation.",
      },
    ],
  },
];

export function getDecade(id: string): DecadeBlock | undefined {
  return decadeBlocks.find((d) => d.id === id);
}

export function decadeIds(): string[] {
  return decadeBlocks.map((d) => d.id);
}
