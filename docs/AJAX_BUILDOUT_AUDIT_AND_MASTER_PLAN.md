# AJAX buildout — architecture audit & master plan

**Document:** `AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md`  
**Repo root:** `H:\SOSWebsite\ajax`  
**Audit date:** 2026-04-26 (new thread baseline)  
**Related:** `RedDirt/` (do not modify for AJAX work), `phatlip/` (separate track; no code changes this pass)

This file is the **single source of truth** for what exists today, what the product should become, and the ordered checklist for implementation. It reflects a read of `README.md`, `docs/CITY_SITE_MODEL.md`, `docs/ajax-reddirt-firewall.md`, the App Router tree, `content/*`, and key components.

---

## 1. Current architecture audit

### 1.1 Framework & runtime

| Item | Detail |
|------|--------|
| Framework | **Next.js 16.2** (App Router) |
| React | **19.x** |
| Bundler / dev | **Turbopack** (`next dev --turbopack`) |
| TypeScript | **5.x** |
| Styling | **Tailwind CSS 3.4** + `globals.css`, design tokens (`tailwind.config.ts`, `PublicThemeProvider`) |
| UI primitives | **Base UI** + **shadcn-style** patterns (`components/ui/*`, `buttonVariants`, `Card`, etc.) |
| Motion | **Framer Motion** (section reveals, etc.) |
| Data (optional) | **Supabase** (`@supabase/ssr`, `supabase/` migrations README) |
| Deploy | **Netlify** (`@netlify/plugin-nextjs` in devDependencies); branches **`main`** + **`netlify`** on `origin` |

### 1.2 Routing system

Routes use **route groups** (folders do not appear in the URL):

| Group | Path prefix (logical) | Layout / shell |
|--------|------------------------|----------------|
| `(marketing)` | `/`, `/hub`, `/events`, `/faith`, `/government`, … | `SiteHeader`, `SiteFooter`, `AnnouncementBar`, `PublicThemeProvider` |
| `(constituent)` | `/initiative/*` | `ConstituentHeader`, `ConstituentFooter` — shareable education pages |
| `(field)` | `/canvass/map` | Field layout |
| `admin` | `/admin/*` | Admin board shell, login |

**Middleware:** `middleware.ts` (session/auth-related; verify for new public routes).

### 1.3 Data & content patterns

- **TypeScript modules** under `content/*.ts` export copy, metadata, and structured arrays (no CMS in path for most narrative).
- **Server components** by default; **client** where hooks/interactions (`"use client"`).
- **PDF / static assets:** `public/` — petition PDF expected at `public/petition/jacksonville-petition.pdf` per `content/petition-assets.ts`; embed via `PetitionOfficialPdf`.
- **Legal / legislation:** Currently `content/petition-legislation.ts`, `content/petition-litigation.ts`, `content/petition-guide-chunks.ts`, `content/ballot-history-decades.ts` — **not** yet the normalized `content/legal/*` + `content/history/*` tree requested in the build spec.
- **Assistant:** `lib/agents/*`, `assistant-knowledge.ts`, API routes under `app/api/assistant/*` — RedDirt firewall in `lib/agents/reddirt-firewall.ts`.

### 1.4 Component patterns

- **Layout:** `SectionShell`, `SectionHeading`, `SectionReveal`, `FullBleed`-style sections in marketing.
- **CTAs:** `PrimaryButton`, `SecondaryButton`, `CTACluster` (often Next `Link` under the hood).
- **Initiative:** `InitiativeSubnav`, `InitiativePageShell`, `PetitionCoach`, notary subcomponents under `components/initiative/notary/`.
- **Drill-down:** `DrillDownShell`, `ProseBlock` (`components/initiative/drill-down-shell.tsx`).
- **City narrative:** `CityBeliefApproach` + `content/city-narrative.ts` (golden circle **without** Why/How/What labels per `CITY_SITE_MODEL.md`).

### 1.5 Build & quality commands

```bash
npm install
npm run dev      # next dev --turbopack
npm run build    # production build — must pass before merge
npm run lint     # eslint .
npm run audit:links
```

No `npm run typecheck` script today; `next build` runs TypeScript checks.

---

## 2. Existing routes (inventory)

### 2.1 Marketing (`(marketing)`)

