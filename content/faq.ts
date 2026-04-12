export type FaqItem = {
  category:
    | "About the Petition"
    | "About Signing"
    | "About Volunteering"
    | "About the Law and Process"
    | "About Events and Locations";
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    category: "About the Petition",
    question: "What is AJAX asking for?",
    answer:
      "AJAX is organizing to place a measure on the ballot so voters can decide whether Jacksonville should elect its ward-based City Council seats by ward — instead of the current system where every council race is decided by voters citywide (at-large), even though candidates must live in the ward they seek to represent.\n\nThe petition is the lawful path to qualify that question for voters. Signing says: let the whole city vote on whether representation should work the way most people assume it already does.",
  },
  {
    category: "About the Petition",
    question: "Why wards instead of at-large seats? (The full case.)",
    answer:
      "Jacksonville’s own public materials describe five wards with two council members each — ten councilors — but those seats are filled through at-large elections: you can vote for council members in every ward, not only in your own.\n\nThat matters for representation. When the electorate for a “Ward 3” seat is the entire city, neighborhoods compete for attention with every other neighborhood. A corridor can be outvoted on who represents it by people who never rely on that grocery store, that school zone, or that drainage ditch. Campaigns tilt toward citywide name recognition and fundraising networks instead of grounded knowledge of a ward’s conditions.\n\nWard-based (ward-only) voting means residents in a ward are the primary electorate for that ward’s seats. Accountability becomes visible: neighbors know who to praise, question, or replace when decisions hit the block level. It does not solve every problem overnight — it fixes the incentive structure so local reality is harder to ignore.\n\nJacksonville maps five wards; each ward has two positions (often labeled Position A and Position B) with staggered terms so wards keep continuity across cycles. Exact titles and election dates follow the city clerk’s notices — reform aligns who picks a seat with the community that seat was drawn to serve.\n\nSigning the petition does not pick a party or a person. It asks whether voters should get to choose this structural change.",
  },
  {
    category: "About the Petition",
    question: "Does this amend the Arkansas Constitution?",
    answer:
      "No. This effort is about Jacksonville and what appears on the city’s ballot — for example charter or ordinance changes, depending on how the measure is drafted and qualified. Statewide constitutional amendments follow different filing rules and signature paths than local municipal measures.\n\nWhen you want something considered at the city level, Arkansas law provides initiative and referendum rights to registered voters in the municipality. The Secretary of State publishes handbooks explaining statewide measures; city clerks and county election officials handle many municipal filings. Always rely on the official petition language, the city clerk, and current Arkansas code for thresholds and deadlines — this site summarizes the volunteer story, not your personal legal situation.",
  },
  {
    category: "About the Petition",
    question: "How does a local ballot measure work in Arkansas?",
    answer:
      "Arkansas reserves initiative and referendum power to legal voters of each city and town. In plain terms: registered voters can petition to place a municipal measure on the ballot so the people — not just the council — can decide.\n\nThe details that matter in real life — how many signatures, which office’s turnout is used as the baseline, filing windows with the city clerk or county board, and how ballot titles are certified — are set by law and updated over time. Campaign volunteers follow a written compliance checklist from coordinators; the public can review the Arkansas Secretary of State’s Initiatives & Referenda handbook and the city clerk’s instructions for the election in question.\n\nIf voters approve a qualified measure, it generally operates like other local law: it binds city government unless and until lawfully amended. That is why petition discipline matters — valid signatures and proper witnessing protect everyone’s right to be heard.",
  },
  {
    category: "About Signing",
    question: "Who can sign?",
    answer:
      "For this Jacksonville municipal petition, signers should be registered voters whose residence is inside the City of Jacksonville, Arkansas, city limits — and generally 18 or older for standard registration. Volunteers use Arkansas VoterView (linked from the Secretary of State voter information page) to confirm registration, address, and age before anyone signs.\n\nIf someone is not registered, needs to update an address, or lives outside the city, they should not sign until they are eligible — they can still volunteer, host, or help in other ways.",
  },
  {
    category: "About Signing",
    question: "What is a “witness” on this petition?",
    answer:
      "A witness is the volunteer accountable for a petition sheet from the first signature through notarization and official turn-in. Witnessing means you observed each signer execute the sheet correctly and you sign only where the form and campaign instructions say.\n\nAJAX uses volunteer circulators only — there is no separate state license you must earn before helping, but you are expected to read the rules hub and upcoming training modules. You do not pass a half-finished sheet around for someone else to “witness” without a clear, authorized process.",
  },
  {
    category: "About Signing",
    question: "What mistakes invalidate signatures?",
    answer:
      "Common issues include missing information, incorrect dates, addresses that do not match VoterView, signatures outside Jacksonville city limits, illegible lines, witnessing without observing each signer, and sheets that skip notarization or proper turn-in.\n\nIf someone signed who was not eligible, the campaign uses a single line through that entry — not scribbles or white-out. Use blue ink when possible (black as backup). See the petition rules hub for the full checklist.",
  },
  {
    category: "About Volunteering",
    question: "I have never volunteered on a campaign. Can I still help?",
    answer:
      "Yes. Many roles start with simple tasks like greeting people at a table, handing out information, or helping set up a signing table. Training previews and team support help you learn as you go.",
  },
  {
    category: "About Volunteering",
    question: "What should volunteers avoid doing?",
    answer:
      "Do not guess on legal questions, pressure anyone to sign, or alter petition paperwork. When unsure, pause and get guidance from a lead volunteer or the campaign’s official materials.",
  },
  {
    category: "About the Law and Process",
    question:
      "What do the 2025 Arkansas petition bills and the federal court injunction mean for Jacksonville?",
    answer:
      "Several 2025 acts (often referenced in news as Acts 218, 240, 274, 453, 602, and related sections) added requirements aimed largely at statewide initiative campaigns — photo ID at signing, ballot-title reading, reading-level review, paid canvasser rules, and more.\n\nIn League of Women Voters of Arkansas et al. v. Jester, the U.S. District Court for the Western District of Arkansas issued a preliminary injunction in 2025 limiting enforcement of certain provisions against parties to that case while litigation continues. The order’s scope is defined by the court — it does not replace municipal filing rules for Jacksonville.\n\nThis AJAX petition is a municipal measure with the city clerk. Volunteers should follow campaign counsel and the instructions on the official petition, not assume statewide initiative headlines apply line-for-line to Jacksonville.",
  },
  {
    category: "About the Law and Process",
    question: "Is this legal advice?",
    answer:
      "No. This site offers general education and volunteer coordination. For legal questions about your specific situation, consult a qualified attorney or official election authorities.",
  },
  {
    category: "About Events and Locations",
    question: "Where can I sign in person?",
    answer:
      "Check the events preview for upcoming signings, trainings, and community tables. You can also get signing alerts so you do not miss opportunities near you.",
  },
  {
    category: "About Events and Locations",
    question: "Can my church or business host signing?",
    answer:
      "Yes — hosting is one of the most helpful ways to lead locally. Use the host form so organizers can follow up with timing, traffic flow, and rule-compliant setup.",
  },
];
