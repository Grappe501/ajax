# AJAX agent platform — omniscience, data access, and dashboard agents

This document defines how **Ajax** becomes the campaign’s primary AI while staying **safe, lawful, and trustworthy** — and how **specialized named agents** attach to dashboards with tools (not raw database prompts).

## Core principle: there is no “one prompt that knows everything”

True omniscience in product terms means:

1. **Retrieval** — the model can pull facts from **approved sources** (site content, FAQ, uploaded handbooks, structured snippets).
2. **Tools** — the model can call **server-defined functions** that enforce **auth, row-level security (RLS), and field allowlists** (e.g. search voters in *my* ward only).
3. **Refusal boundaries** — voter PII, legal interpretation, and irreversible writes never flow through a single unauthenticated chat box.

Public marketing Ajax and authenticated “power” Ajax are **different trust tiers**, not one endpoint with a longer system prompt.

---

## Trust tiers (must stay explicit)

| Tier | Who | Data scope | Example surfaces |
|------|-----|------------|------------------|
| **T0 — Public** | Anonymous visitor | **No** voter DB, **no** PII. Ground on static/FAQ content only. | Homepage assistant dock, `/faq` |
| **T1 — Authenticated volunteer** | Logged-in user | **Scoped** by role/ward/org. Tools may read **only** what RLS allows. | Ward dashboard, future phone bank |
| **T2 — Lead / ward captain** | Elevated role | Broader read, still RLS. Writes often **pending** or audited. | Ward tools, approvals queue |
| **T3 — Campaign admin** | Admin session | Admin tables, exports, co-pilot. Still **no** “run arbitrary SQL from the model.” | `/admin/*` |

**Rule:** Never attach “all Supabase tables” to a model context string. Expose **tools** that run **your** queries with **session identity** baked in.

---

## How Ajax “knows the whole site”

### 1. Content corpus (marketing truth)

Already aligned: FAQ injected into `/api/assistant` via `getAssistantSystemContent()` in `content/assistant-knowledge.ts`.

**Extend:**

- Auto-include or periodically sync: initiative copy, rules summaries, training blurbs, `content/*.ts` marketing copy, key `/resources` text.
- Optional later: **vector store** (Supabase `pgvector` or hosted) for long PDFs — chunk + cite.

### 2. Structured “law & process” pack (human-curated)

Dense statutes and procedures should live as **versioned documents** (e.g. `content/legal-reference.ts` or DB rows with `source_url`, `effective_date`).

The model answers from **excerpts + citations**, not from memory.

### 3. Database = tools, not prompts

For voter/organizing data (e.g. `voter_directory_entries`, `reach_out_list_items`, `search_voter_directory`):

- Define **tools** such as:
  - `search_voters_in_my_ward(query)` → calls existing server action / RPC with **ward gate** (see `lib/reach/actions.ts` patterns).
  - `my_reach_list_summary()` → aggregates allowed columns only.
  - `pending_approvals_count()` → admin scope.

Implementation pattern in Next.js:

- **Route handlers** or **server actions** validate session → call Supabase with RLS → return JSON to the model as **tool results**.
- Use OpenAI **function calling** / **Responses API tools** (choose one stack and standardize).

**Never:** pass full table dumps into the system prompt.

---

## Roadmap: “omniscient for volunteers”

### Phase 1 — Grounding (now → near term)

- Expand **site + FAQ** grounding (already started).
- Add **citation habit**: answers should reference page names or FAQ sections where possible.

### Phase 2 — Tool-using Ajax (authenticated)

- New API: e.g. `POST /api/assistant/volunteer` (cookie/session) with **tool definitions**.
- Tools wrap existing `lib/reach/*`, `lib/admin/*` patterns — **small surface area first** (search + list summaries).

### Phase 3 — RAG for long docs

- Ingest PDFs/handbooks; retrieve top-k chunks; answer with citations.

### Phase 4 — Dashboard-native agents

- Embed a **panel component** per dashboard with:
  - **Persona prompt** (specialist).
  - **Allowed tools** for that surface only.
  - **Audit log** (who asked what; no silent voter field updates).

---

## Named agents (roster + suggested specialization)

**Brand rule:** **Ajax** remains the umbrella campaign identity on public and high-level volunteer UX. Specialized agents are **product names** for scoped assistants (like Copilot “modes”), not separate brands unless you want them to be.

| Name | Suggested role | Suggested dashboard / surface | Tool themes |
|------|----------------|------------------------------|-------------|
| **Ajax** | Campaign-wide guide; petition; FAQ; navigation | Marketing + default volunteer entry | Content RAG, links, generic volunteer help |
| **Comet** | Fast mover; call-centric, short punchy help | Future **phone bank** / rapid outreach | Scripts, disposition tags, **no** raw export of full voter file |
| **Agent409** | “Cut through grime” — hygiene of data | **Reconciler** / dedupe / data quality | Match explanations, duplicate flags, **read-only** profile slices |
| **Piney** | Grounded, local, place-based | **Ward** organizer dashboard | Ward map context, turf, neighborly tone; ward-scoped search tools |
| **Ivory** | Clean handoffs, gentle precision | **Approvals** / QC | Queue summaries, checklist language, **no** approval without human click |
| **Dawn** | Fresh start, onboarding clarity | **Volunteers** / onboarding | Signup flow, training pointers, role explanations |

### If you need more names (cleaning / clarity theme)

Use **generic** words to reduce trademark issues: **Polish**, **Rinse**, **Buff**, **Scrub**, **Spark**, **Clarity**, **Sheen**, **Filter**, **Sweep**, **Sanitize** (as code names, not product claims).

---

## Security and governance (non-negotiable)

1. **PII minimization** — Tools return **only** columns needed for the task; redact in logs.
2. **Human-in-the-loop** — Voice or AI must not **silently** update voter fields; match your existing “pending approval” patterns.
3. **Legal** — Same as FAQ assistant: no individualized legal advice; cite official sources for process.
4. **Rate limits & abuse** — Authenticated endpoints get stricter quotas and audit trails.

---

## Technical stack alignment (this repo)

- **OpenAI** — chat + future STT/cleanup (`OPENAI_API_KEY`).
- **ElevenLabs** — TTS (`/api/assistant/speech`, `ELEVENLABS_*`).
- **Supabase** — auth + RLS; RPC e.g. `search_voter_directory`.
- **Next.js** — route handlers + server actions for tools.

---

## Definition of done (platform)

- [ ] Public Ajax: grounded on all major static content + FAQ (expand corpus).
- [ ] Volunteer Ajax (auth): at least **one** real tool (e.g. ward voter search) behind RLS.
- [ ] Admin/co-pilot: documented tool boundaries (may already partially exist).
- [ ] Per-dashboard agent **shell** (UI + persona + tool allowlist) on **one** pilot dashboard.
- [ ] Audit logging design for sensitive tools.

---

## Related specs

- `ajax-voice-system.md` — voice capture, STT, cleanup, TTS, phases A–E.
- `ward-council-contact.md` — resident–council workflow (separate trust domain).
