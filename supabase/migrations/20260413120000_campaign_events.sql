-- Public signature-collection events: volunteer submissions + central calendar.
-- Apply in Supabase SQL editor or: supabase db push
--
-- Ops: new volunteer inserts have review_status = 'pending'. Publish with:
--   update public.campaign_events set review_status = 'approved' where id = '<uuid>';
-- Mark training samples: is_demo = true (shows a Demo badge on the site).

create table if not exists public.campaign_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  event_kind text not null
    check (
      event_kind in (
        'sign_and_drive',
        'tabling',
        'house_party',
        'training',
        'canvass',
        'other'
      )
    ),
  starts_at timestamptz not null,
  ends_at timestamptz,
  location_label text not null,
  address text,
  ward_hint text,
  audience text,
  format_notes text,
  organizer_name text not null,
  organizer_email text not null,
  organizer_phone text,
  is_demo boolean not null default false,
  review_status text not null default 'pending'
    check (review_status in ('pending', 'approved', 'rejected')),
  constraint campaign_events_ends_after_start check (ends_at is null or ends_at >= starts_at)
);

create index if not exists idx_campaign_events_starts on public.campaign_events (starts_at);
create index if not exists idx_campaign_events_review on public.campaign_events (review_status);

comment on table public.campaign_events is
  'Signing and outreach events. Volunteers insert as pending; coordinators approve for the public calendar.';

alter table public.campaign_events enable row level security;

-- Public can only read approved rows (includes demo events once approved).
create policy "campaign_events_select_approved"
  on public.campaign_events for select
  to anon, authenticated
  using (review_status = 'approved');

-- Volunteers submit pending rows only; cannot self-publish or mark demo.
create policy "campaign_events_insert_volunteer"
  on public.campaign_events for insert
  to anon, authenticated
  with check (review_status = 'pending' and is_demo = false);

-- Demo / seed rows (run as migration owner — bypasses RLS).
insert into public.campaign_events (
  title,
  event_kind,
  starts_at,
  ends_at,
  location_label,
  address,
  ward_hint,
  audience,
  format_notes,
  organizer_name,
  organizer_email,
  organizer_phone,
  is_demo,
  review_status
)
values
  (
    '[DEMO] Example neighborhood signing table',
    'tabling',
    timestamptz '2026-04-26 15:00:00+00',
    timestamptz '2026-04-26 18:00:00+00',
    'Community center parking lot (fictional)',
    '123 Demo Lane, Jacksonville, AR (not a real address)',
    'Ward 1 (example)',
    'Neighbors collecting signatures together (sample copy).',
    'Clipboards, pens, and witness volunteers on site — demo only.',
    'Demo Coordinator',
    'hello@ajaxcampaign.org',
    null,
    true,
    'approved'
  ),
  (
    '[DEMO] Sign-and-drive window',
    'sign_and_drive',
    timestamptz '2026-05-10 18:00:00+00',
    timestamptz '2026-05-10 21:00:00+00',
    'Westside host curb lane (example)',
    'Illustrative location — not scheduled',
    'Ward 3 (example)',
    'Drivers pull through; volunteer verifies ID and witnesses — demo only.',
    'Cars queue on the right; materials staged on a table — demo only.',
    'Demo Coordinator',
    'hello@ajaxcampaign.org',
    null,
    true,
    'approved'
  );
