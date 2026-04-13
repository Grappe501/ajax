/** Copy for Power of 5 relational organizing (ward board + dashboard) */
export const organizing = {
  ladderTitle: "Power of 5",
  ladderBody:
    "Recruit five people who will carry the petition and bring in their own contacts. Downstream totals reflect everyone under you on this ward board.",
  commitmentLabel: "Your five",
  commitmentExplainer:
    "Aim for five direct recruits who will circulate and invite others. Progress shows as your team grows.",
  leaderboardTitle: "Ward leaderboard",
  leaderboardSubtitle:
    "Ranked by downstream reach (everyone recruited below you in this ward). Tie-break: earlier start date.",
  trainTitle: "Training",
  trainBullets: [
    "Petition basics and field setup.",
    "Signing rules — catch errors before turn-in.",
    "Power of 5 — texts, tables, and one-on-one asks.",
  ],
  encourage: {
    zero: "Copy your referral link and invite one person today.",
    partial: (n: number, goal: number) =>
      `${n} of ${goal} direct recruits — who are your next two asks?`,
    full: "You reached your direct goal — help your five run their own lists.",
  },
  dashboardWelcome: (name: string) => {
    const first = name.split(" ")[0] ?? name;
    return `${first}'s dashboard`;
  },
} as const;
