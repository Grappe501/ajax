/** Power of 5 — outreach copy volunteers can paste or queue for admin sending */

export const powerOfFiveReach = {
  sectionTitle: "Power of 5 — reach list",
  sectionIntro:
    "Search voters in your ward (when the file is loaded), add people you know, and queue email or text copy for the campaign to send. Only admins send messages — you propose text and contacts here.",

  emptyDirectoryHint:
    "No voter list is loaded for this ward yet. Add contacts manually below, or ask a coordinator to import the ward file.",

  outreachDisclaimer:
    "Messages you queue are reviewed and sent by campaign staff only. Do not mark anything as sent yourself.",

  templates: {
    smsInvite: {
      label: "SMS — invite to learn more",
      body: `Hi — this is [YOUR NAME] in Jacksonville. I'm helping the AJAX petition for ward-based council elections. Can I send you a short link to read what it does? Reply STOP to opt out.`,
    },
    smsEvent: {
      label: "SMS — event invite",
      body: `Hi [THEIR NAME], it's [YOUR NAME]. We're hosting a signing / info event for the AJAX ward-voting petition. Want the time and place?`,
    },
    emailInvite: {
      label: "Email — introduction",
      subject: "Jacksonville petition — ward-based council elections",
      body: `Hi [THEIR NAME],

I'm [YOUR NAME], volunteering with AJAX in Jacksonville. We're collecting signatures to put a measure on the ballot about how city council members are elected.

If you're open to it, I can share a short page that explains what the petition does — no obligation.

Thanks,
[YOUR NAME]`,
    },
  },
} as const;
