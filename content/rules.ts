import { getLegalSourceById } from "@/content/legal/sourceRegistry";

export type RuleLink = {
  label: string;
  href: string;
};

export type RuleItem = {
  title: string;
  summary: string;
  details: string;
  mistakes?: string;
  /** Optional primary sources and official references */
  links?: readonly RuleLink[];
  /** Extra notes (e.g. “not legal advice”) */
  sources?: string;
};

export const rulesLegalDisclaimer =
  "This section summarizes publicly available Arkansas law and campaign procedures for volunteers. It is not legal advice. Sponsors, the city clerk, and qualified counsel determine exact petition language, filing deadlines, and sufficiency for this measure.";

export const rules: RuleItem[] = [
  {
    title: "Arkansas law, recent legislation, and what applies in Jacksonville",
    summary:
      "Local ballot measures follow the Arkansas Constitution and state law, but municipal petitions are filed with the city — not the statewide “initiated act” pipeline.",
    details:
      "Constitutional baseline: Arkansas Constitution Article 5, § 1 reserves initiative and referendum to the people and applies at the municipal level, so registered voters in a city may petition to place qualified local measures on the ballot.\n\nStatutory framework: Many general procedures for petitions appear in Arkansas Code Annotated Title 7, Chapter 9 (initiative and referendum). Additional Title 14 (local government) provisions address how cities process local measures. Your city clerk’s filing instructions and the ballot title approved for circulation control deadlines and form for this Jacksonville petition.\n\nStatewide vs. Jacksonville: The Secretary of State’s Initiatives & Referenda Handbook and most high-profile news coverage focus on statewide measures (initiated acts and constitutional amendments). Jacksonville’s petition is a municipal measure. Signature thresholds, filing windows, and verification are tied to municipal law and local filing — follow campaign counsel and the Jacksonville city clerk, not generic statewide initiative timelines alone.\n\n2025 Arkansas General Assembly: The legislature passed several bills affecting petition circulation and verification (commonly cited in public reporting as Acts 218, 240, 274, 453, 602, and related provisions). Many of those changes target statewide petitions and Secretary of State processes.\n\nFederal court injunction (2025): In League of Women Voters of Arkansas et al. v. Jester, the U.S. District Court for the Western District of Arkansas granted a preliminary injunction limiting enforcement of certain provisions against parties to that case while the lawsuit continues. The scope of the order applies to the statutes and parties described in the court’s docket — it does not replace your obligation to follow the law governing this municipal petition or advice from campaign counsel.\n\nPractical takeaway for AJAX volunteers: Rules on this site, the official petition form, and coordinator instructions are written for this campaign. When state law and city procedures overlap with statewide initiative headlines, ask a coordinator rather than assuming a TV story about statewide measures applies line-for-line to Jacksonville.",
    links: [
      {
        label: "AJAX — Arkansas law & history hub (drill-down)",
        href: "/initiative/law",
      },
      {
        label: "AJAX — Chunked petition guide",
        href: "/initiative/petition-guide",
      },
      {
        label: "Arkansas Secretary of State — Initiatives & Referenda",
        href: getLegalSourceById("legal-sos-initiatives-referenda").url,
      },
      {
        label: "2025–2026 Initiatives & Referenda Handbook (PDF)",
        href: getLegalSourceById("legal-sos-handbook-ir-2025-2026-pdf").url,
      },
      {
        label: "Arkansas Code (official search)",
        href: getLegalSourceById("legal-arkansas-code-portal").url,
      },
      {
        label: "Reporting: federal injunction on several 2025 direct-democracy laws (context)",
        href: getLegalSourceById("legal-arkansas-advocate-injunction-2025-11").url,
      },
    ],
    sources:
      "Citations are for volunteer education. Ark. Const. art. 5, § 1; Ark. Code Ann. § 7-9-101 et seq. (general initiative and referendum); applicable Title 14 provisions for municipalities — confirm current numbering with the official code.",
  },
  {
    title: "Who may sign (Jacksonville city limits, registration, age)",
    summary:
      "Every signer must be a registered voter who resides inside the Jacksonville city limits and is eligible to vote — typically 18 or older for standard registration.",
    details:
      "For AJAX’s municipal petition, treat eligibility in three checks before someone signs:\n\n1) Registered to vote — The signer should appear on Arkansas’s voter registration rolls.\n\n2) Residence inside Jacksonville’s municipal boundaries — The signer’s voter registration address must be inside the City of Jacksonville, Arkansas (not nearby unincorporated Pulaski County addresses or other towns).\n\n3) Age — Ordinarily 18 or older on or before the next election to register as a standard voter; if someone is 17 but will be 18 by the general election, Arkansas allows registration in many cases — if you are unsure, do not guess; connect them with the county clerk or the SOS voter registration page.\n\nHow to verify quickly: Use Arkansas VoterView (the Secretary of State links to VoterView from its voter information page). Look up the person by name and confirm the registration shows an address that is inside Jacksonville city limits. If the address is outside the city, that person cannot sign this city petition — they can still volunteer, host, or help in other ways.\n\nIf someone is not registered: Direct them to the Arkansas voter registration application (PDF on the Secretary of State site), online registration if eligible, or the Pulaski County clerk’s office. Offer a paper form or a phone to start the process — do not tell them they can sign the petition before they are properly registered with a Jacksonville address.\n\nIf someone is registered at an old address outside the city: They should update their registration before signing — address changes can be submitted to the county clerk or through official SOS channels within published deadlines.\n\nHelping without signing: Neighbors who care but are not eligible can table, donate supplies, host events, or join the volunteer team — keep them in the loop.",
    links: [
      {
        label: "Arkansas Secretary of State — Voter information (VoterView link)",
        href: getLegalSourceById("legal-sos-voter-information").url,
      },
      {
        label: "VoterView (registration lookup)",
        href: getLegalSourceById("legal-voterview").url,
      },
      {
        label: "Voter registration application (PDF)",
        href: getLegalSourceById("legal-sos-voter-registration-pdf").url,
      },
    ],
    mistakes:
      "Taking a signature when VoterView shows an address outside Jacksonville; skipping the city-limits check because someone “lives close”; telling a 17-year-old to sign without confirming registration rules.",
  },
  {
    title: "Witnessing: AJAX volunteers only",
    summary:
      "Petition carriers and witnesses are unpaid team volunteers — there is no separate state certificate you must earn before you help, but you must follow this playbook and coordinator instructions.",
    details:
      "AJAX does not hire paid canvassers for this petition. Everyone circulating or witnessing does so as a volunteer organizer. Arkansas law includes extra rules for paid statewide canvassers in some contexts; that is not our model.\n\nThere is no Arkansas “volunteer witness license” you have to obtain before tabling. What matters is discipline: you only witness signatures you personally saw executed, you keep custody of the sheet, and you follow the notary and turn-in steps.\n\nThis website, the rules hub, and upcoming Articulate 360 training modules are the campaign’s standard training — read them, ask questions, and escalate anything unusual to a lead.\n\nIf you have not reviewed the witnessing steps or you are uncomfortable swearing to a notary that you observed each signature, do not sign the witness line — get help from a coordinator first.",
    mistakes:
      "Signing as witness on a sheet you did not personally watch being signed; handing live sheets to untrained friends without coordinator approval.",
  },
  {
    title: "How to complete each petition line correctly",
    summary:
      "Work slowly, speak each field aloud, and match the voter’s information to VoterView before they sign.",
    details:
      "Before ink touches paper: Confirm VoterView shows the person registered at a Jacksonville address and eligible to sign.\n\nPrint legibly: Use clear block letters where the form asks for printed information. Illegible lines cause unnecessary challenges.\n\nConsistent name: The name should match the voter registration record unless the form explicitly allows a former name — when in doubt, match VoterView exactly.\n\nAddress and date: Enter the residence and signing date as the form requires. Do not backdate or use placeholder dates.\n\nSignature: The voter should sign in the designated signature space. You should watch them sign.\n\nWitness area: Complete witness fields only after you observed every signature on that page that you are attesting to — follow the printed layout and coordinator training.\n\nOne topic / one measure: Do not alter the ballot title text or attach unrelated material unless counsel provides it.\n\nIf something is wrong before the signer leaves: Stop, get a fresh line or follow the correction rules in the next section — do not “fix” it in a way that hides the original mistake.",
    mistakes:
      "Letting someone rush away with missing fields; guessing how someone spells a street name instead of checking VoterView.",
  },
  {
    title: "Ink, cross-outs, and fixing a mistaken signature",
    summary:
      "Use blue ink first; black is an acceptable backup. If a line is wrong, a single line through that entry is the usual fix — do not embellish.",
    details:
      "Preferred ink: Blue ballpoint is the campaign default — it photocopies clearly and distinguishes original ink from many black-and-white copies. Black ballpoint is acceptable if blue is unavailable.\n\nAvoid: Pencil (too easy to alter), faint gel pens that disappear on scan, and markers that bleed.\n\nWrong signer or fatal error on a line: If you discover after the fact that the signer was not eligible (for example, address outside Jacksonville), draw a single, clean line through that signature block so it is obvious the line is void. Do not add sarcastic notes, white-out, or multiple scribbles. When in doubt, call a coordinator before altering anything.\n\nMinor corrections: Follow coordinator guidance — some errors require starting a new sheet.",
    mistakes:
      "Using pencil; scribbling out an entire row; white-out that hides what happened; writing ‘void’ in huge letters across unrelated signatures.",
  },
  {
    title: "Common mistakes (and how to avoid them)",
    summary:
      "Most rejections are boring paperwork problems — slow down and run the checklist.",
    details:
      "Eligibility slips: Signers who are not registered, not in Jacksonville city limits, or not old enough — VoterView first, every time.\n\nMismatched addresses: Typos that do not match registration records.\n\nIncomplete lines: Missing dates, printed names, or witness fields.\n\nIllegible handwriting: If you cannot read it, a verifier may not be able to either — ask for a neater rewrite before they walk away.\n\nChain of custody gaps: Sheets left in a car glovebox or passed between witnesses without documentation.\n\nNotary issues: Witness not present with ID; sheet not sworn when required.\n\nPressure or incentives: Never offer money, goods, or raffle entries for signatures — keep the process voluntary and orderly.\n\nPhotography and privacy: Do not photograph completed petition lines without clear permission and campaign policy.",
    mistakes:
      "Skipping VoterView because of a long line; letting a friend witness a sheet they did not carry; mixing signed sheets from different tables without labels.",
  },
  {
    title: "Notarization and turning in completed petitions",
    summary:
      "Plan notarization before you circulate — the witness usually must appear, with ID, to complete the affidavit process on schedule.",
    details:
      "Schedule ahead: Banks, shipping stores, courthouses, and community events sometimes host notaries. This campaign will announce notary-friendly events when possible.\n\nBring identification: Government-issued photo ID is standard for notarization — tell signers what to expect if they must also appear.\n\nYou stay with the sheet: Do not mail a live petition to a random notary without guidance. Know where the sheet is at all times until it reaches campaign leadership through the official intake process.\n\nAfter notarization: Use the campaign’s batching, logging, and delivery instructions — dates and drop locations matter for proof of filing.\n\nIf you miss a deadline: Tell a coordinator immediately — sometimes counsel can advise on cure periods or supplemental filing; volunteers should never improvise legal strategy.",
    mistakes:
      "Letting someone else notarize without the witness present; losing batches because they were not logged.",
  },
  {
    title: "Volunteer conduct and boundaries",
    summary:
      "Educate, welcome questions, and defer legal specifics to counsel or election officials.",
    details:
      "Do greet people, offer plain-language explanations, and share this website.\n\nDo not provide personal legal advice, argue someone into signing, or promise a court outcome.\n\nDo escalate odd situations — possible fraud, harassment, or threats — to a lead immediately.\n\nRemember you represent neighbors’ trust in democracy — patience beats cleverness.",
    mistakes:
      "Debating someone into signing; answering a nuanced residency question when you should hand them the county clerk’s number.",
  },
];
