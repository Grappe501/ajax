/**
 * Constituent-facing explainer (/initiative).
 * Deep-dive accordion pulls from `site.whatCampaign.deepDive` in the page component.
 */
export const initiativeEducation = {
  meta: {
    title: "Learn about the initiative",
    description:
      "Plain-language overview of the Jacksonville ward-based voting petition — what it does, why neighbors sign, and how to get involved.",
  },
  hero: {
    eyebrow: "Jacksonville, Arkansas",
    title: "Your neighborhood. Your council seat.",
    dek: "What the petition would do and how to get involved. Share this page with anyone who wants the basics before they sign.",
  },
  snapshot: {
    title: "Three things to know",
    bullets: [
      "Right now, citywide voters can decide who represents every ward — even people who do not live in that ward.",
      "The petition asks whether people who live in a ward should elect that ward’s city council members.",
      "Signing helps qualify the question for the ballot. It is not a vote for a party or a person — it is a vote to let all voters decide.",
    ],
  },
  whySign: {
    title: "Why neighbors sign",
    body:
      "Many residents want council members who are accountable to the streets, schools, and small businesses they share — not only to citywide name recognition. Putting this on the ballot lets the whole city weigh in on whether Jacksonville’s elections should work the way people often assume they already do.",
  },
  signing: {
    title: "Before you sign",
    body:
      "Eligibility follows Arkansas law and the official petition form — usually registered voters who live inside Jacksonville city limits. When in doubt, ask the volunteer with the petition or check registration through the state’s voter lookup.",
  },
  hubCta: {
    title: "Want to help beyond signing?",
    body:
      "Carrying petitions, hosting tables, and organizing by ward takes volunteers. The Volunteer Hub is the campaign’s home base for training, events, and next steps.",
    buttonLabel: "Join the Volunteer Hub",
    hubHref: "/hub",
  },
  secondaryLinks: [
    { label: "Voter lookup (official)", href: "/initiative/voter-status" },
    { label: "Chunked petition guide", href: "/initiative/petition-guide" },
    { label: "Arkansas law & history", href: "/initiative/law" },
    { label: "Where to sign & events", href: "/events" },
    { label: "Petition rules (quick read)", href: "/rules" },
    { label: "FAQ", href: "/faq" },
  ],
  deepDiveEyebrow: "Go deeper",
  deepDiveTitle: "Still curious?",
  deepDiveSubtitle: "These topics mirror what volunteers share at the door — open only what you need.",
} as const;
