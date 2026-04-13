-- Campaign admins: approvals, privileges, audit trail for event review.
-- Bootstrap: insert your first admin after you know their auth.users.id:
--   insert into public.campaign_admins (user_id, role) values ('<uuid>', 'owner');

create table if not exists public.campaign_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'coordinator', 'analyst')),
  label text,
  created_at timestamptz not null default now(),
  invited_by uuid references auth.users (id)
);

comment on table public.campaign_admins is
  'Privileged dashboard users. Only owners should grant new admins (via SQL or future invite flow).';

create index if not exists idx_campaign_admins_role on public.campaign_admins (role);

-- Bypasses RLS — use in policies only.
create or replace function public.is_campaign_admin(check_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.campaign_admins a where a.user_id = check_uid
  );
$$;

revoke all on function public.is_campaign_admin(uuid) from public;
grant execute on function public.is_campaign_admin(uuid) to anon, authenticated;

alter table public.campaign_admins enable row level security;

create policy "campaign_admins_select_own_or_peer"
  on public.campaign_admins for select
  to authenticated
  using (
    auth.uid() = user_id
    or public.is_campaign_admin(auth.uid())
  );

-- Admins can read/update all events (moderation).
create policy "campaign_events_admin_select"
  on public.campaign_events for select
  to authenticated
  using (public.is_campaign_admin(auth.uid()));

create policy "campaign_events_admin_update"
  on public.campaign_events for update
  to authenticated
  using (public.is_campaign_admin(auth.uid()))
  with check (public.is_campaign_admin(auth.uid()));

-- Optional: coordinators publish events created in-dashboard later.
create policy "campaign_events_admin_insert"
  on public.campaign_events for insert
  to authenticated
  with check (public.is_campaign_admin(auth.uid()));

alter table public.campaign_events
  add column if not exists review_note text,
  add column if not exists reviewed_at timestamptz,
  add column if not exists reviewed_by uuid references auth.users (id);

comment on column public.campaign_events.review_note is 'Shown only in admin; optional rejection or internal note.';
