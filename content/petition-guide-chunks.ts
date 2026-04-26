/**
 * Chunked petition guide — surface summary + deeper + nitty-gritty.
 * Routes: /initiative/petition-guide/rules/[slug]
 */

import { getLegalSourceById } from "@/content/legal/sourceRegistry";

export type GuideChunk = {
  id: string;
  parentId: string | null;
  title: string;
  /** One breath — shown on hub cards */
  surface: string;
  /** Next click depth */
  deeper: readonly { heading: string; body: string }[];
  /** Optional third level — statutes / edge cases */
  nittyGritty?: readonly { heading: string; body: string }[];
  statuteRefs?: readonly { label: string; href: string }[];
};

export const guideChunks: GuideChunk[] = [
  {
    id: "hub-before-you-start",
    parentId: null,
    title: "Before you pick up a clipboard",
    surface:
      "Three checks save heartache: registration status, Jacksonville address, and calm time to read the line you’re signing.",
    deeper: [
      {
        heading: "Why slowing down wins",
        body:
          "Most disqualifications are boring data problems — wrong city, missing date, illegible print. A 60-second VoterView pause beats a week of rework.",
      },
      {
        heading: "Where statewide news differs",
        body:
          "TV segments often describe Secretary of State initiatives. AJAX is municipal — different clerk, different thresholds, same need for precision.",
      },
    ],
    nittyGritty: [
      {
        heading: "Constitutional floor",
        body:
          "Article 5, § 1 reserves initiative and referendum to the people at state and local levels — but statutes specify forms, timing, and verification.",
      },
    ],
    statuteRefs: [
      { label: "Ark. Const. art. 5, § 1 (Justia)", href: getLegalSourceById("legal-justia-ar-const-art-5").url },
      {
        label: "SOS Initiatives & Referenda handbook (PDF)",
        href: getLegalSourceById("legal-sos-handbook-ir-2025-2026-pdf").url,
      },
    ],
  },
  {
    id: "signer-eligibility",
    parentId: null,
    title: "Who can sign this petition",
    surface: "Registered voter + Jacksonville residence + eligible age — verified on VoterView, not by guesswork.",
    deeper: [
      {
        heading: "Registration first",
        body:
          "If someone is not on the rolls or is inactive, send them to registration help before they sign — don’t ‘hold’ signatures for later.",
      },
      {
        heading: "City limits, not vibes",
        body:
          "Neighboring Pulaski County addresses may share ZIP codes but sit outside the municipal corporation. The address on the registration card controls.",
      },
    ],
    nittyGritty: [
      {
        heading: "Youth edge cases",
        body:
          "Arkansas allows some 17-year-olds to register if they will be 18 by the next election — if you are not sure, connect them to the county clerk; never improvise.",
      },
    ],
    statuteRefs: [
      { label: "SOS voter information hub", href: getLegalSourceById("legal-sos-voter-information").url },
    ],
  },
  {
    id: "filling-lines",
    parentId: null,
    title: "Filling each petition line",
    surface: "Match VoterView, print clearly, watch the signature happen, don’t backdate — one line, one story.",
    deeper: [
      {
        heading: "Field script",
        body:
          "Read field labels aloud, have the signer follow along, and stop if anything feels off. Corrections should follow coordinator rules — not white-out art projects.",
      },
      {
        heading: "Ink discipline",
        body:
          "Blue ballpoint is the default; avoid pencil or bleeding gel. Think ‘evidence preservation,’ not ‘whatever pen I found.’",
      },
    ],
    nittyGritty: [
      {
        heading: "Single-subject intuition",
        body:
          "Petition text should stay unified — don’t tape flyers or unrelated asks to official sheets unless counsel provides them.",
      },
    ],
  },
  {
    id: "witnessing-custody",
    parentId: null,
    title: "Witnessing & chain of custody",
    surface: "If you sign as witness, you watched every signature on that affidavit batch — and the sheet never ghosts through strangers.",
    deeper: [
      {
        heading: "Volunteer-only culture",
        body:
          "AJAX does not hire paid circulators. That avoids some statewide licensing headaches but does not relax honesty rules.",
      },
      {
        heading: "Logging batches",
        body:
          "Label stacks, photograph covers only if policy allows, and know which coordinator receives originals.",
      },
    ],
    nittyGritty: [
      {
        heading: "Paid circulator context",
        body:
          "Acts 115, 951, and related laws regulate paid statewide/local gatherers — know the landscape when talking to reporters.",
      },
    ],
    statuteRefs: [
      { label: "Title 7, Ch. 9 — overview (Justia)", href: getLegalSourceById("legal-justia-title-7-ch-9").url },
    ],
  },
  {
    id: "notary-process",
    parentId: null,
    title: "Notary appointments & affidavits",
    surface: "Schedule notaries intentionally — ID, witness presence, and completed pages before you swear an oath.",
    deeper: [
      {
        heading: "What signers should bring",
        body:
          "Government-issued photo ID is standard. Explain ahead of time so no one wastes a trip.",
      },
      {
        heading: "After notarization",
        body:
          "Follow campaign intake — scanned backups, chain-of-custody logs, and clerk deadlines are leadership tasks, not solo improvisations.",
      },
    ],
    nittyGritty: [
      {
        heading: "Arkansas notary basics",
        body:
          "Notaries verify identity and willingness — they do not rewrite petition law. If a notary refuses, stay polite and try another approved location.",
      },
    ],
    statuteRefs: [
      { label: "AJAX notary guide", href: "/initiative/notaries" },
      { label: "Hub notary workspace", href: "/hub/notary" },
    ],
  },
  {
    id: "statewide-vs-local",
    parentId: null,
    title: "Statewide initiatives vs. Jacksonville’s measure",
    surface: "Different filing desks, different math — borrow principles (honesty, clarity), not timelines from TV.",
    deeper: [
      {
        heading: "Secretary of State pipeline",
        body:
          "Statewide measures use AG certification, SOS verification, and huge signature pools — great training drama, wrong spreadsheet for city clerks.",
      },
      {
        heading: "City clerk pipeline",
        body:
          "Municipal petitions ride charter + state local-law requirements. When in doubt, the city clerk and campaign counsel trump blog posts.",
      },
    ],
    nittyGritty: [
      {
        heading: "§ 14-14-915 snapshot",
        body:
          "Local legislative procedures often mirror county ordinance petition expectations — read alongside Jacksonville-specific instructions.",
      },
    ],
    statuteRefs: [
      {
        label: "§ 14-14-915 (Justia)",
        href: getLegalSourceById("legal-justia-aca-14-14-915").url,
      },
    ],
  },
];

export function getGuideChunk(id: string): GuideChunk | undefined {
  return guideChunks.find((c) => c.id === id);
}

export function guideChunkIds(): string[] {
  return guideChunks.map((c) => c.id);
}

export function childChunks(parentId: string): GuideChunk[] {
  return guideChunks.filter((c) => c.parentId === parentId);
}
