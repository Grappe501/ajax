-- Public volunteer interest form → coordinator queue (admin-only read).

create table if not exists public.volunteer_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  zip_code text not null,
  help_event_volunteer boolean not null default false,
  help_petition_carrier boolean not null default false,
  help_church_outreach boolean not null default false,
  help_tabling boolean not null default false,
  help_phone_text boolean not null default false,
  help_hosting boolean not null default false,
  help_leadership boolean not null default false,
  notes text,
  source text not null default 'volunteer_page'
);

create index if not exists idx_volunteer_signups_created on public.volunteer_signups (created_at desc);

comment on table public.volunteer_signups is
  'Volunteer interest from /volunteer — public insert, campaign admins read.';

alter table public.volunteer_signups enable row level security;

create policy "volunteer_signups_insert_public"
  on public.volunteer_signups for insert
  to anon, authenticated
  with check (true);

create policy "volunteer_signups_select_admins"
  on public.volunteer_signups for select
  to authenticated
  using (public.is_campaign_admin(auth.uid()));
