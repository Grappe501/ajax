export type EventItem = {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  ctaLabel: string;
  ctaHref: string;
};

export const events: EventItem[] = [
  {
    title: "Neighborhood signing table",
    date: "April 26, 2026",
    time: "10:00 a.m. – 1:00 p.m.",
    location: "Riverside community spot (TBA)",
    type: "Signing event",
    ctaLabel: "RSVP (coming soon)",
    ctaHref: "/events",
  },
  {
    title: "Volunteer onboarding training",
    date: "May 3, 2026",
    time: "6:30 – 8:00 p.m.",
    location: "Zoom link provided after RSVP",
    type: "Volunteer training",
    ctaLabel: "Save the date",
    ctaHref: "/events",
  },
  {
    title: "Drive-and-sign opportunity",
    date: "May 10, 2026",
    time: "2:00 – 5:00 p.m.",
    location: "Westside host site (TBA)",
    type: "Drive-and-sign",
    ctaLabel: "Get directions",
    ctaHref: "/events",
  },
  {
    title: "Church tabling (partner event)",
    date: "May 17, 2026",
    time: "After morning services",
    location: "Partner church (TBA)",
    type: "Church tabling",
    ctaLabel: "Learn more",
    ctaHref: "/events",
  },
];
