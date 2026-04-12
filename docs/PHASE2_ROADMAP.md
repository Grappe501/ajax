# AJAX Volunteer Hub — Phase 2 roadmap (tight)

**North star:** Turn Phase 1’s public landing into a **usable volunteer layer**: real educational pages, schedulable events, and ward scaffolding — without building heavy internal ops tooling yet.

**In repo now — relational ward board (v1)**

- **Routes:** `/wards/[slug]` (public board + leaderboard), `/join`, `/onboard`, `/dashboard` (personalized).
- **Data:** `supabase/migrations/20260412120000_ward_organizing.sql` — tree via `parent_id`, Power-of-5 goal, RPC leaderboard + ward stats.
- **Setup:** `.env.example` + Supabase Auth (magic link) redirect to `/auth/callback`.

**Next for this track:** weekly digest nudges, captain tools, verification of real petition sign-ups (not just organizer accounts), anti-gaming rules.

**Principles**

- Reuse Phase 1 content modules (`content/*.ts`) and expand them; avoid one-off copy in components.
- Ship **static or lightly dynamic** pages before heavy authenticated experiences.
- **Supabase** for relational data; keep **Netlify** deploy path documented.

---

## Tier 1 — Ship first (core Phase 2)

| # | Deliverable | Done when |
|---|-------------|-----------|
| 1 | **Petition procedures page** (`/rules` full) | Printable checklist, witness/eligibility sections, links to official sources; no legal advice framing |
| 2 | **Volunteer handbook page** (`/volunteer` or `/handbook`) | Single scroll or chapter nav; aligns with training module titles |
| 3 | **Training center page** (`/training`) | All modules listed; “available” modules have real overview + time/location or video placeholder |
| 4 | **Events page + calendar UX** (`/events`) | Month/week list, filters (signing / training / tabling), RSVP or mailto handoff — not full ticketing |
| 5 | **Ward overview** (`/wards` upgrade) | Map or list + how to join; each ward links to the organizing board |
| 6 | **Ward organizing board** (`/wards/[slug]` + join/onboard/dashboard) | **v1 shipped:** tree + leaderboard + personal dashboard; **next:** captain view, weekly pace, verified sign-up linkage |

**Sequencing (recommended):** 1 → 2 → 3 (education spine) → 4 (urgency) → deepen ward board (5–6) in parallel with content.

---

## Tier 2 — Strong follow-ons

| Deliverable | Notes |
|-------------|--------|
| **Resources library** (`/resources`) | PDFs hosted in `public/` or CMS; version dates on each asset |
| **Leadership onboarding** (`/lead` expansion) | Expectations, time commitment, how captains are supported — extend beyond the volunteer-facing ward dashboard |
| **Email/social deep links** | Replace `#` placeholders sitewide |

---

## Tier 3 — Optional (flagship, higher risk)

| Deliverable | Notes |
|-------------|--------|
| **Ask AJAX (beta)** | Grounded FAQ only; disclaimer; fallback to contact; no legal claims |
| **Light analytics** | Plausible/GA4 events mapped to existing `trackEvent` names |

---

## Explicit non-goals (Phase 2)

- Authenticated volunteer portal, ward captain dashboards, neighborhood dashboards  
- Petition scanning, voter file, or CRM sync  
- Full internal reporting or training completion tracking  

(Those belong in **Phase 3+** with Supabase/Airtable and product decisions.)

---

## Definition of done (Phase 2)

- A volunteer can **learn, RSVP or sign up, and find their ward** without hitting “coming soon” on core paths above.  
- Stubs left in Phase 1 copy are either **removed or replaced** with real links/content.  
- Mobile and accessibility match Phase 1 bar.

---

## Cursor / git suggestion

Work in vertical slices (e.g. “rules page + content/rules expansion”) and commit per slice: `feat(phase2): …`.
