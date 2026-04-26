/**
 * Litigation context for volunteer education — not legal advice.
 * Verify docket entries with CourtListener / PACER as the case progresses.
 */

import { getLegalSourceById } from "@/content/legal/sourceRegistry";

export const petitionLitigation = {
  meta: {
    title: "Court challenges & injunctions",
    description:
      "What a preliminary injunction means for Arkansas direct-democracy laws — and how municipal petitions still need disciplined field practice.",
  },
  case: {
    name: "League of Women Voters of Arkansas v. Jester",
    court: "U.S. District Court for the Western District of Arkansas",
    docketHint: "5:25-cv-05087",
    courtListenerUrl: getLegalSourceById("legal-courtlistener-lwv-v-jester").url,
  },
  surfaceSummary:
    "Several groups challenged a package of 2025 Arkansas laws that change how statewide initiative and referendum petitions are circulated and verified. In late 2025, the federal district court entered a preliminary injunction blocking enforcement of some provisions against certain plaintiffs while the case moves forward.",
  whatInjunctionMeans: [
    {
      heading: "Not a final decision",
      body:
        "A preliminary injunction is an emergency order meant to preserve the status quo during litigation. It does not decide every constitutional question forever — the court can change course after a full trial or appellate review.",
    },
    {
      heading: "Party-specific scope",
      body:
        "Injunctions often protect named plaintiffs and sometimes “similarly situated” organizers. They do not automatically erase every statute from the books for every person statewide. Read the actual order (or counsel’s memo) for who is covered.",
    },
    {
      heading: "Municipal petitions still need discipline",
      body:
        "Jacksonville’s measure is filed locally. Field teams should still treat witnessing, notarization, and VoterView checks as non-negotiable — an injunction about statewide circulation rules is not permission to improvise on city paperwork.",
    },
  ],
  reportingLinks: [
    {
      label: "Arkansas Advocate — overview of the federal challenge (April 2025)",
      href: getLegalSourceById("legal-arkansas-advocate-federal-challenge-2025-04").url,
    },
    {
      label: "Arkansas Times — reporting on the preliminary injunction (Nov. 2025)",
      href: getLegalSourceById("legal-arktimes-injunction-2025-11").url,
    },
    {
      label: "University of Arkansas Extension — plain-language note on laws “on hold”",
      href: getLegalSourceById("legal-uaex-initiative-laws-on-hold-2025-11").url,
    },
  ],
  disclaimer:
    "This page summarizes publicly reported court developments for organizers. It is not legal advice. Campaign counsel interprets how any injunction interacts with this municipal petition.",
};