- `/` — Home (`MarketingHome`)
- `/hub`, `/hub/notary`
- `/faith`, `/government`, `/government/[slug]`
- `/wards`, `/wards/[slug]`, `/wards/[slug]/dashboard|join|onboard`
- `/volunteer`, `/faq`, `/rules`, `/training`, `/resources`
- `/events`, `/events/submit`
- `/connect`, `/lead`, `/campaign`, `/movement`, `/why-it-matters`
- `/dev` (dev portal when enabled)

### 2.2 Constituent — initiative / law / history (current URLs)

All under **`/initiative/...`** today (not yet `/ballot-guide` or top-level `/history`):

- `/initiative` — education hub
- `/initiative/petition` — Petition Coach + official PDF section
- `/initiative/voter-status` — VoterView + checklist
- `/initiative/petition-guide`, `/initiative/petition-guide/rules/[slug]` — chunked rule clusters (6 slugs)
- `/initiative/law` — law hub
- `/initiative/law/statewide-and-local`, `filing-training`, `litigation`, `legislature`, `legislature/[slug]`
- `/initiative/history`, `/initiative/history/[decade]`
- `/initiative/language`, `how-to-sign`, `instructions`, `mistakes`, `canvassers`, `notaries`, `faq`

### 2.3 Admin & APIs

- `/admin`, `/admin/login`, board routes (`campaign-manager`, `co-pilot`, `volunteers`, …)
- `/api/assistant`, `/api/assistant/agent`, voice routes, `/api/canvass/markers`, etc.

---

## 3. What is already built (summary)

- **City landing** with hero, trust line, CTAs; **voter strip** (`VoterLookupStrip`) in **separate section immediately below hero** (not inside hero grid).
- **Golden-circle-style bands** via `CityBeliefApproach` (stake + “In practice”) after voter strip; **WelcomeJourney** + **StartHereCards** + events + assistant.
- **Petition Coach**, **instruction modules** (`petitionInstructions.ts` — structured from sheet/PDF intent), **rules accordion** (`content/rules.ts`), **notary pages** (constituent + hub notary).
- **Legislation deep dives:** 13 entries in `petition-legislation.ts` → pages at `/initiative/law/legislature/[slug]`.
- **Litigation primer:** `/initiative/law/litigation` + `petition-litigation.ts` (LWV v. Jester, injunction basics).
- **History scaffold:** decades in `ballot-history-decades.ts` → `/initiative/history/*`.
- **Municipal vs statewide explainer:** `/initiative/law/statewide-and-local`.
- **Official petition PDF pipeline:** path constant + iframe when file exists.
- **Git:** `main` at `66ef409` (as of audit); **`netlify`** branch exists and tracks same tip; **`ajax-buildout`** branch — **not yet created** (see §11).

---

## 4. What is missing (vs. build spec)

### 4.1 Information architecture

- Top-level **`/ballot-guide/**`** tree (user spec) — **not present**; content lives under **`/initiative/**`**. Need either **migration + redirects** or **parallel routes** with canonical choice.
- Top-level **`/history/**`** and **`/history/ballot-initiatives/**`** nested tree — **not present**; history is under **`/initiative/history`**.
- **`/municipal-guide/**`** full segment (`start`, `rules`, `timelines`, `petitions`, `notary`, `city-clerk`, `legal`) — **not present** as dedicated IA (partial overlap with `statewide-and-local`, `petition-guide`, notary pages).
- **Event hosting training** under **`/events/host`**, `checklist`, `house-meeting`, etc. — **`/events`** and **`/events/submit`** exist; **no** host training drill-down segment.

### 4.2 Content systems

- **`content/legal/sourceRegistry.ts`** — **missing** (central canonical URLs + citation metadata).
- **`content/legal/arkansasPetitionRestrictionLaws.ts`** — **missing** as named module (data currently in `petition-legislation.ts`; needs verification pass + enforcement status fields per spec).
- **`content/legal/municipalInitiativesArkansas.ts`** — **missing** (statute refs + plain English + field impact).
- **`content/history/ballotInitiativeTimeline.ts`**, **`arkansasDecades.ts`**, **`arkansasPetitionsByDecade.ts`** — **missing** as split modules (decade data currently `ballot-history-decades.ts`; no `[petitionSlug]` depth).

### 4.3 Rule-based petition guide (chunk schema)

