/**
 * Major Arkansas enactments often discussed alongside petition work (2021–2025).
 * Each entry gets its own drill-down page at /initiative/law/legislature/[slug].
 * Verify text and codification with arkleg.state.ar.us and the official Arkansas Code.
 */

import { buildArklegBillUrl, getLegalSourceById } from "@/content/legal/sourceRegistry";

export type LegislationEntry = {
  slug: string;
  shortTitle: string;
  bill: string;
  act: string;
  sessionYear: number;
  /** Rough categories for filters */
  tags: readonly ("statewide" | "local" | "circulation" | "verification" | "ag-review" | "criminal")[];
  /** Plain-language headline */
  surface: string;
  /** Organizer-focused analysis */
  analysis: readonly string[];
  /** Practical notes for Jacksonville municipal work */
  jacksonvilleNote: string;
  /** True if news/court filings describe this measure as enjoined or partially enjoined — confirm with counsel */
  litigationWatch: boolean;
  arklegQueryPath: string;
  sources: readonly { label: string; href: string }[];
};

export const legislationIndexIntro = {
  title: "Legislation deep dives",
  subtitle:
    "Twelve enacted laws that reshaped Arkansas petition politics between 2021 and 2025 — plus a municipal statute spotlight. Start with the one-line summary; open any card for a longer field-focused analysis.",
  footnote:
    "Session numbering and press shorthand vary. Always confirm the enrolled act and codified sections before relying on this for filing strategy.",
} as const;

