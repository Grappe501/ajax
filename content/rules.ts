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
    title: "What “witness” means (and who can do it)",
    summary:
      "If you carry a petition sheet, you are responsible for that sheet from the first signature until it is notarized and turned in — and you must witness every signature on it.",
    details:
      "On our petitions, “witness” is not a vague title. It means you are the person accountable for that physical sheet: you watch each eligible signer fill out their line correctly, you confirm required fields are complete, and you sign in the witness area only when you truly observed each signature on that page.\n\nYou are responsible for the sheet’s chain of custody from the moment circulation begins until the completed sheet is notarized and delivered to the campaign using official turn-in steps. Do not hand a live sheet to someone else to “finish” unless your coordinator authorizes a documented transfer — loose handoffs create doubt about whether signatures were properly witnessed.\n\nArkansas law sets who may lawfully witness particular petition papers. Follow every campaign training and written instruction for your role. If you are not designated and trained to witness, do not sign as a witness — find a trained volunteer or coordinator.",
    mistakes:
      "Letting an untrained person witness; splitting a sheet between people without documentation; signing as witness without watching each signer execute the page.",
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
    title: "Notarization and turning in completed petitions",
    summary:
      "The full petition sheet must be notarized before it is filed or turned in — and you must stay with your sheet through that step.",
    details:
      "Plan ahead: notaries are available at many banks, government offices, shipping stores, and community settings. This campaign will also arrange notary access at NAACP meetings and other announced events — watch the events calendar.\n\nWhen you meet the notary, bring a government-issued photo ID and be prepared to appear in person. The notary will confirm your identity and you will swear or affirm that you witnessed the signatures on that sheet according to law. Do not let anyone else take possession of your petition sheet until it has been notarized and turned in through the campaign’s official process — unnotarized or improperly handled sheets risk rejection.\n\nAfter notarization, follow the campaign’s chain-of-custody steps: track batches, meet deadlines, and deliver only to designated coordinators or drop points. If you are unsure where or when to deliver, ask — do not leave petitions in cars, porches, or unsecured locations.",
    mistakes:
      "Handing off sheets to friends for notarization without you present; letting sheets leave your sight before notarization; mixing completed batches or skipping the sign-in log.",
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
