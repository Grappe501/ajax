/**
 * Notary public education & recruitment — /initiative/notaries
 * Grounded in the petition’s FOR NOTARY ONLY block and canvasser affidavit.
 */

export const notaryPageMeta = {
  title: "Notary public support",
  description:
    "Why notaries matter to the Jacksonville petition, what you notarize, where you sign on the form, and how to sign up to help.",
};

export const notaryHero = {
  eyebrow: "Jacksonville petition",
  title: "Help protect the integrity of the Jacksonville petition",
  subtitle:
    "Notaries complete the sworn affidavit process for petition parts so the campaign can keep circulation organized, credible, and legally sound — without touching voter signature lines.",
  primaryCta: "Sign up as a notary",
  secondaryCta: "See the petition section",
  primaryHref: "#notary-signup" as const,
  secondaryHref: "#petition-notary-highlight" as const,
};

export const whyNotariesMatter = {
  title: "Why notaries matter",
  intro:
    "State law and the petition form require a proper jurat for the canvasser’s affidavit. Your seal and oath help election officials trust that circulation rules were followed.",
  cards: [
    {
      title: "Protect petition integrity",
      body:
        "You witness the canvasser’s oath and complete the notary block — a checkpoint that helps keep the process honest and reviewable.",
    },
    {
      title: "Support canvassers",
      body:
        "Circulators do the door-to-door work; you help them close the affidavit correctly so each petition part can move forward.",
    },
    {
      title: "Help the campaign run smoothly",
      body:
        "When notaries are available at events and pickups, fewer sheets stall waiting for a jurat — and fewer mistakes happen at the last minute.",
    },
  ],
};

/** Percentages match `public/petition/petition-page-1.svg` notary rectangle (308,480) size 280×260 in 612×792 viewBox. */
export const notaryRegionOnDiagram = {
  leftPct: (308 / 612) * 100,
  topPct: (480 / 792) * 100,
  widthPct: (280 / 612) * 100,
  heightPct: (260 / 792) * 100,
};

export const petitionNotaryHighlight = {
  sectionId: "petition-notary-highlight",
  title: "See the exact petition section",
  description:
    "On page 1 of the petition, the bottom-right block is labeled for the notary. It sits beside the canvasser affidavit. The diagram below matches that layout; replace it with a PDF export when you drop in official assets.",
  imageSrc: "/petition/petition-page-1.svg",
  imageAlt:
    "Simplified Jacksonville petition page one diagram. The lower right rectangle is the notary section beside the canvasser affidavit on the left.",
  overlayLabel: "FOR NOTARY ONLY — notary completes this block",
  fieldLabels: [
    { id: "county-sign", label: "County where the notary signs" },
    { id: "sworn-date", label: "Subscribed and sworn date" },
    { id: "notary-sig", label: "Notary signature" },
    { id: "seal", label: "Notary seal (impression area)" },
    { id: "commission-exp", label: "Commission expiration" },
    { id: "residence-county", label: "Residence county of notary" },
  ],
  fullGuideCta: "Open full petition guide",
  fullGuideHref: "/initiative/petition" as const,
};

export const whatNotaryNotarizes = {
  title: "What the notary is notarizing",
  lead:
    "You are notarizing the canvasser’s sworn affidavit — not each voter signature individually. Voters sign in the grid above; the canvasser attests in the “for canvasser only” block that they followed the rules; you complete the “for notary only” block for that sworn statement.",
  canvasserAffidavitSummary:
    "The affidavit is where the canvasser swears they verified ID, warned signers that petition fraud is a criminal offense, witnessed signatures in person, and had the petition text attached while circulating — as printed on the official form.",
  doingTitle: "The notary is doing",
  doing: [
    "Taking the canvasser’s oath or acknowledgment as the form requires",
    "Completing only the notary section on the petition part",
    "Signing and sealing in the designated notary area",
  ],
  notDoingTitle: "The notary is not doing",
  notDoing: [
    "Collecting or certifying voter signatures",
    "Filling in voter lines in the signature grid",
    "Attesting to voter facts from personal knowledge",
    "Writing in BQC / SOS / official-use boxes reserved for administrators",
  ],
};

export const notaryProcessSteps = {
  title: "Step-by-step: before you notarize",
  steps: [
    "Review the canvasser affidavit block so you know what statement you are notarizing.",
    "Make sure the canvasser appears before you in person — do not notarize an empty affidavit without the canvasser present as required.",
    "Confirm you will complete only the “FOR NOTARY ONLY” area (and any jurat line your seal requires).",
    "Fill in the notary fields: county where you sign, subscribed-and-sworn date, signature, seal, commission expiration, and your residence county.",
    "Sign and apply your seal where the form provides.",
    "Double-check commission expiration and residence county for accuracy before you release the sheet.",
  ],
};

export const beforeNotarizeChecklist = {
  title: "Before you notarize — quick checklist",
  items: [
    "The canvasser is present.",
    "The canvasser section is ready to be sworn or acknowledged as your process requires.",
    "This is the correct petition part and county rules are satisfied for the sheet you are notarizing.",
    "You are signing only in the “FOR NOTARY ONLY” block.",
    "Your seal and commission information are available and legible.",
  ],
};

export const notaryDoNot = {
  title: "Please do not",
  intro: "These mistakes invalidate trust or can disqualify lines. When unsure, pause and ask campaign counsel or the city clerk’s guidance.",
  items: [
    "Fill voter signature lines or act as the circulator.",
    "Sign as the canvasser or complete the canvasser block for them.",
    "Use BQC, SOS, or other official-use boxes for notes.",
    "Notarize the canvasser affidavit without the canvasser appearing before you as required.",
    "Write outside the notary section except where Arkansas notary law requires for the jurat itself.",
  ],
};

export const notaryRelatedLinks = {
  title: "Keep learning",
  links: [
    { label: "View the full interactive petition guide", href: "/initiative/petition" },
    { label: "Read canvasser instructions", href: "/initiative/canvassers" },
    { label: "Learn how the initiative works", href: "/initiative" },
    { label: "Volunteer with AJAX", href: "/volunteer#join-form" },
  ],
};
