# AJAX lane — new AI thread handoff

**Repo root:** `H:\SOSWebsite\ajax`  
**Purpose:** Orientation + **no-feature** protocol for a fresh ChatGPT/Cursor thread.  
**Created:** 2026-04-26  

---

## 1. AJAX “new thread” protocol / start order

The repo **does not** define a separate `THREAD_START.md`. Treat this as canonical order:

| Step | Read |
|------|------|
| 1 | [`README.md`](../README.md) — branches, Netlify, dev/build one-liners |
| 2 | [`docs/ajax-reddirt-firewall.md`](./ajax-reddirt-firewall.md) — **do not** blur AJAX vs RedDirt vs county workbench |
| 3 | [`docs/CITY_SITE_MODEL.md`](./CITY_SITE_MODEL.md) — narrative spine (no Why/How/What labels on UI) |
| 4 | [`docs/AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md`](./AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md) — **single source of truth** for architecture, route inventory, gaps, phased checklist (§12) |
| 5 | Optional by task: [`docs/PHASE2_ROADMAP.md`](./PHASE2_ROADMAP.md) (volunteer/wards/events), [`docs/TRAINING_BACKLOG.md`](./TRAINING_BACKLOG.md) (inventory only) |

**There is no separate “packet queue” file** (unlike RedDirt `RED_DIRT_PACKET_QUEUE.md`). Execution order = **§12 Implementation checklist** in the master plan (Phase 0 → Phase 9).

**Hard rules:** Do **not** modify `RedDirt/` for AJAX work. Respect `lib/agents/reddirt-firewall.ts` for assistant routes.

---

## 2. Exact files read (this pass)

| File |
|------|
| `H:\SOSWebsite\ajax\README.md` |
| `H:\SOSWebsite\ajax\docs\AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md` (full) |
| `H:\SOSWebsite\ajax\docs\ajax-reddirt-firewall.md` (partial) |
| `H:\SOSWebsite\ajax\docs\CITY_SITE_MODEL.md` (partial) |
| `H:\SOSWebsite\ajax\docs\PHASE2_ROADMAP.md` (partial) |
| `H:\SOSWebsite\ajax\docs\TRAINING_BACKLOG.md` (partial) |
| `H:\SOSWebsite\ajax\package.json` (scripts header) |
| Verified on disk: `H:\SOSWebsite\ajax\content\legal\sourceRegistry.ts` exists |

---

## 3. Current app architecture summary

| Area | Detail |
|------|--------|
| **Stack** | Next.js **16.2** (App Router), React **19**, Turbopack dev, Tailwind 3.4, Framer Motion, optional **Supabase** |
| **Marketing shell** | `app/(marketing)/` — `/`, hub, events, faith, government, wards, volunteer, rules, training, resources, etc. |
| **Constituent / initiative** | `app/(constituent)/initiative/*` — petition, petition-guide, law, history, notaries, FAQ, etc. (**not** yet top-level `/ballot-guide` or `/history` per master plan) |
| **Field** | `/canvass/map` |
| **Admin** | `/admin/*` + login |
| **Content** | TS modules under `content/`; legal URLs migrating toward `content/legal/sourceRegistry.ts` |
| **Deploy** | Netlify; repo root = app root; branches **`main`**, **`netlify`** per README |
| **Assistant** | `app/api/assistant/*` + firewall injection |

---

## 4. Current build / test commands

```bash
cd H:\SOSWebsite\ajax
npm install
npm run dev          # next dev --turbopack
npm run build        # production build (includes TypeScript)
npm run lint         # eslint .
npm run audit:links  # link audit script
```

Optional Supabase: `npm run db:push` / `db:pull` (requires env).

---

## 5. Known environment issues

| Issue | Notes |
|-------|--------|
| **Disk space** | `npm install` can fail with **ENOSPC** on constrained drives; free space or use another volume. |
| **Middleware** | Next 16 may warn that **`middleware` convention is deprecated** in favor of **proxy** — track upstream migration; not AJAX-specific logic change unless prompted. |
| **Supabase** | Ward/relational features need `.env.local` + migrations per `PHASE2_ROADMAP.md`. |
| **PDF asset** | Official petition PDF expected at `public/petition/jacksonville-petition.pdf` per content config — missing file = broken embed until added. |