Existing **`petition-guide-chunks.ts`** has: `surface`, `deeper`, `nittyGritty`, `statuteRefs`.  
Spec asks per rule: **title, summary, who it applies to, what can go wrong, legal citation, training checklist, drill-down page** — needs **schema extension** or **new `content/ballot-guide/rules/*.ts`** pattern.

### 4.4 Training / quiz

- **Volunteer quiz / checklist placeholder** — **not present** as dedicated route.
- **Trainer guide** — partial (hub, rules, instructions); no **`/ballot-guide/.../trainer`** style page.

### 4.5 Legal research artifacts

- **SOS 2026 I&R Handbook** — referenced in `rules.ts` links; **no** in-repo mirror or version pin in `sourceRegistry` yet.
- **Verified list of 13+ restrictive laws** — editorial list exists; **full verification** against Ark. Legislature session records **outstanding**.
- **Oct. 31, 2025 Arkansas Supreme Court paper ballot initiative case** — **not captured** in content; needs docket retrieval and neutral summary.
- **Injunction:** which **statutory sections** are enjoined for **which plaintiffs** — current page is **high-level**; needs **issue-specific** `/ballot-guide/injunctions/[slug]` **after** docket review.

### 4.6 Voter lookup placement

- Spec: **inside or immediately after hero**, as **first civic action**.  
- **Current:** first action is **below** hero in full-width strip — **close** but not **in** hero. **Gap:** merge strip into hero column/footer or hero-adjacent band per design.

### 4.7 City-model expansion

Spec lists **city-level areas** (organizer, council/mayor/school board civics, resource library, neighborhood team model). **Partial:** wards, government pages, faith, volunteer paths exist; **no** unified “civic education” hub or **`/civic`**, **`/organize`** IA.

---

## 5. Recommended folder structure (target)

```
ajax/
├── app/
│   ├── (marketing)/           # City shell: landing, events, wards, civic hubs
│   ├── (constituent)/         # OR fold ballot-guide under marketing with shared nav — decide
│   │   ├── ballot-guide/      # NEW IA (or alias /initiative → ballot-guide)
│   │   ├── history/           # NEW top-level history (ballot-initiatives subtree)
│   │   └── municipal-guide/   # NEW
│   └── ...
├── content/
│   ├── site.ts                # City config, nav, hero
│   ├── city-narrative.ts
│   ├── legal/
│   │   ├── sourceRegistry.ts
│   │   ├── arkansasPetitionRestrictionLaws.ts
│   │   ├── municipalInitiativesArkansas.ts
│   │   └── injunctions.ts     # optional split from litigation
│   ├── history/
│   │   ├── ballotInitiativeTimeline.ts
│   │   ├── arkansasDecades.ts
│   │   └── arkansasPetitionsByDecade.ts
│   ├── ballot-guide/          # chunked rules (or keep petition-guide-chunks, rename)
│   │   └── rules/
│   └── ...
├── components/
│   ├── ballot-guide/          # shared layouts, registries, status badges
│   └── ...
└── docs/
    ├── CITY_SITE_MODEL.md
    └── AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md  (this file)
```

**Principle:** keep **one canonical** place for legal citations (`sourceRegistry`) and **one** for restriction laws (`arkansasPetitionRestrictionLaws.ts`); pages only compose data.

---

## 6. Legal / research content architecture

### 6.1 Source tiers

1. **Primary:** Arkansas Constitution (official), Arkansas Code (official portal), SOS publications, enrolled acts (arkleg), court dockets/orders (CourtListener, PACER where applicable).
2. **Secondary (context only):** Arkansas Advocate, AP, public radio — **never** sole authority for “what the law says.”

### 6.2 Page anatomy (every legal-adjacent page)

1. **What the law says** (quote or tight paraphrase with citation).
2. **Plain-English meaning.**
3. **Practical field impact** (signers, circulators, sponsors, clerks).
4. **Current status** (effective date, emergency clauses, suspensions).
5. **Enforcement / litigation** (active, enjoined, appealed, unclear) — **explicit**.
6. **Source links** (array of `sourceRegistry` IDs).
7. **Disclaimer:** not legal advice; counsel/clerk prevail.

### 6.3 `sourceRegistry.ts` (planned shape)

```ts
export type LegalSource = {
  id: string;
  title: string;
  publisher: "AR_SOS" | "AR_LEGISLATURE" | "AR_CONST" | "AR_CODE" | "FED_COURT" | "AR_SUP_CT" | "OTHER";
  url: string;
  retrievedNote?: string; // e.g. "Handbook dated Dec 2025"
  tier: "primary" | "secondary";
};
```

