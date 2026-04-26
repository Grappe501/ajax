/** Official Arkansas voter registration verification — front-and-center CTAs. */

import { getLegalSourceById } from "@/content/legal/sourceRegistry";

export const voterLookup = {
  voterviewUrl: getLegalSourceById("legal-voterview").url,
  sosVoterHubUrl: getLegalSourceById("legal-sos-voter-information").url,
  registrationPdfUrl: getLegalSourceById("legal-sos-voter-registration-pdf").url,
  heroCallout: {
    title: "Check your registration first",
    body:
      "AJAX petitions only count registered voters who live inside Jacksonville city limits. Use the state’s official lookup, then confirm your address matches the city boundary before you sign or circulate.",
  },
  steps: [
    {
      title: "Open VoterView",
      body:
        "Arkansas provides VoterView through the Secretary of State. You’ll typically enter name and date of birth to pull your registration card details.",
    },
    {
      title: "Confirm “active” status",
      body:
        "If you are inactive or need to update an address, fix registration before signing — don’t assume a neighbor can “vouch” for you on the petition line.",
    },
    {
      title: "Match Jacksonville boundaries",
      body:
        "Pulaski County has many addresses near Jacksonville that are not inside the municipal corporation. If the registration address is outside the city, that voter cannot sign this city petition (they can still volunteer).",
    },
  ],
} as const;
