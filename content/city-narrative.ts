/**
 * City-site narrative spine (Simon Sinek “golden circle” applied to civic campaigns).
 * Code uses stake / approach; public UI must never print “Why / How / What” as section labels.
 *
 * Stake ≈ conviction (why the campaign exists).
 * Approach ≈ differentiated character and method (how you earn trust).
 * Proof ≈ concrete offers (events, tools, petitions) — usually other sections on the homepage.
 */

export const cityNarrative = {
  /** Landing stays oriented here: one clear promise above the fold (see `site.hero`). */
  landingPurposeNote:
    "The hero always answers: what is this site for, in one breath, for a resident of this city?",

  stake: {
    eyebrow: "The core of it",
    title: "Your neighborhood deserves a vote that actually belongs to it",
    body:
      "Jacksonville draws wards on the map, then asks the whole city to pick who represents each one. That is not abstract civics — it is whether the street you live on has the same voice as every other ZIP code when council decisions hit your schools, your roads, and your public safety reality. AJAX exists so residents can decide, fairly and clearly, whether that should change.",
  },

  approach: {
    eyebrow: "In practice",
    title: "Open materials, neighbor-led discipline, no mystery playbook",
    body:
      "We treat people like adults: plain-language explainers, official petition forms, and rules you can read before you sign. Volunteers train on witnessing and custody because sloppy paperwork disenfranchises signers — not because we love red tape. The campaign’s tone is invitation, not pressure; the goal is a city decision, not a personality cult.",
    highlights: [
      "Materials and events are built for Jacksonville first — not recycled statewide talking points.",
      "We separate this site from the Secretary of State race on purpose: different office, different firewall, same respect for truth.",
      "When law and city procedure touch the petition, we point to clerks, counsel, and primary sources — not vibes.",
    ] as const,
  },
} as const;
