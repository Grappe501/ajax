# PhatLip lane — new AI thread handoff

**Lane root:** `H:\SOSWebsite\phatlip`  
**Handoff file location:** `H:\SOSWebsite\ajax\docs\phatlip_NEW_THREAD_HANDOFF.md` (cross-lane index)  
**Purpose:** Orientation + **no-feature** protocol for a fresh ChatGPT/Cursor thread.  
**Created:** 2026-04-26  

---

## 1. PhatLip “new thread” protocol / start order

The repo defines an explicit starter doc:

| Step | Read |
|------|------|
| 1 | [`README.md`](../../phatlip/README.md) — stack, dev/build, branches, related repos |
| 2 | [`docs/PHATLIP_CURSOR_THREAD_START.md`](../../phatlip/docs/PHATLIP_CURSOR_THREAD_START.md) — **canonical thread order** + quality gate + “do not edit RedDirt/ajax” unless explicit |
| 3 | [`docs/PHATLIP_MASTER_PLAN.md`](../../phatlip/docs/PHATLIP_MASTER_PLAN.md) — product north star, build phases P0–P4 |
| 4 | [`docs/PHATLIP_DATA_FIREWALL.md`](../../phatlip/docs/PHATLIP_DATA_FIREWALL.md) — SOS/youth data separation |
| 5 | [`docs/PHATLIP_REPO_ARCHITECTURE.md`](../../phatlip/docs/PHATLIP_REPO_ARCHITECTURE.md) — folders, **route roadmap**, commands |

**`PHATLIP_CURSOR_THREAD_START.md` exact order (for copy-paste):**

1. `docs/PHATLIP_MASTER_PLAN.md`  
2. `docs/PHATLIP_DATA_FIREWALL.md`  
3. `docs/PHATLIP_REPO_ARCHITECTURE.md`  
4. **Do not edit** `RedDirt/` or `ajax/` unless the task explicitly says cross-repo work.  

**Quality gate:** `npm run build` before merging to `main` / `netlify`.

**Optional by workstream:**

- **Radio / production:** [`docs/PHATLIP_RADIO_OPERATIONS_QUEUE.md`](../../phatlip/docs/PHATLIP_RADIO_OPERATIONS_QUEUE.md), [`docs/PHATLIP_RADIO_TRANSCRIPTION_WORKFLOW.md`](../../phatlip/docs/PHATLIP_RADIO_TRANSCRIPTION_WORKFLOW.md)  
- **Future DB:** [`docs/PHATLIP_SUPABASE_SCHEMA.md`](../../phatlip/docs/PHATLIP_SUPABASE_SCHEMA.md)  

**Note:** `PHATLIP_MASTER_PLAN.md` mentions a future `PHATLIP_BUILD_PACKETS.md` — **not present** in repo; use master-plan phases + radio operations doc as the actionable queues.

---

## 2. Exact files read (this pass)

| File |
|------|
| `H:\SOSWebsite\phatlip\README.md` |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_CURSOR_THREAD_START.md` |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_MASTER_PLAN.md` |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_DATA_FIREWALL.md` |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_REPO_ARCHITECTURE.md` |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_RADIO_OPERATIONS_QUEUE.md` |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_RADIO_TRANSCRIPTION_WORKFLOW.md` (partial — §1–7) |
| `H:\SOSWebsite\phatlip\docs\PHATLIP_SUPABASE_SCHEMA.md` (partial — schema intro + core tables) |
| `H:\SOSWebsite\phatlip\package.json` |
| Verified on disk: `phatlip/app/` route inventory (glob), including `/paths` **without** `paths/[slug]` yet |

---

## 3. Current app architecture summary

| Area | Detail |
|------|--------|
| **Stack** | Next.js **16** (App Router), React **19**, TypeScript, Tailwind **3.4**, Turbopack dev; Netlify + `@netlify/plugin-nextjs`, **`output: "standalone"`** per architecture doc |
| **Product** | Youth civic engine: learning, pathways, missions/dashboard shells, radio + podcast surfaces, docs, safety |
| **Marketing / product routes (observed)** | `/`, `/start`, `/challenge`, `/paths` (selector only), `/learn` + topic pages, `/profile`, `/podcast`, `/radio` + episodes/transcripts, `/media-kit`, `/submit-story`, `/docs`, `/safety`, etc. |
| **Dashboard shells** | `/dashboard` + `path`, `missions`, `badges`, `events`, `leader`, `admin` child routes |
| **Radio — public** | `/radio/*`, `/podcast/*` |
| **Radio — ops (demo)** | `/admin/radio/*` backed by `content/radioProduction.ts` (no real staff auth / Supabase yet per operations doc) |
| **Content** | `content/` — e.g. `site.ts`, `pathways.ts`, `radioProduction.ts` (per docs) |
| **Cross-repo** | RedDirt = SOS OS; AJAX = city layer; **no silent merge** of campaign data into youth profiles |

