-- Field canvassing: geocoded units for Jacksonville voter outreach (authenticated access only).
-- Import rows via Supabase SQL or service role; volunteers read through the app with RLS.

create table if not exists public.canvass_units (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  lat double precision not null,
  lng double precision not null,
  address_full text not null,
  ward_hint text,
  voter_first text,
  voter_last text,
  party text,
  precinct text,
  voter_file_id text,
  turf_tag text,
  notes text,
  is_demo boolean not null default false,
  constraint canvass_units_lat_range check (lat between -90 and 90),
  constraint canvass_units_lng_range check (lng between -180 and 180)
);

create index if not exists idx_canvass_units_lat_lng on public.canvass_units (lat, lng);

comment on table public.canvass_units is
  'Jacksonville field canvassing points. PII — use only under Arkansas voter-file rules; never expose publicly without auth.';

alter table public.canvass_units enable row level security;

-- Signed-in campaign volunteers only (same session as ward magic link).
create policy "canvass_units_select_authenticated"
  on public.canvass_units for select
  to authenticated
  using (true);

-- No client-side inserts; bulk load in the Supabase dashboard or with the service role.

-- Demo pins around Jacksonville, AR — clearly labeled in the UI.
insert into public.canvass_units (
  lat, lng, address_full, ward_hint, voter_first, voter_last, party, precinct,
  notes, is_demo
) values
  (
    34.8682, -92.1095,
    '[DEMO] 100 Example St — not a real voter',
    'Ward 1',
    'Sample',
    'Household',
    null,
    'DEMO-PCT',
    'Training pin: replace with imported voter rows.',
    true
  ),
  (
    34.8645, -92.1120,
    '[DEMO] 200 Practice Ave — not a real voter',
    'Ward 2',
    'Practice',
    'Route',
    null,
    'DEMO-PCT',
    'Use the sidebar to rehearse approach notes.',
    true
  ),
  (
    34.8708, -92.1078,
    '[DEMO] 300 Field Ln — not a real voter',
    'Ward 3',
    'Map',
    'Test',
    null,
    'DEMO-PCT',
    'Clustering loads more pins as you zoom and pan.',
    true
  );
