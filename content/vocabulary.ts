/**
 * Campaign vocabulary for STT biasing, cleanup, and post-processing.
 * Keep in sync with ward maps, FAQ, and city directory when those change.
 */
export const campaignVocabulary = {
  places: [
    "Jacksonville",
    "Pulaski County",
    "Arkansas",
    "Ward 1",
    "Ward 2",
    "Ward 3",
    "Ward 4",
    "Ward 5",
    "US-67",
    "Main Street",
  ],
  officials: [
    "Mike Dietz",
    "Tanner Ruple",
    "Kevin McCleary",
    "Trenika McCoy",
    "Reedie Ray",
    "Michael LaBron",
    "Richard Moss",
    "Mary Twitty",
    "Joy Kinman",
    "Katrina Mimms",
  ],
  campaignTerms: [
    "AJAX",
    "at-large voting",
    "ward-based voting",
    "ward-only",
    "initiative petition",
    "city limits",
    "duplicate signer",
    "reconciler",
    "phone bank",
    "Power of 5",
    "reach list",
    "voter directory",
    "witness",
    "notary",
    "canvass",
    "organizer",
    "ward captain",
  ],
} as const;

/** Whisper `prompt` max ~1000 chars — compact high-signal list. */
export function getSttPromptHint(): string {
  const parts = [
    "Jacksonville Arkansas municipal petition. Ward 1 through Ward 5.",
    ...campaignVocabulary.campaignTerms.slice(0, 20),
    ...campaignVocabulary.officials.slice(0, 6),
  ];
  return parts.join(". ").slice(0, 980);
}
