export const CAMPAIGN_EVENT_KINDS = [
  "sign_and_drive",
  "tabling",
  "house_party",
  "training",
  "canvass",
  "other",
] as const;

export type CampaignEventKind = (typeof CAMPAIGN_EVENT_KINDS)[number];

export const campaignEventKindLabel: Record<CampaignEventKind, string> = {
  sign_and_drive: "Sign & drive",
  tabling: "Tabling / booth",
  house_party: "House party / living room",
  training: "Training / briefing",
  canvass: "Door-to-door / canvass",
  other: "Other",
};
