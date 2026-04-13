/**
 * Interactive regions on petition page 1 — percentages of the viewer box (0–100).
 * Replace coordinates when swapping in the official exported PNG from the PDF.
 */
export type PetitionHotspotRegion = { x: number; y: number; width: number; height: number };

export type PetitionAudience = "resident" | "signer" | "canvasser" | "notary" | "official";

/** Visual zone on the sheet — drives gold / blue / gray styling in Petition Coach. */
export type PetitionZone = "header" | "signer" | "official" | "canvasser" | "notary";

export type PetitionHotspot = {
  id: string;
  listLabel: string;
  page: 1;
  region: PetitionHotspotRegion;
  zone: PetitionZone;
  audience: PetitionAudience[];
  panelTitle: string;
  summary: string;
  whatFor: string;
  whoFills: string;
  howToComplete: string;
  mistakes: string[];
  whyMatters: string;
  /** Short positive example line for coaching. */
  example?: string;
  /** Shown when “Advanced help” is on — legal / process detail. */
  advanced?: string;
  related: { label: string; href: string }[];
};

export const petitionHotspots: PetitionHotspot[] = [
  {
    id: "petition-title",
    listLabel: "What is this petition?",
    page: 1,
    region: { x: 8, y: 2, width: 84, height: 9 },
    zone: "header",
    audience: ["resident", "signer"],
    panelTitle: "What is this petition?",
    summary: "Jacksonville Ward-Based Representation Initiative Ordinance of 2026",
    whatFor: "Identifies the citizen-led petition to place the ward-based voting ordinance before Jacksonville voters.",
    whoFills: "No one writes here — it is printed on the form.",
    howToComplete: "Read it so you know what measure you are being asked to help qualify for the ballot.",
    mistakes: ["Assuming signing means the law is already changed — it qualifies the question for voters."],
    whyMatters: "You should know the official name of what neighbors are signing.",
    example: "Title reads like a short law name — you don’t write here.",
    advanced:
      "Municipal initiative titles are certified for circulation; volunteers should never alter printed ballot title text.",
    related: [
      { label: "View initiative language", href: "/initiative/language" },
      { label: "Read the ballot title", href: "/initiative/language#ballot-title" },
    ],
  },
  {
    id: "voter-declaration",
    listLabel: "What you’re agreeing to",
    page: 1,
    region: { x: 8, y: 11, width: 84, height: 11 },
    zone: "header",
    audience: ["signer"],
    panelTitle: "What am I agreeing to?",
    summary: "Declaration that you are a registered voter and that your information is correctly written.",
    whatFor: "Affirms you are a registered voter of Arkansas who lives in Jacksonville and that your printed name, date of birth, residence, city, and date of signing are correctly written after your signature.",
    whoFills: "You read it; you do not rewrite this paragraph unless the form provides a line for corrections.",
    howToComplete: "Read every sentence before you sign. If something is wrong, talk to the canvasser before signing.",
    mistakes: [
      "Not reading what you are affirming",
      "Signing if you are not eligible",
      "Leaving required signer fields incomplete",
    ],
    whyMatters: "This ties your signature to truthful, complete information.",
    example: "You’re stating your info is true and complete for this petition part.",
    advanced:
      "If you need help printing because of disability, follow the margin rules on the official instruction sheet.",
    related: [{ label: "How to sign", href: "/initiative/how-to-sign" }],
  },
  {
    id: "signature-column",
    listLabel: "Signature",
    page: 1,
    region: { x: 6, y: 24, width: 13, height: 32 },
    zone: "signer",
    audience: ["signer"],
    panelTitle: "Signature",
    summary: "Your own handwritten signature.",
    whatFor: "The line where the voter signs.",
    whoFills: "The registered voter only — not the canvasser, not a family member.",
    howToComplete: "Sign in ink, in your usual signature, while the canvasser is present (per petition instructions).",
    mistakes: [
      "Signing for someone else",
      "Signing outside the presence of the canvasser",
      "Signing more than once for this measure on the same part improperly",
    ],
    whyMatters: "Signatures must be valid under the rules on the instruction page.",
    example: "Your usual ink signature in the box for your row.",
    advanced: "Arkansas petition rules require the signer’s own handwriting; substitutes are not allowed except as law permits.",
    related: [{ label: "How to sign", href: "/initiative/how-to-sign" }],
  },
  {
    id: "printed-name-column",
    listLabel: "Printed name",
    page: 1,
    region: { x: 20, y: 24, width: 13, height: 32 },
    zone: "signer",
    audience: ["signer"],
    panelTitle: "Printed name",
    summary: "Clear printed identification.",
    whatFor: "So election officials can match the signer to the voter record.",
    whoFills: "The signer (or assistant under disability rules — see instructions).",
    howToComplete: "Print your full name legibly.",
    mistakes: ["Illegible printing", "A name that does not help match the voter record"],
    whyMatters: "Matching reduces rejections and protects everyone’s signature.",
    example: "SAM A. RIVERA — block letters are easier to verify than cursive.",
    advanced: "Names are matched to voter registration; nicknames alone may not suffice if they don’t match the roll.",
    related: [{ label: "Signer instructions", href: "/initiative/instructions#signers" }],
  },
  {
    id: "birth-date-column",
    listLabel: "Birth date",
    page: 1,
    region: { x: 34, y: 24, width: 13, height: 32 },
    zone: "signer",
    audience: ["signer"],
    panelTitle: "Birth date",
    summary: "Date of birth as identifying information.",
    whatFor: "Part of the required identifying information on the petition.",
    whoFills: "The signer, or an assistant under the disability-assistance rules on the instruction page.",
    howToComplete: "Write clearly in the format you use consistently with your registration.",
    mistakes: ["Skipping it", "Unclear dates", "Someone else completing it without proper assistance rules"],
    whyMatters: "Helps verify that the signer is the registered voter.",
    example: "04/12/1988 or the format you use consistently.",
    advanced: "Assistants may print DOB only under disability-assistance rules with proper margin documentation.",
    related: [{ label: "How to sign", href: "/initiative/how-to-sign" }],
  },
  {
    id: "street-address-column",
    listLabel: "Street address",
    page: 1,
    region: { x: 48, y: 24, width: 15, height: 32 },
    zone: "signer",
    audience: ["signer"],
    panelTitle: "Street address",
    summary: "Where you live.",
    whatFor: "Shows your residence address as required on the petition.",
    whoFills: "The signer (or assistant under disability rules).",
    howToComplete: "Use the residence address that matches your registration when possible.",
    mistakes: [
      "Using a mailing address instead of residence when residence is required",
      "Missing house number or street",
      "An address outside Jacksonville if city residency is required for this petition",
    ],
    whyMatters: "Residence determines whether your signature can count for this municipal petition.",
    example: "123 Main St — residence, not a P.O. box unless rules allow.",
    advanced: "Municipal petitions often require residence inside city limits; match VoterView when possible.",
    related: [{ label: "How to sign", href: "/initiative/how-to-sign" }],
  },
  {
    id: "city-column",
    listLabel: "City",
    page: 1,
    region: { x: 64, y: 24, width: 12, height: 32 },
    zone: "signer",
    audience: ["signer"],
    panelTitle: "City",
    summary: "City of residence.",
    whatFor: "Must reflect where you reside; this petition concerns the City of Jacksonville.",
    whoFills: "The signer.",
    howToComplete: "Write “Jacksonville” if you live in the city limits.",
    mistakes: ["Wrong city", "Blank city"],
    whyMatters: "City qualification must match the petition’s requirements.",
    example: "Jacksonville",
    advanced: "If you recently moved, update registration before signing — don’t guess.",
    related: [{ label: "How to sign", href: "/initiative/how-to-sign" }],
  },
  {
    id: "date-signed-column",
    listLabel: "Date signed",
    page: 1,
    region: { x: 77, y: 24, width: 17, height: 32 },
    zone: "signer",
    audience: ["signer"],
    panelTitle: "Date signed",
    summary: "The date you sign.",
    whatFor: "You affirm this date is correctly written with your other information.",
    whoFills: "The signer (or assistant under disability rules).",
    howToComplete: "Write the actual date of signing clearly.",
    mistakes: ["Missing date", "Unreadable date", "Someone else writing it without proper assistance rules"],
    whyMatters: "Dates help validate when the sheet was circulated.",
    example: "Today’s date when you sign — not backdated.",
    advanced: "Someone assisting must follow disability rules; otherwise the signer should write the date.",
    related: [{ label: "How to sign", href: "/initiative/how-to-sign" }],
  },
  {
    id: "admin-boxes",
    listLabel: "Official / campaign use only",
    page: 1,
    region: { x: 4, y: 58, width: 20, height: 8 },
    zone: "official",
    audience: ["official"],
    panelTitle: "Leave this blank (official areas)",
    summary: "BQC / SOS / processing boxes.",
    whatFor: "Administrative review or campaign processing — not for signers or canvasser notes.",
    whoFills: "Election officials or designated campaign staff only, per your training.",
    howToComplete: "Signers and canvassers should not use these boxes.",
    mistakes: ["Signer writing in official-use sections", "Canvasser using them for casual notes"],
    whyMatters: "Keeps the sheet legally clean and reviewable.",
    advanced: "BQC/SOS or similar boxes are for filing and verification workflows — not voter notes.",
    related: [{ label: "Full instructions", href: "/initiative/instructions" }],
  },
  {
    id: "canvasser-section",
    listLabel: "For canvassers only",
    page: 1,
    region: { x: 4, y: 68, width: 46, height: 28 },
    zone: "canvasser",
    audience: ["canvasser"],
    panelTitle: "For canvassers only",
    summary: "Canvasser affidavit.",
    whatFor: "Sworn statement that ID was checked, signers were informed of fraud penalties, each signature was witnessed in person, and required text was attached during circulation.",
    whoFills: "The qualified canvasser after the sheet is completed according to training.",
    howToComplete: "Follow campaign training and Arkansas rules; do not rush attestation.",
    mistakes: ["Incomplete affidavit", "Signing attestation before the sheet is properly completed"],
    whyMatters: "The affidavit is a legal commitment about how the sheet was circulated.",
    example: "You swear you checked ID, warned about fraud penalties, and witnessed each signature.",
    advanced: "False statements on a sworn petition can carry criminal penalties under Arkansas law.",
    related: [
      { label: "Canvasser overview", href: "/initiative/canvassers" },
      { label: "Full instructions", href: "/initiative/instructions#canvassers" },
    ],
  },
  {
    id: "notary-section",
    listLabel: "For notary only",
    page: 1,
    region: { x: 52, y: 68, width: 44, height: 28 },
    zone: "notary",
    audience: ["notary"],
    panelTitle: "For notary only",
    summary: "Notarization of the canvasser’s affidavit.",
    whatFor: "Notary acknowledgment: signature, seal, commission expiration, county of commission as required.",
    whoFills: "A commissioned notary public.",
    howToComplete: "Follow your notary training and Arkansas notary law; verify identity as required.",
    mistakes: ["Notary filling signer lines", "Missing seal or expiration where required"],
    whyMatters: "Makes the affidavit a recordable, verifiable statement.",
    example: "Seal and commission expiration align with your Arkansas notary commission.",
    advanced: "You notarize the canvasser’s oath — not each voter line in the grid above.",
    related: [
      { label: "Notary overview", href: "/initiative/notaries" },
      { label: "Full instructions", href: "/initiative/instructions" },
    ],
  },
];

export function getPetitionHotspot(id: string): PetitionHotspot | undefined {
  return petitionHotspots.find((h) => h.id === id);
}
