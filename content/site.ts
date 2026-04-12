export const site = {
  name: "AJAX Volunteer Hub",
  tagline:
    "The official volunteer home base for the AJAX campaign to replace Jacksonville’s at-large voting system with ward-based representation.",
  announcement: {
    goal: "Goal: 1,000 verified signatures by July 1, 2026",
    sub: "Join the volunteer team today — every conversation moves us closer.",
    ctaLabel: "Join the Team",
    ctaHref: "#volunteer-form",
  },
  nav: [
    { label: "Home", href: "/#top" },
    { label: "Why It Matters", href: "/#why-it-matters" },
    { label: "Volunteer", href: "/#volunteer-form" },
    { label: "Rules", href: "/#rules" },
    { label: "Events", href: "/#events" },
    { label: "FAQ", href: "/#faq" },
    { label: "Resources", href: "/resources" },
  ],
  hero: {
    headline: "Build fair representation in Jacksonville",
    subhead:
      "Learn the petition. Sign with confidence. Volunteer with purpose.",
    primaryCta: "Join the Volunteer Team",
    secondaryCta: "Learn How the Petition Works",
    trustLine:
      "Grassroots, neighbor-to-neighbor — organized for clarity and impact.",
  },
  startHere: [
    {
      id: "understand",
      title: "I want to understand the petition",
      description: "Plain-language overview and why wards matter here.",
      anchor: "#what-this-campaign-is",
    },
    {
      id: "sign",
      title: "I want to sign",
      description: "Rules, events, and alerts so your signature counts.",
      anchor: "#events",
    },
    {
      id: "volunteer",
      title: "I want to volunteer",
      description: "Roles, training, and a simple place to start.",
      anchor: "#volunteer-form",
    },
    {
      id: "lead",
      title: "I want to help lead",
      description: "Ward teams, hosting, and leadership next steps.",
      anchor: "#ladder",
    },
  ],
  whatCampaign: {
    title: "What this campaign is",
    atLarge:
      "Today, Jacksonville uses at-large City Council races. That means candidates run citywide, and neighborhoods often share the same representatives as every other part of town.",
    wardOnly:
      "Ward-only voting means you elect council members from your own district — people who live near you and answer to the communities they represent.",
    petition:
      "This petition asks to put ward-based representation on the ballot so voters can decide whether Jacksonville’s council should reflect neighborhoods more directly.",
    local:
      "For families, small businesses, and faith communities across Duval, that can mean clearer accountability, stronger local voice, and fairer elections.",
  },
  whyJacksonville: {
    title: "Why this matters to Jacksonville",
    subtitle:
      "This is about practical representation — who shows up for your block, your corridor, and your neighbors.",
    benefits: [
      {
        title: "Neighborhood voice",
        body: "Communities get a clearer seat at the table when council seats are tied to place.",
      },
      {
        title: "Accountability you can see",
        body: "It is easier to know who is responsible for follow-through where you live.",
      },
      {
        title: "Fairer elections",
        body: "When districts are drawn fairly, more voters get meaningful competition.",
      },
      {
        title: "Trust in representation",
        body: "Local ties build trust — especially when people are tired of politics that feels distant.",
      },
      {
        title: "Momentum for the whole city",
        body: "Stronger neighborhoods strengthen Jacksonville as a whole.",
      },
    ],
  },
  volunteerStory: {
    title: "How volunteers make this move",
    body: [
      "Volunteers power this campaign the way real change always happens: person to person. We educate voters, answer questions, host signing opportunities, table, call and text neighbors, canvass, and organize events.",
      "There is a role for every comfort level — from first-time helpers to experienced organizers.",
    ],
    reassurance:
      "You do not have to know everything to help. You just need a place to start.",
  },
  ladder: {
    title: "Choose your next step",
    subtitle: "Start where you are. Grow at your pace.",
    columns: [
      {
        id: "start-small",
        title: "Start Small",
        items: [
          "Sign up for updates",
          "Attend a signing event",
          "Share one campaign post",
          "Learn the basics",
        ],
        cta: "Start Here",
        href: "#signing-alerts",
      },
      {
        id: "step-up",
        title: "Step Up",
        items: [
          "Volunteer at an event",
          "Carry a petition",
          "Help table after church",
          "Invite five people",
        ],
        cta: "Volunteer Now",
        href: "#volunteer-form",
      },
      {
        id: "lead-locally",
        title: "Lead Locally",
        items: [
          "Help coordinate outreach",
          "Host a location",
          "Support a ward team",
          "Apply to lead",
        ],
        cta: "Explore Leadership",
        href: "#leadership-form",
      },
    ],
  },
  movement: {
    title: "A growing movement",
    subtitle:
      "Numbers update as the campaign publishes verified totals. Until then, this space holds the story: neighbors organizing neighbors.",
    stats: [
      { label: "Verified signatures (placeholder)", value: "—" },
      { label: "Volunteers stepped up (placeholder)", value: "—" },
      { label: "Ward teams forming (placeholder)", value: "—" },
    ],
    quotes: [
      {
        quote:
          "We are not waiting for someone else to speak for our side of town.",
        attribution: "Local supporter (placeholder)",
      },
      {
        quote:
          "Clarity on the rules made it easy to help my neighbors sign with confidence.",
        attribution: "Volunteer (placeholder)",
      },
    ],
    partners:
      "Churches, small businesses, and community partners are joining as locations and messengers (placeholder list).",
  },
  finalCta: {
    title: "Ready to help Jacksonville vote with clearer neighborhood voice?",
    subtitle:
      "Pick the path that fits today. We will meet you there and help you take the next step.",
    ctas: [
      { label: "Get Updates", href: "#signing-alerts" },
      { label: "Volunteer", href: "#volunteer-form" },
      { label: "Lead in My Ward", href: "#leadership-form" },
    ],
  },
  footer: {
    mission:
      "AJAX is a community campaign for ward-based representation and fairer elections in Jacksonville.",
    email: "hello@ajaxcampaign.org",
    copyright: "© 2026 AJAX Campaign. All rights reserved.",
    social: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "X", href: "#" },
    ],
  },
} as const;