---

## 7. City model architecture (AJAX)

- **Product:** Jacksonville **city-level** civic organizing + **direct democracy** tools; **not** Kelly Grappe SOS site; **not** PhatLip.
- **Narrative order:** civic stake → operating approach → concrete tools (see `CITY_SITE_MODEL.md`); **never** label Why/How/What on public UI.
- **Landing:** single clear purpose; **voter registration check** as **first civic action** (hero integration per §4.6).
- **Expansion routes (conceptual):**
  - **Local issue organizer** — tie to `/hub`, `/lead`, `/wards`.
  - **Petition training** — `/ballot-guide` + `/initiative/petition` during transition.
  - **Municipal guide** — `/municipal-guide/*`.
  - **Council / mayor / school board civics** — extend `/government` or add `/civic/elected-offices` (TBD).
  - **Resource library** — `/resources` + tagged sections.
  - **Neighborhood team model** — `/wards` + training docs.

---

## 8. Voter lookup placement plan

| Step | Action |
|------|--------|
| 1 | Add **compact “Check your registration”** block **inside** `HomeHero` (e.g. below CTAs or in right column on desktop) **or** flush **below** headline as single full-width band **within** the same `<section>` as hero (same visual unit). |
| 2 | Keep **`VoterLookupStrip`** copy in `content/voter-lookup.ts`; avoid duplicating URLs. |
| 3 | Maintain **`/initiative/voter-status`** as the **deep** page; hero links there + VoterView. |
| 4 | Mobile: stack hero → registration card → rest; test tap targets. |

---

## 9. Ballot initiative drill-down plan

| Phase | Work |
|-------|------|
| A | **Inventory** official SOS handbook PDF (2025–2026 or 2026); store **pinned link + checksum note** in `sourceRegistry` (no full PDF in repo unless licensed). |
| B | **Map** handbook sections → rule IDs; extend chunk schema (**who**, **risks**, **checklist**, **citations**). |
| C | **Sections:** basics, filling, signature validity, canvasser, sponsor, county, notary, cure, timeline, mistakes, training modules, legal refs — either **one hub** with anchors or **subsection routes** under `/ballot-guide/rules/[topic]/[slug]`. |
| D | **Migrate** or **redirect** `/initiative/petition-guide/*` → `/ballot-guide/*` if IA change is approved (301 via Netlify or Next redirects). |
| E | **Embed** official PDF on `/ballot-guide/official-packet` (reuse `PetitionOfficialPdf`). |

**Existing anchor content:** `petitionInstructions.ts`, `rules.ts`, `how-to-sign.ts`, `petition-coach.ts`, `petition-guide-chunks.ts`.

---

## 10. Arkansas / US history drill-down plan

| Route (spec) | Status | Plan |
|--------------|--------|------|
| `/history` | Missing | Landing: links to US + AR ballot initiative hubs |
| `/history/ballot-initiatives` | Missing | Overview + timeline teaser |
| `/history/ballot-initiatives/us` | Missing | National narrative + `ballotInitiativeTimeline.ts` |
| `/history/ballot-initiatives/arkansas` | Missing | State narrative + link to decades |
| `/history/ballot-initiatives/arkansas/[decade]` | Partial analog `/initiative/history/[decade]` | Move or alias |
| `/history/ballot-initiatives/arkansas/[decade]/[petitionSlug]` | Missing | `arkansasPetitionsByDecade.ts` records + dynamic page |

**Data:** start from `ballot-history-decades.ts`, split into `content/history/*`, add petition records with `sources: string[]` → `sourceRegistry` IDs.

---

## 11. Branch / deployment notes

### 11.1 AJAX (`Grappe501/ajax`)

| Branch | Tip (at audit) | Purpose |
|--------|----------------|---------|
| `main` | `66ef409` | Integration / default |
| `netlify` | `66ef409` | Production deploy ref |
| **`ajax-buildout`** | **Create for long-running buildout** | Feature integration; merge to `main` when stable; then fast-forward `netlify` or open PR |

**Recommended workflow for this buildout:**

```bash
git checkout main
git pull origin main
git checkout -b ajax-buildout
# ... commits ...
# PR → main → update netlify when ready
```

**Do not** merge unreviewed work directly to `netlify` if `netlify` is production.

