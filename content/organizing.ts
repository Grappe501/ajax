/** Copy for relational organizing / Power of 5 ward experience */
export const organizing = {
  ladderTitle: "Relational organizing board",
  ladderBody:
    "This is a neighbor-to-neighbor ladder: you join, recruit your five, and they recruit theirs. Downstream totals reward depth — the whole ward wins when everyone owns a small circle.",
  commitmentLabel: "Your Power of 5",
  commitmentExplainer:
    "Aim for five direct sign-ups who will carry the petition and invite others. Progress shows here as your team grows.",
  leaderboardTitle: "Ward momentum leaderboard",
  leaderboardSubtitle:
    "Ranked by downstream reach (everyone recruited below you in this ward). Tie-break: who started building first.",
  trainTitle: "Grow with training",
  trainBullets: [
    "Petition basics — so your five feel confident, not rushed.",
    "Signing rules — short coaching beats fixing mistakes later.",
    "Power of 5 organizing — scripts for texts, tables, and Sunday conversations.",
  ],
  encourage: {
    zero: "You just stepped up — grab your referral link and invite one person today.",
    partial: (n: number, goal: number) =>
      `${n} of ${goal} direct recruits logged — who are your next two conversations?`,
    full: "You hit your direct goal — now coach your five to run their own circles.",
  },
  dashboardWelcome: (name: string) =>
    `Hey ${name.split(" ")[0] ?? name} — your ward command center`,
} as const;