---

## 6. Packet queue / next recommended packet

AJAX uses the **master plan phases**, not a separate queue file.

| Phase | Status (high level) |
|-------|---------------------|
| **Phase 0 — Hygiene** | **`content/legal/sourceRegistry.ts` is present** in repo; prior work also touched `rules.ts`, petition content, `statewide-and-local` page, etc. **Confirm** these commits are on **`main`** or **`ajax-buildout`** and **`npm run build` is green** on the integration branch. |
| **Phase 1 — IA: `/ballot-guide` & `/history`** | **Next major build slice** after Phase 0 verified: new routes or redirects per §12 (do not break `/initiative/*` without 301/alias plan). |

**Safest immediate next actions (for a coding thread):**

1. On the active branch: **`npm run build`** and **`npm run lint`**; fix regressions only.  
2. Update **§12 checkboxes** in `AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md` to reflect Phase 0 completion if git matches.  
3. **Phase 1 kickoff:** smallest shippable step — e.g. **`/ballot-guide` stub layout + canonical nav link** that still delegates to existing `/initiative/*` content **or** Netlify/Next **redirect table draft** (plan-only PR acceptable if thread is planning-only).

---

## 7. Risks or blockers

- **IA churn:** Adding `/ballot-guide` and `/history` without redirects risks broken bookmarks and duplicate content.  
- **Legal claims:** New copy must follow §6 page anatomy (sources, disclaimer, enforcement status).  
- **Scope creep:** Phase 2 volunteer roadmap (events UX, ward depth) competes with Phase 1 IA — **pilot should pick one lane per thread**.  
- **Cross-repo:** Accidental imports or copy from RedDirt SOS narrative — firewall doc forbids.

---

## 8. Recommended next Cursor script (paste into Cursor)

```text
You are working ONLY in H:\SOSWebsite\ajax.

Read in order:
1. README.md
2. docs/ajax-reddirt-firewall.md
3. docs/CITY_SITE_MODEL.md
4. docs/AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md (especially §12)

Do not edit RedDirt, phatlip, or sos-public.

Task: [choose one]
A) Verify Phase 0: npm run build + npm run lint; report; update master plan checkboxes if Phase 0 is done on this branch.
B) Phase 1 smallest slice: [describe — e.g. ballot-guide shell + links to existing initiative pages only]
C) Planning only: draft redirect map /initiative/history/* → /history/* without implementing.

End with: files changed, commands run, build result, commit suggestion.
```

---

## 9. Completion report (this documentation pass)

| Item | Result |
|------|--------|
| **Objective** | New-thread protocol + handoff file only — **no feature code changes** |
| **Output** | `docs/AJAX_NEW_THREAD_HANDOFF.md` (this file) |
| **Build** | Not run in this pass |
| **Next for Steve** | Paste **this entire file** (or §8 script + goal) into ChatGPT; then open Cursor with lane pinned to `ajax` |

---

## 10. What Steve should paste back into ChatGPT

Use this block to start the **implementation** thread after orientation:

```text
Lane: AJAX only — H:\SOSWebsite\ajax
I have read docs/AJAX_NEW_THREAD_HANDOFF.md.

Goal: [Phase 0 verify | Phase 1 IA slice | bugfix | copy-only — pick one]

Constraints:
- Do not modify RedDirt, phatlip, sos-public, countyWorkbench unless I explicitly say so.
- Follow docs/ajax-reddirt-firewall.md and CITY_SITE_MODEL.md.
- Obey AJAX_BUILDOUT_AUDIT_AND_MASTER_PLAN.md §12 ordering unless I override.

Branch: [main | ajax-buildout | other]

First deliverable:
- [e.g. green npm run build + checklist update]
- [e.g. /ballot-guide index that only links to existing /initiative routes]

Report format: files changed, commands run, build/lint result, risks, suggested commit message.
```

---

*Maintainers: after major milestones (Phase 0 complete, Phase 1 routes live), add a one-line note under §6 with date and branch tip.*
