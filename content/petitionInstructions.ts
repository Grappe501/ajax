/**
 * Structured instruction content from petition instruction sheet (PDF page 4).
 * Verbatim legal warnings should be pasted from the official PDF when available.
 */
export const petitionInstructionsMeta = {
  title: "Petition instructions",
  description:
    "Signer rules, canvasser rules, and legal reminders — in a readable layout. Not a substitute for the official petition packet or counsel.",
};

export type InstructionModule = {
  id: string;
  title: string;
  body: string[];
  tone?: "neutral" | "warning";
};

export const instructionModules: InstructionModule[] = [
  {
    id: "background",
    title: "Constitutional and petition background",
    body: [
      "Arkansas law gives registered voters in a municipality the power to propose measures by petition. This petition is a municipal measure for Jacksonville — not a statewide constitutional amendment. The official petition text, signature thresholds, and filing rules are controlled by current law and city clerk guidance.",
      "This page summarizes instructions that appear on the petition; always follow the official form and coordinator training.",
    ],
  },
  {
    id: "signers",
    title: "Signer rules",
    body: [
      "Only registered voters who are eligible to sign this petition may sign.",
      "Signatures must be in the signer’s own handwriting.",
      "Signing must occur in the presence of the person circulating the petition.",
      "A petition part generally should contain only signatures from a single county — follow the instruction sheet for your specific form.",
    ],
  },
  {
    id: "signer-information",
    title: "Information required from each signer",
    body: [
      "The signer must provide photo identification to the canvasser as described on the instruction sheet.",
      "The signer must provide printed name, date of birth, residence, city or town of residence, and date of signing, correctly written.",
      "If a signer needs help because of disability, another person may print the signer’s information; that helper must sign and print their own name in the margin as the instructions require.",
    ],
  },
  {
    id: "canvassers",
    title: "Canvasser rules",
    body: [
      "Canvassers must meet Arkansas residency and qualification requirements stated in the instructions.",
      "The canvasser affidavit must be completed truthfully and notarized as required.",
      "Canvassers must witness each signature and follow all circulation rules from training.",
    ],
  },
  {
    id: "warnings",
    title: "Fraud, penalties, and accuracy",
    tone: "warning",
    body: [
      "Petition fraud and certain misconduct can carry serious criminal penalties under Arkansas law. The instruction sheet states specific offenses and penalties — read them carefully.",
      "This section is not here to scare anyone; it is here so every signer and circulator understands that accuracy and honesty protect the process and the community’s trust.",
      "When in doubt, pause and ask a coordinator or qualified professional rather than guessing.",
    ],
  },
];
