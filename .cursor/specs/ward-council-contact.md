# Ward council contact system — Cursor spec

This document defines how to implement **resident-to-city-council** contact features safely, separately from **volunteer-to-voter** organizing. Use it when adding UI, APIs, and database tables.

## Goals

- Show each verified resident **their ward** and **two current councilmembers** (Jacksonville: 5 wards × 2 positions).
- Prefer **official phone numbers** from verified city sources; add **email only after manual verification** (do not scrape or guess emails).
- Route outbound communication through **draft → admin approval → send/logging**, never “volunteer sends as resident.”
- Keep **organizing** (phone banks, invites, follow-up) distinct from **resident-authored council contact**.

## Non-goals (initial phases)

- Impersonation of residents by volunteers or staff.
- Auto-populating councilmember email from unofficial or unverified sources.
- Sending mail without approval when using campaign infrastructure.

## Data model

### `ward_officials`

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid | PK |
| `ward_number` | int | 1–5 |
| `position_number` | int | 1 or 2 |
| `official_name` | text | As on official directory |
| `title` | text | e.g. “Councilmember” |
| `phone` | text | E.164 or normalized display; required when published |
| `email` | text, nullable | Only if verified |
| `email_verified` | boolean | Default false |
| `source_url` | text | Page used for verification |
| `source_last_checked` | timestamptz | Refresh cadence (e.g. quarterly) |
| `is_active` | boolean | Soft-delete when terms change |

**Constraint:** unique `(ward_number, position_number)` where `is_active`.

### `official_contact_templates`

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid | PK |
| `ward_number` | int, nullable | Null = all wards |
| `issue_type` | text | Campaign taxonomy |
| `channel` | enum | `email` \| `text` |
| `title` | text | Admin-facing + resident hint |
| `body` | text | Placeholders: `{{ward}}`, `{{resident_name}}`, `{{councilmember_name}}`, etc. |
| `active` | boolean | |

### `resident_contact_drafts`

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid | PK |
| `voter_id` | uuid | FK to voter/resident record |
| `ward_number` | int | Denormalized for queries |
| `councilmember_id` | uuid, nullable | FK `ward_officials` |
| `channel` | enum | `email` \| `text` |
| `draft_text` | text | |
| `template_id` | uuid, nullable | FK `official_contact_templates` |
| `created_by_user_id` | uuid | Resident or helper; audit |
| `approval_status` | enum | `pending` \| `approved` \| `rejected` \| `revision` |
| `approved_by_user_id` | uuid, nullable | |
| `approved_at` | timestamptz, nullable | |
| `sent_at` | timestamptz, nullable | |

Indexes: `(approval_status, created_at)`, `(voter_id)`.

## Verification gate (before showing contact tools)

Show “Contact your councilmembers” only when **all** hold:

1. Address/voter match places the person **inside Jacksonville city limits** (per product rules).
2. Ward assignment matches the **same ward** as the page/context.
3. Match confidence ≥ threshold (define in config, e.g. score or manual confirm).

Otherwise show a single recovery path: **“We couldn’t verify your ward yet. Please confirm your address.”** with the existing address-confirmation flow.

## Ward page — UI blocks

1. **Ward header** — existing ward name/summary/captain.
2. **Your current councilmembers** — card list:
   - Name, position (Ward *N*, Position *P*), phone (click-to-call on mobile).
   - Email line: show only if `email_verified`; else “Email — pending verification” or omit line.
   - Short line: “These are your current city council representatives.”
3. **Contact module** (gated):
   - Actions: Draft email · Prepare text · Read suggested script · Request help (routes to coordinator/volunteer-assisted drafting, still draft-first).
4. **Explainer** — “Why contact matters” (respectful, clear, non-partisan tone).

## Role behaviors

| Role | Allowed |
|------|--------|
| Verified resident | Create drafts from templates; submit for approval; after approval, send via app or copy out per channel policy. |
| Volunteer | Invite residents to use the tool; **help draft** in-app; **cannot** send as resident or skip approval. |
| Ward leader | Manage templates scoped to ward (where permitted); queue drafts for approval. |
| Admin | Approve / edit / reject / request revision; audit log. |

## Approval workflow

1. Resident opens ward page (verified).
2. Chooses channel + issue; system builds draft from template + placeholders.
3. Draft saved with `approval_status = pending`.
4. Admin reviews queue (`/admin/approvals` or dedicated queue).
5. On approve: unlock send (email via campaign mailer, or “copy text” / SMS prep per product); set `approved_at`, `sent_at` when actually sent.
6. All state transitions logged (who/when).

## Separation: A vs B

- **A — Resident-to-council:** This spec. Drafts, approval, resident identity.
- **B — Volunteer organizing:** Existing outreach/volunteer flows; **no** sending council mail “as” the resident.

## Phasing

| Phase | Scope |
|-------|--------|
| **1** | Ward page: two officials, phones only, email pending state; draft UI; admin approval queue; templates table minimal. |
| **2** | Verified emails in `ward_officials`; personalization; send logging; ward-leader template management. |
| **3** | Contact history per official; optional AI assist; issue paths; call script coaching. |

## Official data refresh

- Document `source_url` and `source_last_checked` on each row.
- Re-verify on a schedule (e.g. quarterly) or when city publishes updates; mark `is_active` false when terms change; never overwrite phones without a logged check.

## Open questions for implementation

- Exact voter/ward match schema in this repo (Supabase tables) — map `voter_id` and confidence fields to this spec.
- Email send provider (transactional vs campaign) and whether “send” is in-app or export-only for v1.
- Whether `/admin/approvals` should subsume draft approvals or get a filtered view.

---

**Reference (verification):** Council roster and phones should be reconciled with the [City of Jacksonville AR staff/directory](https://www.cityofjacksonville.net/) (or current official directory URL stored in `source_url`). Do not ship unverified email addresses.