export const legislationEntries: LegislationEntry[] = [
  {
    slug: "act-951-sb614-2021",
    shortTitle: "Statewide circulator standards & pay rules",
    bill: "SB614",
    act: "Act 951 of 2021",
    sessionYear: 2021,
    tags: ["statewide", "circulation", "criminal"],
    surface:
      "Banned pay-per-signature for statewide circulators, added residency/citizenship requirements, listed disqualifying criminal history categories, and created new felony exposure for certain payment/affidavit games.",
    analysis: [
      "Before 2021, Arkansas already regulated petitions tightly, but Act 951 imported a familiar national pattern: treat paid circulation as a heavily policed activity with bright-line bans on per-signature compensation.",
      "The disqualifying-offense list (assault, intimidation, sexual offenses, theft, etc.) matters because it interacts with background-check expectations in later local-option bills.",
      "Felony provisions targeting sponsor/circulator payment chains were aimed at fraud rings — but they also raise the stakes for bookkeeping and training.",
    ],
    jacksonvilleNote:
      "AJAX uses unpaid volunteers, so several pay/compensation clauses are chiefly context — but the cultural shift (more criminal exposure statewide) affects how neighbors interpret petition workers everywhere.",
    litigationWatch: false,
    arklegQueryPath: buildArklegBillUrl(2021, "SB614"),
    sources: [
      {
        label: "Ballotpedia — 2021 Arkansas restrictions overview",
        href: getLegalSourceById("legal-ballotpedia-news-2021-05-arkansas-restrictions").url,
      },
    ],
  },
  {
    slug: "act-194-hb1320-2023",
    shortTitle: "Attorney General ballot-title gatekeeping",
    bill: "HB1320",
    act: "Act 194 of 2023",
    sessionYear: 2023,
    tags: ["statewide", "ag-review"],
    surface:
      "Moved pre-circulation review of statewide initiative and referendum titles to the Attorney General, with deadlines to certify or substitute language and a Supreme Court appeal path for sponsors.",
    analysis: [
      "Practically, this shifts the first hard ‘no’ from election administrators to the AG’s office — and front-loads litigation over clarity, partisan impact, and misleading titles.",
      "Ten-business-day windows sound short, but sponsors experience them as strategic choke points: every rewrite ripples through printing, training, and volunteer scripts.",
      "The AG may reject language deemed misleading, including situations where a YES vote would not match voter intent — that standard invites fierce disputes over plain meaning.",
    ],
    jacksonvilleNote:
      "Municipal petitions still need city/clerk alignment, but the AG’s statewide jurisprudence shapes the legal culture volunteers read about in the news.",
    litigationWatch: false,
    arklegQueryPath: buildArklegBillUrl(2023, "HB1320"),
    sources: [
      { label: "Arkansas Legislature — HB1320", href: buildArklegBillUrl(2023, "HB1320") },
    ],
  },
  {
    slug: "act-236-hb1419-2023",
    shortTitle: "Geographic distribution of signatures",
    bill: "HB1419",
    act: "Act 236 of 2023",
    sessionYear: 2023,
    tags: ["statewide", "verification"],
    surface:
      "Required statewide petitions to demonstrate support spread across dozens of counties — a major lift compared to earlier distribution rules.",
    analysis: [
      "Distribution requirements are policy choices dressed as math: they force rural outreach and raise the cost of qualifying.",
      "County-level thresholds interact with signature validity rates — campaigns must model invalids county-by-county, not only statewide.",
      "Legal challenges argued these rules burden core political speech; keep an eye on court dockets when planning statewide coalitions.",
    ],
    jacksonvilleNote:
      "Jacksonville’s measure is not a 75-county campaign, but this act is why neighbors hear about ‘county quotas’ on TV — distinguish local filing rules when you train volunteers.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2023, "HB1419"),
    sources: [{ label: "Arkansas Legislature — HB1419", href: buildArklegBillUrl(2023, "HB1419") }],
  },
  {
    slug: "act-766-sb377-2023",
    shortTitle: "Paid blockers & tampering offenses",
    bill: "SB377",
    act: "Act 766 of 2023",
    sessionYear: 2023,
    tags: ["statewide", "circulation", "criminal"],
    surface:
      "Created misdemeanor pathways for tampering with petitions, misrepresenting petitions, and regulated ‘paid petition blockers’ who interfere with lawful circulation.",
    analysis: [
      "This act acknowledges modern trench warfare outside stores: paid interference is now a statutory category, not just a shouting match.",
      "Tampering provisions reinforce chain-of-custody norms — volunteers should still treat sheets like evidentiary records.",
      "Pair this mentally with older fraud statutes: prosecutors can choose among overlapping tools when facts are ugly.",
    ],
    jacksonvilleNote:
      "Even peaceful Jacksonville tabling can get tense — knowing interference is regulated helps coordinators escalate to law enforcement with vocabulary that matches the code.",
    litigationWatch: false,
    arklegQueryPath: buildArklegBillUrl(2023, "SB377"),
    sources: [{ label: "Arkansas Legislature — SB377", href: buildArklegBillUrl(2023, "SB377") }],
  },
  {
    slug: "act-115-sb102-2025",
    shortTitle: "Local petitions inherit statewide circulator DNA",
    bill: "SB102",
    act: "Act 115 of 2025",
    sessionYear: 2025,
    tags: ["local", "circulation", "criminal"],
    surface:
      "Extended many statewide circulator standards to local option petitions — residency/citizenship, pay structure limits, background checks for paid gatherers, and new paperwork to clerks.",
    analysis: [
      "This is the bridge statute if you wondered whether ‘TV news about statewide initiatives’ now touches city clerks: SB102 explicitly tightens local circulation mechanics.",
      "Paid local gatherers face disclosure of rosters to the county clerk at filing — transparency lever aimed at fly-by-night operations.",
      "Disqualifying offenses mirror statewide lists — consistency helps training vendors but hurts reentry hiring.",
    ],
    jacksonvilleNote:
      "If AJAX ever uses paid circulators, this act is central; if fully volunteer, focus on how it signals legislature intent — local petitions are no longer ‘lighter’ by default.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "SB102"),
    sources: [
      { label: "Arkansas Legislature — SB102", href: buildArklegBillUrl(2025, "SB102") },
      {
        label: "Ballotpedia — March 2025 initiative package",
        href: getLegalSourceById("legal-ballotpedia-news-2025-03-initiative-package").url,
      },
    ],
  },
  {
    slug: "act-153-hb1221-2025",
    shortTitle: "Signature expiration tied to general elections",
    bill: "HB1221",
    act: "Act 153 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "verification"],
    surface:
      "Anchored signature validity to the next general election after certification and expanded disqualification reasons (timing, legibility, identifying info).",
    analysis: [
      "Circulation calendars are now chess, not checkers — sponsors must model when titles certify versus when signatures ‘die.’",
      "Disqualification expansions reward hyper-disciplined field programs; sloppy sheets become expensive.",
      "Watch how courts treat retroactivity and grandfathered petitions — litigation here is as much about timelines as about First Amendment doctrine.",
    ],
    jacksonvilleNote:
      "City filing windows differ, but volunteers should understand the statewide mood: Arkansas is shortening the half-life of political consent on paper.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "HB1221"),
    sources: [{ label: "Arkansas Legislature — HB1221", href: buildArklegBillUrl(2025, "HB1221") }],
  },
  {
    slug: "act-154-hb1222-2025",
    shortTitle: "Conflicting measures & AG review against federal law",
    bill: "HB1222",
    act: "Act 154 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "ag-review"],
    surface:
      "Required the Attorney General to consider federal conflicts and limited simultaneous competing proposals on the same general subject.",
    analysis: [
      "This tries to reduce voter confusion and sponsor forum-shopping — but it also empowers the AG to police ‘sameness’ in politically charged issue spaces.",
      "Sponsors now need strategy for sequencing drafts and appeals when multiple committees want related reforms.",
      "Federal preemption analysis inside a state AG office is inherently controversial — expect litigation over how much the AG may speculate about federal outcomes.",
    ],
    jacksonvilleNote:
      "Unlikely to apply directly to a single-city charter question, yet it shapes the legal culture and donor narratives around ‘ballot chaos.’",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "HB1222"),
    sources: [{ label: "Arkansas Legislature — HB1222", href: buildArklegBillUrl(2025, "HB1222") }],
  },
  {
    slug: "act-218-sb207-2025",
    shortTitle: "Mandatory fraud disclosure to signers",
    bill: "SB207",
    act: "Act 218 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "circulation", "criminal"],
    surface:
      "Requires canvassers to tell signers petition fraud is criminal; failure can be charged as a Class A misdemeanor.",
    analysis: [
      "Speech mandates like this are classic First Amendment fodder — tone, pacing, and script compliance become evidence.",
      "Volunteers should adopt calm, consistent language — not scary legalese — to meet spirit without triggering confusion.",
      "Pair with training on what actually counts as fraud versus honest mistakes.",
    ],
    jacksonvilleNote:
      "Build a one-sentence volunteer script approved by counsel; AJAX’s culture is transparency, not intimidation.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "SB207"),
    sources: [{ label: "Arkansas Legislature — SB207", href: buildArklegBillUrl(2025, "SB207") }],
  },
  {
    slug: "act-240-sb208-2025",
    shortTitle: "Photo ID at the petition line",
    bill: "SB208",
    act: "Act 240 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "circulation", "verification"],
    surface:
      "Allows canvassers to request photo ID matching election ID definitions before accepting signatures — central to 2025 injunction headlines.",
    analysis: [
      "Voting rights advocates argue ID demands at petitioning chill speech; defenders cite fraud prevention.",
      "Even if enjoined for some plaintiffs, the political signal remains: carry ID guidance in volunteer kits for states of emergency / confusion.",
      "Municipal petitions should confirm with counsel whether any parallel ID expectation exists locally.",
    ],
    jacksonvilleNote:
      "Do not improvise ID policies on AJAX tables — follow campaign counsel’s written stance for municipal paperwork.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "SB208"),
    sources: [{ label: "Arkansas Legislature — SB208", href: buildArklegBillUrl(2025, "SB208") }],
  },
  {
    slug: "act-273-sb209-2025",
    shortTitle: "Disqualifying signatures tied to canvasser misconduct",
    bill: "SB209",
    act: "Act 273 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "verification", "criminal"],
    surface:
      "Creates pathways to disqualify signatures when associated canvassers break specified rules — pushing compliance risk to the edge of the clipboard.",
    analysis: [
      "This statute tries to internalize deterrence: one canvasser’s corner-cutting can erase many good-faith signers.",
      "Field QA and spot-checking become legal hygiene, not just optics.",
      "Expect fact-intensive litigation about what ‘association’ means between signer and canvasser.",
    ],
    jacksonvilleNote:
      "Volunteer culture — never ghost-witness, never rush IDs — is now statutory self-defense.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "SB209"),
    sources: [{ label: "Arkansas Legislature — SB209", href: buildArklegBillUrl(2025, "SB209") }],
  },
  {
    slug: "act-274-sb210-2025",
    shortTitle: "Read-aloud ballot title requirement",
    bill: "SB210",
    act: "Act 274 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "circulation"],
    surface:
      "Requires signers to read the ballot title aloud or have it read aloud in the canvasser’s presence, with misdemeanor exposure for knowing violations.",
    analysis: [
      "Long titles + accessibility needs = immediate policy tension. This is not just law — it is field ergonomics.",
      "Courts may grapple with burdens on low-literacy voters and non-English speakers.",
      "Training should include respectful workarounds pending counsel guidance (quiet space, large print, etc.).",
    ],
    jacksonvilleNote:
      "For municipal sheets, confirm whether parallel requirements exist; do not assume statewide scripts apply without clerk/counsel sign-off.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "SB210"),
    sources: [
      { label: "Arkansas Legislature — SB210", href: buildArklegBillUrl(2025, "SB210") },
      {
        label: "ACLU of Arkansas — legislative summary",
        href: getLegalSourceById("legal-aclu-ar-read-ballot-title-2025").url,
      },
    ],
  },
  {
    slug: "act-602-hb1713-2025",
    shortTitle: "Eighth-grade readability for citizen titles",
    bill: "HB1713",
    act: "Act 602 of 2025",
    sessionYear: 2025,
    tags: ["statewide", "ag-review"],
    surface:
      "Directs the Attorney General to apply a Flesch-Kincaid eighth-grade ceiling to certified ballot titles for citizen initiatives (not legislative referrals).",
    analysis: [
      "This imports education metrics into democratic speech — drafters may simplify language or fight the formula in court.",
      "Expect expert affidavits battling syllable counts and sentence length.",
      "Narratively, it intersects with SB210’s read-aloud rule: shorter titles help compliance but may obscure nuance.",
    ],
    jacksonvilleNote:
      "AJAX’s municipal title still needs clarity — even without FKGL automation, plain language is a strategic asset.",
    litigationWatch: true,
    arklegQueryPath: buildArklegBillUrl(2025, "HB1713"),
    sources: [
      { label: "Arkansas Legislature — HB1713", href: buildArklegBillUrl(2025, "HB1713") },
      {
        label: "Ballotpedia — readability law overview",
        href: getLegalSourceById("legal-ballotpedia-news-2025-04-readability").url,
      },
    ],
  },
  {
    slug: "aca-14-14-915-local-measures",
    shortTitle: "Municipal initiative & referendum (Title 14 spotlight)",
    bill: "A.C.A. § 14-14-915",
    act: "Codified local procedures",
    sessionYear: 0,
    tags: ["local", "verification"],
    surface:
      "County/municipal measures follow Title 14’s local government code — single-subject rules, general-election placement, and county-style petition formatting often analogize to city clerk practice.",
    analysis: [
      "Ballotpedia summarizes local ballot measure law separately from statewide initiated acts — always cross-check with the city charter and clerk instructions.",
      "Arkansas Constitution Article 5, § 1 anchors local initiative power, but statutes fill in mechanics.",
      "Home-rule cities may layer additional charter steps — Jacksonville-specific counsel answers win over generic blog posts.",
    ],
    jacksonvilleNote:
      "This is the statutory neighbor to everything AJAX files locally — pair reading with Jacksonville’s clerk checklist, not only SOS headlines.",
    litigationWatch: false,
    arklegQueryPath: getLegalSourceById("legal-justia-aca-14-14-915").url,
    sources: [
      {
        label: "Justia — § 14-14-915 text (confirm current)",
        href: getLegalSourceById("legal-justia-aca-14-14-915").url,
      },
      {
        label: "Ballotpedia — local ballot measures in Arkansas",
        href: getLegalSourceById("legal-ballotpedia-local-measures-ar").url,
      },
    ],
  },
];

export function getLegislationBySlug(slug: string): LegislationEntry | undefined {
  return legislationEntries.find((e) => e.slug === slug);
}

export function legislationSlugs(): string[] {
  return legislationEntries.map((e) => e.slug);
}
