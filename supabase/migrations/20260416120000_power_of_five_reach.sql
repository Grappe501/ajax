-- Power of 5: ward voter directory (imported), personal reach lists, outreach queue (admins send via SendGrid/Twilio later).

create table if not exists public.voter_directory_entries (
  id uuid primary key default gen_random_uuid(),
  ward_slug text not null,
  display_name text not null,
  address_line text,
  city text default 'Jacksonville',
  zip text,
  phone text,
  email text,
  created_at timestamptz not null default now()
);

create index if not exists idx_voter_directory_ward on public.voter_directory_entries (ward_slug);
create index if not exists idx_voter_directory_ward_name on public.voter_directory_entries (ward_slug, lower(display_name));

comment on table public.voter_directory_entries is
  'Campaign-imported voter rows for ward-scoped lookup. Organizers search only their ward.';

create table if not exists public.reach_out_list_items (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.ward_organizers (id) on delete cascade,
  voter_directory_entry_id uuid references public.voter_directory_entries (id) on delete set null,
  display_name text not null,
  address_line text,
  city text,
  zip text,
  phone text,
  email text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists idx_reach_out_organizer on public.reach_out_list_items (organizer_id);

create table if not exists public.outreach_queue (
  id uuid primary key default gen_random_uuid(),
  organizer_id uuid not null references public.ward_organizers (id) on delete cascade,
  reach_out_list_item_id uuid references public.reach_out_list_items (id) on delete cascade,
  channel text not null check (channel in ('email', 'sms')),
  message_subject text,
  message_body text not null,
  contact_phone text,
  contact_email text,
  status text not null default 'pending' check (status in ('pending', 'sent', 'cancelled')),
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  sent_by uuid references auth.users (id),
  admin_note text
);

create index if not exists idx_outreach_queue_status on public.outreach_queue (status, created_at desc);

comment on table public.outreach_queue is
  'Volunteers queue suggested copy and contacts; only campaign admins send (SendGrid/SMS integration TBD).';

alter table public.voter_directory_entries enable row level security;
alter table public.reach_out_list_items enable row level security;
alter table public.outreach_queue enable row level security;

-- Voter directory: ward organizers see their ward; admins see all.
create policy "voter_directory_select_ward_or_admin"
  on public.voter_directory_entries for select
  to authenticated
  using (
    public.is_campaign_admin(auth.uid())
    or exists (
      select 1 from public.ward_organizers wo
      where wo.auth_user_id = auth.uid()
        and wo.ward_slug = voter_directory_entries.ward_slug
    )
  );

-- Reach list: own rows + admins.
create policy "reach_out_select_own_or_admin"
  on public.reach_out_list_items for select
  to authenticated
  using (
    public.is_campaign_admin(auth.uid())
    or organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  );

create policy "reach_out_insert_own"
  on public.reach_out_list_items for insert
  to authenticated
  with check (
    organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  );

create policy "reach_out_update_own"
  on public.reach_out_list_items for update
  to authenticated
  using (
    organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  )
  with check (
    organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  );

create policy "reach_out_delete_own"
  on public.reach_out_list_items for delete
  to authenticated
  using (
    organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  );

-- Outreach queue: organizers insert and read own; admins read/update all.
create policy "outreach_queue_select_own_or_admin"
  on public.outreach_queue for select
  to authenticated
  using (
    public.is_campaign_admin(auth.uid())
    or organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  );

create policy "outreach_queue_insert_own"
  on public.outreach_queue for insert
  to authenticated
  with check (
    organizer_id in (select id from public.ward_organizers where auth_user_id = auth.uid())
  );

create policy "outreach_queue_update_admin"
  on public.outreach_queue for update
  to authenticated
  using (public.is_campaign_admin(auth.uid()))
  with check (public.is_campaign_admin(auth.uid()));

grant select on public.voter_directory_entries to authenticated;
grant select, insert, update, delete on public.reach_out_list_items to authenticated;
grant select, insert on public.outreach_queue to authenticated;
grant update on public.outreach_queue to authenticated;

-- Search helper (avoids fragile client-side .or() quoting); enforces ward access.
create or replace function public.search_voter_directory(p_ward text, p_q text, p_limit int)
returns setof public.voter_directory_entries
language sql
stable
security definer
set search_path = public
as $$
  select v.*
  from public.voter_directory_entries v
  where v.ward_slug = p_ward
    and length(trim(coalesce(p_q, ''))) >= 2
    and (
      public.is_campaign_admin(auth.uid())
      or exists (
        select 1 from public.ward_organizers wo
        where wo.auth_user_id = auth.uid()
          and wo.ward_slug = p_ward
      )
    )
    and (
      v.display_name ilike '%' || trim(p_q) || '%'
      or v.address_line ilike '%' || trim(p_q) || '%'
      or v.zip = trim(p_q)
    )
  order by v.display_name asc
  limit least(greatest(coalesce(p_limit, 25), 1), 100);
$$;

revoke all on function public.search_voter_directory(text, text, int) from public;
grant execute on function public.search_voter_directory(text, text, int) to authenticated;