### 11.2 PhatLip (`H:\SOSWebsite\phatlip`)

- **Local git:** initialized; commit `f76624b` on `main`; **`netlify` branch** exists locally per README.
- **Remote:** **not configured** in audit session — operator must `git remote add origin` and push.
- **This pass:** no PhatLip file changes required for AJAX audit.

### 11.3 RedDirt

- **Do not touch** for AJAX scope.

---

## 12. Step-by-step implementation checklist

Use this as the execution order for the next coding passes (after this document is approved).

### Phase 0 — Hygiene

- [ ] Create branch **`ajax-buildout`** from `main`.
- [ ] Add `sourceRegistry.ts` + migrate existing URLs from `rules.ts`, `petition-legislation.ts`, `petition-litigation.ts` into registry IDs.
- [ ] Run `npm run build`; fix any regressions.

### Phase 1 — IA: ballot-guide & history (routing)

- [ ] Add **`app/(marketing)/ballot-guide/...`** or **`(constituent)/ballot-guide/...`** with shared nav.
- [ ] Implement **`/ballot-guide/2025-laws/[slug]`** backed by `arkansasPetitionRestrictionLaws.ts` (migrate from `petition-legislation.ts`).
- [ ] Implement **`/ballot-guide/injunctions`** + **`/ballot-guide/injunctions/[slug]`** (split issues: e.g. photo ID, read-aloud, readability — **after** reading Judge Brooks order).
- [ ] Add **`/history/...`** tree; **301 redirects** from `/initiative/history/*` if URLs move (preserve SEO/bookmarks).

### Phase 2 — Municipal guide

- [ ] Add `municipalInitiativesArkansas.ts` (A.C.A. Title 14 local provisions, charter pointers).
- [ ] Routes: `/municipal-guide/*` per spec; cross-link from `/ballot-guide` and `/initiative/law/statewide-and-local` (later deprecate duplicate).

### Phase 3 — Rule chunks v2

- [ ] Extend schema: who, risks, checklist, `sourceIds[]`, `enforcementStatus`.
- [ ] Cover sections: petition basics, filling, validity, canvasser, sponsor, county, notary, cure, timeline, mistakes, training, legal refs.
- [ ] Import or quote **handbook** sections with citations (no uncited legal claims).

### Phase 4 — Training & assessment

- [ ] Drill-down pages: filling, signature check, circulator speech, notary verification, bad notarization outcomes, disqualification risks, field checklist, trainer guide.
- [ ] **Quiz / checklist** placeholder page (client or server form stub).

### Phase 5 — Events hosting

- [ ] `/events/host`, `/events/checklist`, `/events/house-meeting`, `/events/community-forum`, `/events/petition-training`, `/events/follow-up`.
- [ ] Reuse `SectionShell` / drill-down pattern; link from `/hub` and `/events`.

### Phase 6 — City model surfaces

- [ ] Civic education hub (mayor/council/school board) — extend `/government` or new `/civic`.
- [ ] Resource library taxonomy in `/resources`.
- [ ] Neighborhood team model doc + `/wards` cross-links.

### Phase 7 — Voter lookup UX

- [ ] Integrate registration CTA **into hero** per §8; keep deep page.

### Phase 8 — Legal research verification (manual)

- [ ] Verify **13** (or final count) restriction laws: bill ↔ act ↔ codification; sponsors; effective dates.
- [ ] Add **Oct. 31, 2025** Supreme Court case: full citation + neutral summary.
- [ ] Update injunction pages with **statute-level** mapping from opinion.

### Phase 9 — Git & deploy

- [ ] Merge **`ajax-buildout`** → **`main`** via PR.
- [ ] Update **`netlify`** to release commit; confirm Netlify env.

---

## 13. Final output template (for implementation thread)

When implementation completes, report back using:

- **Files created** (paths)
- **Routes added** (table)
- **Legal research status** (verified / partial / TODO)
- **Sources captured** (registry IDs)
- **Verification gaps**
- **Build result** (`npm run build` exit + notes)
- **Git:** branch name + commit hash(es)

---

## 14. Sign-off

This audit **does not** change code. The next step is **Phase 0** on branch **`ajax-buildout`**, then phased IA and content implementation per §12.

*Maintainers: update this document when routes are migrated (e.g. `/initiative/*` → `/ballot-guide/*`) or when legal status changes materially.*
