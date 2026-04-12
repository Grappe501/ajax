/** In-page section anchors — keep in sync with homepage `id` attributes */
export const SECTION = {
  home: "top",
  whyItMatters: "why-it-matters",
  whatCampaign: "what-this-campaign-is",
  volunteers: "how-volunteers",
  ladder: "ladder",
  rules: "rules",
  training: "training",
  events: "events",
  wards: "wards",
  faq: "faq",
  movement: "movement",
  volunteerForm: "volunteer-form",
  signingAlerts: "signing-alerts",
  leadership: "leadership-form",
  hostLocation: "host-location",
} as const;

export const ANALYTICS_EVENT = {
  joinVolunteerCta: "cta_join_volunteer",
  learnPetitionCta: "cta_learn_petition",
  getUpdatesCta: "cta_get_updates",
  submitVolunteer: "form_submit_volunteer",
  submitSigningAlerts: "form_submit_signing_alerts",
  submitLeadership: "form_submit_leadership",
  submitHostLocation: "form_submit_host_location",
  leadershipCta: "cta_leadership",
  hostLocationCta: "cta_host_location",
  rulesSection: "section_rules",
  eventCta: "cta_event",
} as const;
