/**
 * Placeholder crosswalk: Jacksonville residents who signed *any* tracked petition (AJAX + legacy lists).
 * Wire to Supabase `petition_signer_crosswalk` when import pipeline exists.
 */
export function getWardPetitionAlumniPlaceholder(wardSlug: string): {
  totalInWard: number;
  ajaxInitiative: number;
  otherBallots: number;
  matchedToVoterId: number;
} {
  const seed = wardSlug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const totalInWard = 12 + (seed % 40);
  return {
    totalInWard,
    ajaxInitiative: Math.min(totalInWard, 5 + (seed % 15)),
    otherBallots: Math.max(0, totalInWard - (5 + (seed % 15))),
    matchedToVoterId: Math.floor(totalInWard * 0.4),
  };
}
