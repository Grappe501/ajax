-- AJAX extended organizing: comms ledger, officials, FOIA chunks, petition crosswalk.
-- RLS and service policies to be added per environment.

-- Comms vendor costs (Twilio, SendGrid, etc.) — billable = vendor_cost_usd * (1 + markup).
create table if not exists public.comms_vendor_ledger (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  period_start date not null,
  period_end date,
  channel text not null check (channel in ('sms', 'voice', 'email', 'other')),
  vendor text not null,
  vendor_cost_usd numeric(12, 4) not null,
  markup_pct numeric(5, 4) not null default 0.25,
  billable_usd numeric(12, 4) generated always as (vendor_cost_usd * (1 + markup_pct)) stored,
  ward_slug text,
  organizer_id uuid,
  meta jsonb default '{}'::jsonb
);

create index if not exists comms_vendor_ledger_period_idx on public.comms_vendor_ledger (period_start desc);

-- Municipal officials (stance is editorial; validate in app).
create table if not exists public.jacksonville_official (
  slug text primary key,
  name text not null,
  office text not null check (office in ('mayor', 'council')),
  ward_label text,
  position_code text,
  years_in_office_note text,
  stance text not null default 'unknown' check (stance in ('for', 'against', 'unknown', 'no_response')),
  stance_editorial_note text,
  summary text,
  news_json jsonb default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Survey answers (email workflow — not public form).
create table if not exists public.official_survey_response (
  id uuid primary key default gen_random_uuid(),
  official_slug text not null references public.jacksonville_official (slug) on delete cascade,
  question_key text not null,
  answer_text text not null,
  received_at timestamptz not null default now(),
  publish_ok boolean not null default false,
  unique (official_slug, question_key)
);

-- FOIA documents + chunks for RAG / dashboards.
create table if not exists public.foia_document (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  source_agency text,
  received_at date,
  storage_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.foia_chunk (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.foia_document (id) on delete cascade,
  chunk_index int not null,
  content text not null,
  unique (document_id, chunk_index)
);

create index if not exists foia_chunk_document_idx on public.foia_chunk (document_id);

-- Crosswalk: anyone who signed tracked petitions (Jacksonville) — match to voter_id when available.
create table if not exists public.petition_signer_crosswalk (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  ward_slug text,
  display_name text,
  source_petition text not null,
  signed_at date,
  voter_id text,
  match_confidence text,
  notes text
);

create index if not exists petition_crosswalk_ward_idx on public.petition_signer_crosswalk (ward_slug);
create index if not exists petition_crosswalk_voter_idx on public.petition_signer_crosswalk (voter_id);

-- Interaction log (for voter profile build — export scoring-only to Peoplebase per policy).
create table if not exists public.constituent_interaction (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  voter_id text,
  ward_slug text,
  channel text not null,
  direction text check (direction in ('inbound', 'outbound')),
  summary text not null,
  organizer_id uuid,
  meta jsonb default '{}'::jsonb
);

create index if not exists constituent_interaction_voter_idx on public.constituent_interaction (voter_id);

-- Faith institution directory (API / manual enrichment).
create table if not exists public.faith_institution (
  id uuid primary key default gen_random_uuid(),
  ward_slug text,
  name text not null,
  denomination text,
  address_line text,
  public_phone text,
  public_email text,
  pastor_name text,
  source text,
  updated_at timestamptz not null default now()
);

create index if not exists faith_institution_ward_idx on public.faith_institution (ward_slug);
