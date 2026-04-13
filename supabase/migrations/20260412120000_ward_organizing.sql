-- AJAX relational organizing: Power-of-5 tree per ward, leaderboard-ready.
-- Apply in Supabase SQL editor or: supabase db push
--
-- Table and triggers MUST exist before functions that reference ward_organizers.

create table if not exists public.ward_organizers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null references auth.users (id) on delete cascade,
  ward_slug text not null,
  display_name text not null,
  parent_id uuid references public.ward_organizers (id) on delete set null,
  commitment_goal smallint not null default 5
    check (commitment_goal > 0 and commitment_goal <= 50),
  referral_code text not null unique default substring(replace(gen_random_uuid()::text, '-', '') from 1 for 8),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (auth_user_id, ward_slug)
);

create index if not exists idx_ward_organizers_ward on public.ward_organizers (ward_slug);
create index if not exists idx_ward_organizers_parent on public.ward_organizers (parent_id);
create index if not exists idx_ward_organizers_auth on public.ward_organizers (auth_user_id);

create or replace function public.ward_organizers_same_ward_parent()
returns trigger
language plpgsql
as $$
begin
  if new.parent_id is not null then
    if (select ward_slug from public.ward_organizers where id = new.parent_id) is distinct from new.ward_slug then
      raise exception 'Parent must belong to the same ward';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_ward_organizers_parent_ward on public.ward_organizers;
create trigger trg_ward_organizers_parent_ward
  before insert or update on public.ward_organizers
  for each row execute function public.ward_organizers_same_ward_parent();

create or replace function public.touch_ward_organizers_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_ward_organizers_updated on public.ward_organizers;
create trigger trg_ward_organizers_updated
  before update on public.ward_organizers
  for each row execute function public.touch_ward_organizers_updated_at();

-- Depends on ward_organizers existing (recursive descendant count).
create or replace function public.organizer_descendant_count(p_id uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  with recursive down as (
    select id, parent_id
    from public.ward_organizers
    where parent_id = p_id
    union all
    select c.id, c.parent_id
    from public.ward_organizers c
    inner join down d on c.parent_id = d.id
  )
  select coalesce((select count(*)::int from down), 0);
$$;

-- Public leaderboard via RPC (no auth_user_id exposure to clients)
create or replace function public.get_ward_leaderboard(p_ward_slug text, p_limit int default 25)
returns table (
  id uuid,
  display_name text,
  referral_code text,
  direct_recruits integer,
  downstream_total integer,
  commitment_goal smallint,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    w.id,
    w.display_name,
    w.referral_code,
    (select count(*)::int from public.ward_organizers c where c.parent_id = w.id) as direct_recruits,
    public.organizer_descendant_count(w.id) as downstream_total,
    w.commitment_goal,
    w.created_at
  from public.ward_organizers w
  where w.ward_slug = p_ward_slug
  order by public.organizer_descendant_count(w.id) desc, w.created_at asc
  limit greatest(1, least(p_limit, 100));
$$;

revoke all on function public.get_ward_leaderboard(text, int) from public;
grant execute on function public.get_ward_leaderboard(text, int) to anon, authenticated;

create or replace function public.get_ward_team_stats(p_ward_slug text)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'organizer_count', (select count(*)::int from public.ward_organizers w where w.ward_slug = p_ward_slug),
    'new_this_week', (
      select count(*)::int from public.ward_organizers w
      where w.ward_slug = p_ward_slug
        and w.created_at >= (now() - interval '7 days')
    )
  );
$$;

revoke all on function public.get_ward_team_stats(text) from public;
grant execute on function public.get_ward_team_stats(text) to anon, authenticated;

alter table public.ward_organizers enable row level security;

create policy "ward_organizers_select_authenticated"
  on public.ward_organizers for select
  to authenticated
  using (true);

create policy "ward_organizers_insert_own"
  on public.ward_organizers for insert
  to authenticated
  with check (auth.uid() = auth_user_id);

create policy "ward_organizers_update_own"
  on public.ward_organizers for update
  to authenticated
  using (auth.uid() = auth_user_id)
  with check (auth.uid() = auth_user_id);

comment on table public.ward_organizers is 'Relational organizing tree: one row per auth user per ward (Power of 5).';

grant execute on function public.organizer_descendant_count(uuid) to authenticated;
