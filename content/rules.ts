export type RuleItem = {
  title: string;
  summary: string;
  details: string;
  mistakes?: string;
};

export const rules: RuleItem[] = [
  {
    title: "Who can sign",
    summary:
      "Only eligible signers under the petition and election rules should sign — when in doubt, ask.",
    details:
      "Volunteers should never pressure someone to sign. If a signer has questions about eligibility, connect them with official guidance or a designated lead volunteer.",
    mistakes:
      "Assuming eligibility without checking; collecting signatures from people who are unsure whether they qualify.",
  },
  {
    title: "Who can witness",
    summary:
      "Witness rules exist for a reason — follow the campaign’s witness training for your role.",
    details:
      "If you are authorized to witness, use the official instructions provided at trainings. If you are not trained for witnessing, do not witness.",
    mistakes:
      "Witnessing outside your authority or rushing signatures in noisy environments where mistakes happen.",
  },
  {
    title: "How to fill out a petition correctly",
    summary:
      "Complete every required field neatly, with matching information across sections.",
    details:
      "Use legible print, consistent names, and correct dates. If a signer makes an error, follow the campaign’s correction procedure rather than guessing.",
    mistakes:
      "Illegible handwriting, missing dates, smudges, or crossed-out lines that make a page hard to verify.",
  },
  {
    title: "Common mistakes to avoid",
    summary:
      "Most issues are preventable with patience and a second glance before the signer walks away.",
    details:
      "Slow down at tables. Do a quick verification checklist: required fields, signatures in the right places, and witness fields completed if applicable.",
    mistakes:
      "Rushing during peak traffic; letting incomplete pages leave the table.",
  },
  {
    title: "How to turn in completed petitions",
    summary:
      "Use the campaign’s chain-of-custody steps so petitions stay organized and accountable.",
    details:
      "Track batches, follow deadlines, and store completed pages securely. If you are unsure where to deliver, ask your coordinator — do not leave petitions in unsecured locations.",
    mistakes:
      "Loose pages, mixed batches, or missing logs that slow verification.",
  },
  {
    title: "Volunteer do’s and don’ts",
    summary:
      "Do educate, welcome questions, and follow procedures. Don’t invent legal guidance or pressure anyone.",
    details:
      "Do: greet people warmly, offer printed rules, and escalate questions you cannot answer. Don’t: debate someone into signing, alter paperwork, or promise outcomes the campaign cannot guarantee.",
    mistakes:
      "Arguing with voters, providing legal advice, or handling petitions while distracted.",
  },
];