**Drift note:** `PHATLIP_REPO_ARCHITECTURE.md` route table is a **roadmap**; the live tree is **ahead** of that table (e.g. `learn/`, `dashboard/`, full `radio/`). **`/paths/[slug]`** from the roadmap is **not** implemented yet (only `/paths/page.tsx`).

---

## 4. Current build / test commands

From `phatlip/package.json` and docs:

```bash
cd H:\SOSWebsite\phatlip
npm install
npm run dev          # next dev --turbopack
npm run build        # next build
npm run lint         # eslint .
```

No `test` script in `package.json` for this pass.

---

## 5. Known environment issues

| Issue | Notes |
|-------|--------|
| **Disk / install** | On constrained machines, `npm install` can fail with **ENOSPC** (seen elsewhere in this workspace family). |
| **Monorepo confusion** | PhatLip is its **own app root** under `H:\SOSWebsite\phatlip`; do not assume git root is `SOSWebsite` without checking. |
| **Middleware / Next** | Same family of apps as AJAX may show Next 16 **middleware → proxy** deprecation warnings — track upstream; not PhatLip-specific unless you touch middleware. |

---

## 6. Packet queue / next recommended packet

| Queue | Role |
|-------|------|
| **Master plan phases** | **P0** landing + hygiene + green build; **P1** auth, profiles, path selection, mission stubs; **P2+** XP schema, AI flags, dashboards |
| **Radio operations** | Demo UI complete; **next phase** = Supabase + staff JWT, storage links, real story API, audit log (see `PHATLIP_RADIO_OPERATIONS_QUEUE.md` § Next phase) |

**Safest immediate next build packet (for a coding thread):**

1. **Verify:** `npm run build` and `npm run lint` on the active branch; fix regressions only.  
2. **Smallest P1-shaped slice without auth:** Implement **`/paths/[slug]`** as **static** path detail + modules stub (matches `PHATLIP_REPO_ARCHITECTURE.md`), wired from `/paths` — no database required.  
3. **OR doc-only:** Refresh `PHATLIP_REPO_ARCHITECTURE.md` route table to match the current `app/` tree so future threads don’t plan against stale routes.

**Defer (higher risk / governance):** Supabase + RLS, real story submission pipeline, merging any SOS lists — until firewall + policy sign-off.

---

## 7. Risks or blockers

- **Data firewall:** Any CRM or shared DB work must preserve **youth vs SOS** separation (`PHATLIP_DATA_FIREWALL.md`).  
- **Youth safety:** Radio/transcription docs require consent, guest approval, and careful publish gates — demo data must not look like real minor PII.  
- **Scope creep:** Master plan spans gamification, AI, dashboards — **one thread should pick one phase or one doc section**.  
- **Cross-repo edits:** Thread starter forbids touching `ajax/` / `RedDirt/` unless explicitly tasked.

---

## 8. Recommended next Cursor script (paste into Cursor)

```text
You are working ONLY in H:\SOSWebsite\phatlip.

Read in order:
1. README.md
2. docs/PHATLIP_CURSOR_THREAD_START.md
3. docs/PHATLIP_MASTER_PLAN.md
4. docs/PHATLIP_DATA_FIREWALL.md
5. docs/PHATLIP_REPO_ARCHITECTURE.md

Do not edit RedDirt, ajax, or other sibling repos unless I explicitly say cross-repo.

Task: [choose one]
A) Verify: npm run build && npm run lint; report; suggest doc updates if routes drift.
B) P1 slice: add app/paths/[slug]/page.tsx + content-driven path detail stub; link from /paths.
C) Radio: content-only improvements to content/radioProduction.ts + copy (no Supabase).
D) Planning: outline Supabase migration for radio queue per PHATLIP_SUPABASE_SCHEMA.md — no prod secrets.

End with: files changed, commands run, build result, commit suggestion.
```

---

## 9. Completion report (this documentation pass)

| Item | Result |
|------|--------|
| **Objective** | New-thread protocol + handoff only — **no feature code changes** |
| **Output** | `ajax/docs/phatlip_NEW_THREAD_HANDOFF.md` (this file) |
| **Build** | Not run in this pass |
| **Next for Steve** | Paste **this file** into ChatGPT; pin Cursor workspace to `phatlip` for implementation |

---

## 10. What Steve should paste back into ChatGPT

```text
Lane: PhatLip only — H:\SOSWebsite\phatlip
I have read ajax/docs/phatlip_NEW_THREAD_HANDOFF.md (or the phatlip docs in repo order).

Goal: [verify build | /paths/[slug] stub | radio demo | docs sync | other — pick one]

Constraints:
- Do not modify RedDirt or ajax unless I explicitly say so.
- Follow PHATLIP_DATA_FIREWALL.md for any data or integration talk.
- npm run build must pass before merge to main/netlify.

Branch: [main | phatlip-buildout | other]

Report format: files changed, commands run, build/lint result, risks, suggested commit message.
```

---

*After major milestones, add a dated one-liner under §6 (branch tip, P1 auth on/off, Supabase live/staging).*
