-- Voice pipeline audit trail (optional persistence). App can insert after user confirms.

create table if not exists public.voice_transcripts (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users (id) on delete cascade,
  context_type text not null default 'note',
  context_id text,
  mode text,
  raw_transcript text,
  cleaned_transcript text,
  structured_output_json jsonb,
  confidence_score numeric,
  flagged_terms_json jsonb,
  duration_seconds numeric,
  created_at timestamptz not null default now()
);

create index if not exists idx_voice_transcripts_user_created
  on public.voice_transcripts (auth_user_id, created_at desc);

comment on table public.voice_transcripts is
  'Optional storage for voice note transcripts after human review; not required for ephemeral dictation.';

alter table public.voice_transcripts enable row level security;

create policy "voice_transcripts_select_own"
  on public.voice_transcripts for select
  to authenticated
  using (auth.uid() = auth_user_id);

create policy "voice_transcripts_insert_own"
  on public.voice_transcripts for insert
  to authenticated
  with check (auth.uid() = auth_user_id);
