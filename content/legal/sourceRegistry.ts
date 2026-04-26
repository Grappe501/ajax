/**
 * Central registry for external legal / primary-source URLs cited across AJAX initiative content.
 * Phase 0: single source of truth for href strings; pages keep their existing shapes (label + href).
 */

export type LegalSourceId =
  | "legal-sos-initiatives-referenda"
  | "legal-sos-handbook-ir-2025-2026-pdf"
  | "legal-arkansas-code-portal"
  | "legal-arkansas-advocate-injunction-2025-11"
  | "legal-sos-voter-information"
  | "legal-voterview"
  | "legal-sos-voter-registration-pdf"
  | "legal-ballotpedia-news-2021-05-arkansas-restrictions"
  | "legal-ballotpedia-news-2025-03-initiative-package"
  | "legal-aclu-ar-read-ballot-title-2025"
  | "legal-ballotpedia-news-2025-04-readability"
  | "legal-justia-aca-14-14-915"
  | "legal-ballotpedia-local-measures-ar"
  | "legal-courtlistener-lwv-v-jester"
  | "legal-arkansas-advocate-federal-challenge-2025-04"
  | "legal-arktimes-injunction-2025-11"
  | "legal-uaex-initiative-laws-on-hold-2025-11"
  | "legal-ballotpedia-ar-1910-amendment-10"
  | "legal-ballotpedia-ar-issue-5-2018-minwage"
  | "legal-justia-ar-const-art-5"
  | "legal-justia-title-7-ch-9";

export type LegalSource = {
  id: LegalSourceId;
  url: string;
};

const LEGAL_SOURCES: Record<LegalSourceId, LegalSource> = {
  "legal-sos-initiatives-referenda": {
    id: "legal-sos-initiatives-referenda",
    url: "https://www.sos.arkansas.gov/elections/initiatives-and-referenda/",
  },
  "legal-sos-handbook-ir-2025-2026-pdf": {
    id: "legal-sos-handbook-ir-2025-2026-pdf",
    url: "https://www.sos.arkansas.gov/uploads/elections/2025-2026_I__R_Handbook_-_December_2025_(00000005)_Final_copy_12.31_.25_.pdf",
  },
  "legal-arkansas-code-portal": {
    id: "legal-arkansas-code-portal",
    url: "https://portal.arkansas.gov/service/arkansas-code-search-laws-and-statutes/",
  },
  "legal-arkansas-advocate-injunction-2025-11": {
    id: "legal-arkansas-advocate-injunction-2025-11",
    url: "https://arkansasadvocate.com/2025/11/19/judge-issues-injunction-against-arkansas-direct-democracy-laws/",
  },
  "legal-sos-voter-information": {
    id: "legal-sos-voter-information",
    url: "https://www.sos.arkansas.gov/elections/voter-information/",
  },
  "legal-voterview": {
    id: "legal-voterview",
    url: "https://www.voterview.ar-nova.org/VoterView",
  },
  "legal-sos-voter-registration-pdf": {
    id: "legal-sos-voter-registration-pdf",
    url: "https://www.sos.arkansas.gov/uploads/elections/Voter_Reg_App._8-2023_.pdf",
  },
  "legal-ballotpedia-news-2021-05-arkansas-restrictions": {
    id: "legal-ballotpedia-news-2021-05-arkansas-restrictions",
    url: "https://news.ballotpedia.org/2021/05/03/arkansas-passes-bill-with-multiple-restrictions-on-the-ballot-initiative-process/",
  },
  "legal-ballotpedia-news-2025-03-initiative-package": {
    id: "legal-ballotpedia-news-2025-03-initiative-package",
    url: "https://news.ballotpedia.org/2025/03/03/arkansas-governor-signs-four-bills-revising-initiative-and-referendum-rules-including-signature-gathering-period-ballot-language-approval-and-circulator-requirements/",
  },
  "legal-aclu-ar-read-ballot-title-2025": {
    id: "legal-aclu-ar-read-ballot-title-2025",
    url: "https://www.acluarkansas.org/en/legislation/require-signer-read-ballot-title-petition-presence-canvasser-and-declare-emergency",
  },
  "legal-ballotpedia-news-2025-04-readability": {
    id: "legal-ballotpedia-news-2025-04-readability",
    url: "https://news.ballotpedia.org/2025/04/23/arkansas-enacts-ballot-title-readability-law-joining-five-other-states-since-2018/",
  },
  "legal-justia-aca-14-14-915": {
    id: "legal-justia-aca-14-14-915",
    url: "https://law.justia.com/codes/arkansas/title-14/subtitle-2/chapter-14/subchapter-9/section-14-14-915/",
  },
  "legal-ballotpedia-local-measures-ar": {
    id: "legal-ballotpedia-local-measures-ar",
    url: "https://ballotpedia.org/Laws_governing_local_ballot_measures_in_Arkansas",
  },
  "legal-courtlistener-lwv-v-jester": {
    id: "legal-courtlistener-lwv-v-jester",
    url: "https://www.courtlistener.com/docket/69919853/league-of-women-voters-of-arkansas-v-jester/",
  },
  "legal-arkansas-advocate-federal-challenge-2025-04": {
    id: "legal-arkansas-advocate-federal-challenge-2025-04",
    url: "https://arkansasadvocate.com/2025/04/21/federal-lawsuit-challenges-arkansas-restrictions-citizen-led-ballot-initiatives/",
  },
  "legal-arktimes-injunction-2025-11": {
    id: "legal-arktimes-injunction-2025-11",
    url: "https://arktimes.com/arkansas-blog/2025/11/19/judge-issues-injunction-against-arkansas-direct-democracy-laws",
  },
  "legal-uaex-initiative-laws-on-hold-2025-11": {
    id: "legal-uaex-initiative-laws-on-hold-2025-11",
    url: "https://www.uaex.uada.edu/business-communities/ced-blog/posts/2025/november/arkansas-citizen-initiative-laws-on-hold.aspx",
  },
  "legal-ballotpedia-ar-1910-amendment-10": {
    id: "legal-ballotpedia-ar-1910-amendment-10",
    url: "https://ballotpedia.org/Arkansas_Initiative_and_Referendum_Amendment_(1910)",
  },
  "legal-ballotpedia-ar-issue-5-2018-minwage": {
    id: "legal-ballotpedia-ar-issue-5-2018-minwage",
    url: "https://ballotpedia.org/Arkansas_Issue_5,_Minimum_Wage_Increase_Initiative_(2018)",
  },
  "legal-justia-ar-const-art-5": {
    id: "legal-justia-ar-const-art-5",
    url: "https://law.justia.com/constitution/arkansas/article-5.html",
  },
  "legal-justia-title-7-ch-9": {
    id: "legal-justia-title-7-ch-9",
    url: "https://law.justia.com/codes/arkansas/title-7/chapter-9/",
  },
};

export function getLegalSourceById(id: LegalSourceId): LegalSource {
  const source = LEGAL_SOURCES[id];
  if (!source) {
    throw new Error(`Unknown legal source id: ${id}`);
  }
  return source;
}

export function getLegalSourcesByIds(ids: readonly LegalSourceId[]): LegalSource[] {
  return ids.map((id) => getLegalSourceById(id));
}

/** Arkansas Legislature bill detail (regular session R suffix). */
export function buildArklegBillUrl(sessionYear: number, billId: string): string {
  return `https://arkleg.state.ar.us/Bills/Detail?ddBienniumSession=${sessionYear}%2F${sessionYear}R&id=${billId}`;
}
