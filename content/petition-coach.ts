import { petitionHotspots, type PetitionHotspot } from "@/content/petitionHotspots";

/** Who is using the Petition Coach — filters steps and emphasis. */
export type CoachRole = "signing" | "canvassing" | "notarizing" | "helping";

export const coachRoles: { id: CoachRole; label: string; description: string }[] = [
  {
    id: "signing",
    label: "I’m signing",
    description: "Walk through your line field by field, then what to leave blank.",
  },
  {
    id: "canvassing",
    label: "I’m canvassing",
    description: "Signer fields first, then your affidavit and notary handoff.",
  },
  {
    id: "notarizing",
    label: "I’m notarizing",
    description: "Focus on the canvasser affidavit and your notary block.",
  },
  {
    id: "helping",
    label: "I’m helping someone else sign",
    description: "Disability assistance rules and clear, matching information.",
  },
];

export type StoryStep = 1 | 2 | 3 | 4;

export const storySteps: { step: StoryStep; title: string; subtitle: string }[] = [
  {
    step: 1,
    title: "Before you start",
    subtitle: "Eligibility, presence, ID, and reading the declaration.",
  },
  {
    step: 2,
    title: "See & fill your part of the form",
    subtitle: "Tap each area on the petition — or use the numbered list.",
  },
  {
    step: 3,
    title: "Leave these areas blank",
    subtitle: "Official-only boxes and sections for canvasser and notary — not for voters.",
  },
  {
    step: 4,
    title: "What happens next",
    subtitle: "Affidavit, notarization, and how sheets are checked.",
  },
];

const SIGNER_FIELDS = [
  "signature-column",
  "printed-name-column",
  "birth-date-column",
  "street-address-column",
  "city-column",
  "date-signed-column",
] as const;

/** Which hotspots are tappable / listed for each role × story step (progressive disclosure). */
export function getHotspotIdsForStep(role: CoachRole, step: StoryStep): string[] {
  switch (step) {
    case 1:
      if (role === "notarizing") {
        return ["petition-title"];
      }
      return ["petition-title", "voter-declaration"];
    case 2:
      if (role === "notarizing") {
        return ["canvasser-section", "notary-section"];
      }
      if (role === "canvassing") {
        return [...SIGNER_FIELDS, "voter-declaration"];
      }
      return [...SIGNER_FIELDS];
    case 3:
      return ["admin-boxes", "canvasser-section", "notary-section"];
    case 4:
      return ["canvasser-section", "notary-section"];
    default:
      return [];
  }
}

export function getCoachHotspots(role: CoachRole, step: StoryStep): PetitionHotspot[] {
  const ids = getHotspotIdsForStep(role, step);
  const map = new Map(petitionHotspots.map((h) => [h.id, h]));
  return ids.map((id) => map.get(id)).filter(Boolean) as PetitionHotspot[];
}

export const beforeYouStartCopy: Record<
  CoachRole,
  { bullets: string[]; helperNote?: string }
> = {
  signing: {
    bullets: [
      "Only registered voters who are eligible for this municipal petition should sign.",
      "You must sign in your own handwriting, in the presence of the person circulating the petition.",
      "Show photo ID to the canvasser when asked.",
      "Print clearly — every line should be readable and match your voter record where possible.",
    ],
  },
  canvassing: {
    bullets: [
      "Confirm eligibility with photo ID before anyone signs.",
      "Witness every signature in person — do not step away mid-sheet.",
      "Warn signers that petition fraud is a serious offense where the instructions say so.",
      "Keep the ballot title and full text available while you circulate, per the form.",
    ],
  },
  notarizing: {
    bullets: [
      "You notarize the canvasser’s sworn affidavit — not each voter signature.",
      "The canvasser should appear before you for the jurat as required by law.",
      "Complete only the “for notary only” block with seal, expiration, and residence county as printed.",
    ],
  },
  helping: {
    bullets: [
      "The voter must sign; you may help print information only if allowed by the instruction sheet for disability assistance.",
      "If you assist, follow margin signature rules on the official instructions — do not improvise.",
      "Never pressure someone to sign — answer questions calmly.",
    ],
    helperNote:
      "When in doubt, pause and ask the canvasser or coordinator before the voter signs.",
  },
};

export const step4Narrative: Record<CoachRole, string[]> = {
  signing: [
    "The canvasser completes a sworn affidavit about how the sheet was circulated.",
    "A notary completes the notary block for that affidavit — not your voter line.",
    "Election officials later verify signatures and information against registration records.",
  ],
  canvassing: [
    "You attest that you followed circulation rules and witnessed each signature.",
    "A notary jurat supports your affidavit; turn sheets in the way your coordinator trains you.",
    "Campaign staff and clerks reconcile petition parts against filing rules.",
  ],
  notarizing: [
    "Your seal supports the canvasser’s oath — keep signer lines untouched.",
    "Accurate commission and county information prevents rework.",
    "Completed parts move to verification and filing per campaign workflow.",
  ],
  helping: [
    "The canvasser still witnesses the voter’s signature and completes the affidavit.",
    "The notary supports the canvasser’s oath on the same sheet.",
    "The voter’s line must stay truthful and complete for verification.",
  ],
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export const petitionCoachQuiz: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "Who completes the notary section on the petition part?",
    options: [
      "The voter, if they know a notary",
      "The canvasser",
      "A commissioned notary — for the canvasser’s affidavit",
      "The city clerk",
    ],
    correctIndex: 2,
  },
  {
    id: "q2",
    prompt: "Which city should a Jacksonville resident usually write in the city column?",
    options: ["Any nearby town", "Jacksonville", "Little Rock", "Leave it blank"],
    correctIndex: 1,
  },
  {
    id: "q3",
    prompt: "When must the voter sign (under standard petition rules)?",
    options: [
      "Whenever they have time",
      "In the presence of the person circulating the petition",
      "At home, then mail the sheet",
      "Only on election day",
    ],
    correctIndex: 1,
  },
];

export const petitionCoachMeta = {
  title: "Petition Coach",
  headline: "How to Fill Out the Jacksonville Petition Correctly",
  description:
    "Guided, role-based walkthrough of the Jacksonville petition — see the form, learn each field, avoid mistakes, and get ready to sign or collect. Progressive help, mobile-friendly sheets, and contextual AJAX prompts.",
};
