# City site model (AJAX, Phatlip, future municipal builds)

This document is the **reusable pattern** for city-scoped campaign sites that share a workspace with **RedDirt** (statewide Secretary of State stack) but **deploy separately** on Netlify.

## Scope

| Layer | RedDirt / SOS | City sites (`ajax`, `phatlip`, …) |
|--------|----------------|-------------------------------------|
| Geography | Arkansas-wide | One city (or defined municipal area) |
| Narrative center | State office, statewide planks | Neighborhood stake, local charter/process |
| Typical CTA mix | Donate, counties, volunteer, policy hubs | Local petition or issue, wards, clerk-facing rules |

City sites **do not** paste the SOS hero or impersonate the statewide campaign. Agent and content firewalls stay documented per app (see `ajax-reddirt-firewall.md`).

## Landing page — single purpose

Every city landing page should make **one immediate job** obvious:

- *What is this site for?*
- *Who is it for (residents of which place)?*
- *What is the one action we most want a new visitor to consider?*

Everything below the hero **supports** that decision without dumping the whole campaign in one screen.

## Narrative spine (golden circle — **never** label it on the UI)

Simon Sinek’s model maps cleanly onto politics if you **show** it instead of **naming** it:

1. **Inner ring — conviction**  
   The moral or civic stake: what is wrong, what could be fairer, what neighbors are owed.  
   *On the site:* one calm, emotional band (see `CityBeliefApproach` + `content/city-narrative.ts` → `stake`).  
   *Do not* use the word “Why” as a section heading.

2. **Middle ring — character and method**  
   How this campaign behaves differently: transparency, discipline, who speaks for the work.  
   *On the site:* principles and process (`approach`).  
   *Do not* use “How” as a consumer-facing label — use language like “In practice” or “The way we work.”

3. **Outer ring — proof and action**  
   Events, petition lines, voter lookup, ward tools, trainings — tangible things people can do.  
   *On the site:* voter strip, journey cards, start-here grid, events, hub.  
   *Do not* use “What” as a section title — use concrete names (“Take the next step,” “Start here,” “Upcoming events”).

Professional polish comes from **story order**, not from framework jargon.

## Implementation in AJAX

- Copy: `content/city-narrative.ts` (stake + approach; hero remains in `content/site.ts`).
- Layout: `CityBeliefApproach` sits under the hero / voter strip on the marketing home stack.
- Other city apps should copy the **pattern** (new `city-narrative.ts` per city), not AJAX’s Jacksonville text.

## Netlify and Git

Each city app is its **own GitHub repository** (or will be). Use a dedicated **`netlify` branch** for the production deploy ref if you want `main` to stay integration-heavy; point Netlify’s production branch at `netlify` or `main` per team preference. See `ajax/README.md` → **Deploy**.
