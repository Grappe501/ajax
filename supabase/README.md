# Supabase schema (AJAX)

This folder includes **`config.toml`** (from `supabase init`) so the Supabase CLI knows where migrations live. Apply migrations **in filename order** so foreign keys and policies line up.

| Order | File | Purpose |
| --- | --- | --- |
| 1 | `20260412120000_ward_organizing.sql` | `ward_organizers`, leaderboard RPCs, RLS |
| 2 | `20260413120000_campaign_events.sql` | `campaign_events`, public calendar RLS, demo events |
| 3 | `20260413140000_canvass_units.sql` | `canvass_units`, map demo pins |
| 4 | `20260413160000_campaign_admins.sql` | `campaign_admins`, admin policies on events |
| 5 | `20260415120000_volunteer_signups.sql` | `volunteer_signups` — public insert, admins read |
| 6 | `20260416120000_power_of_five_reach.sql` | Reach / “power of five” organizer metrics |
| 7 | `20260418120000_voice_transcripts.sql` | Voice transcript storage (optional features) |

## CLI: link once, then push (hosted project)

Requires [Supabase CLI](https://supabase.com/docs/guides/cli) (`npx supabase` works).

1. **Log in** (browser): `npx supabase login`
2. **Link** this repo to your hosted project (Dashboard → **Project Settings → General** → *Reference ID*):
   ```bash
   npx supabase link --project-ref <your-project-ref>
   ```
   Use the database password when prompted (or reset it under **Project Settings → Database**).
3. **Apply pending migrations** to the linked remote:
   ```bash
   npm run db:push
   ```
   Preview: `npm run db:push -- --dry-run`

If `db push` reports conflicts with manual SQL already applied, resolve in the Dashboard migration history or use `supabase migration repair` per [Supabase docs](https://supabase.com/docs/guides/cli/managing-environments).

## Apply on hosted Supabase (manual)

1. **Dashboard → SQL Editor → New query**
2. Paste each file **in order**, run, confirm success.
3. Same order as the table above (CLI `db push` uses the same files under `migrations/`).

**Note:** `ward_organizing.sql` creates the `ward_organizers` table *before* any function that references it. If you ever see `relation "ward_organizers" does not exist` on the first function in an old copy of the file, replace the file with the current repo version and run it again (or run the full corrected migration from a clean database).

## Environment (Next.js)

Set in Netlify / `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, if you use service scripts)

Without these, the app shows the Supabase notice instead of ward/admin dashboards.

## Bootstrap first campaign admin

After you can read `auth.users` (or copy a user id from **Authentication → Users**):

```sql
insert into public.campaign_admins (user_id, role, label)
values ('<your-auth-user-uuid>', 'owner', 'Bootstrap');
```

Then `/admin` routes and co-pilot pulse queries work for that account.

## Ward organizer dashboard

Requires migrations (1) applied. Users sign in with magic link, complete `/wards/[slug]/onboard`, then `/wards/[slug]/dashboard` loads stats from `ward_organizers`.
