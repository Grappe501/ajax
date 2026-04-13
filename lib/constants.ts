/** Legacy section ids on the homepage — prefer route paths in new code */
export const SECTION = {
  home: "top",
  startHere: "start-here",
} as const;

export const ROUTES = {
  home: "/",
  campaign: "/campaign",
  whyItMatters: "/why-it-matters",
  volunteer: "/volunteer",
  connect: "/connect",
  rules: "/rules",
  training: "/training",
  events: "/events",
  wards: "/wards",
  movement: "/movement",
  faq: "/faq",
  resources: "/resources",
  lead: "/lead",
  canvassMap: "/canvass/map",
  admin: "/admin",
} as const;

export const ANALYTICS_EVENT = {
  joinVolunteerCta: "cta_join_volunteer",
  learnPetitionCta: "cta_learn_petition",
  getUpdatesCta: "cta_get_updates",
  submitVolunteer: "form_submit_volunteer",
  submitSigningAlerts: "form_submit_signing_alerts",
  submitLeadership: "form_submit_leadership",
  submitHostLocation: "form_submit_host_location",
  submitCampaignEvent: "form_submit_campaign_event",
  submitNotaryInterest: "form_submit_notary_interest",
  leadershipCta: "cta_leadership",
  hostLocationCta: "cta_host_location",
  rulesSection: "section_rules",
  eventCta: "cta_event",
} as const;
