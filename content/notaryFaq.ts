export const notaryFaqMeta = {
  title: "Notary questions",
};

export type NotaryFaqItem = { id: string; question: string; answer: string };

export const notaryFaqItems: NotaryFaqItem[] = [
  {
    id: "what-notarizing",
    question: "What exactly am I notarizing?",
    answer:
      "The canvasser’s sworn affidavit on that petition part — the statement in the “for canvasser only” section — not each voter’s signature in the grid. Your jurat applies to the circulator’s oath as presented on the form.",
  },
  {
    id: "where-sign",
    question: "Where do I sign on the petition?",
    answer:
      "Only in the bottom-right “FOR NOTARY ONLY” block. That area includes your county, subscribed-and-sworn date, signature, seal, commission expiration, and residence county, as printed on the official petition.",
  },
  {
    id: "each-voter",
    question: "Do I notarize each voter signature?",
    answer:
      "No. Voters sign in the table above. You support the canvasser’s affidavit with your notary block — you do not notarize every voter line.",
  },
  {
    id: "canvasser-present",
    question: "Does the canvasser have to appear before me?",
    answer:
      "Yes for a standard jurat: the person making the sworn statement must appear before the notary as Arkansas law requires. Do not notarize the affidavit without following proper appearance rules.",
  },
  {
    id: "what-fields",
    question: "What information do I need to complete?",
    answer:
      "Use the fields in the notary section: typically county where you sign, subscribed-and-sworn date, your signature and seal, commission expiration, and your residence county — match the printed form exactly.",
  },
  {
    id: "certain-times",
    question: "Can I help only at certain times or locations?",
    answer:
      "Yes. Tell us your best days and times on the sign-up form. Coordinators match notaries to pickups, church events, and ward tables as needed.",
  },
  {
    id: "church-events",
    question: "Can I help at church or community events?",
    answer:
      "Often, yes — many sheets are completed at weekend tables or community gatherings. Note your availability and whether you can travel so we can place you where you are comfortable.",
  },
];
