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
      "AJAX is organizing to place a measure on the ballot so voters can decide whether Jacksonville should move toward ward-based City Council representation. The petition is how we qualify that measure for voters to consider.",
  },
  {
    category: "About the Petition",
    question: "Why wards instead of at-large seats?",
    answer:
      "At-large races can make it harder for neighborhoods to elect someone who is accountable to a specific community. Ward-based representation ties council members to districts so local issues get clearer representation.",
  },
  {
    category: "About Signing",
    question: "Who can sign?",
    answer:
      "Eligibility rules are set by law and petition requirements. Sign only if you qualify under those rules, and ask a volunteer if you are unsure — we would rather double-check than risk an invalid signature.",
  },
  {
    category: "About Signing",
    question: "What mistakes invalidate signatures?",
    answer:
      "Common issues include missing information, incorrect dates, signatures that do not match what is required, and signing outside permitted circumstances. Read the rules section and ask a volunteer when in doubt.",
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
    question: "Is this legal advice?",
    answer:
      "No. This site offers general education and volunteer coordination. For legal questions about your specific situation, consult a qualified attorney or official election authorities.",
  },
  {
    category: "About the Law and Process",
    question: "How does a petition become a ballot measure?",
    answer:
      "Processes depend on applicable law and local requirements. The campaign provides volunteer-facing steps for collecting and turning in valid signatures — see the rules section for the practical checklist.",
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
