# AJAX — Jacksonville campaign site

Next.js app for the **Jacksonville** municipal campaign (ward-based representation). This repository is **separate** from **RedDirt** (`Grappe501/reddirt`) — different Netlify site, env vars, and domain.

## Narrative model

Public pages follow a **city-site story spine** (conviction → how we operate → concrete actions) without labeling frameworks on the UI. See [`docs/CITY_SITE_MODEL.md`](docs/CITY_SITE_MODEL.md) and [`content/city-narrative.ts`](content/city-narrative.ts).

## Git branches & Netlify

| Branch | Intended use |
|--------|----------------|
| **`main`** | Day-to-day development; merge PRs here. |
| **`netlify`** | Production deploy ref for Netlify (optional — you can also deploy from `main`). |

**Netlify:** create a site linked to **`Grappe501/ajax`**, set **base directory** to repo root (this app is the repo root), install command `npm install`, build `npm run build`, publish `.next` per Next/Netlify plugin. Set **`NEXT_PUBLIC_SITE_URL`** to this site’s URL.

To create or update the deploy branch locally:

```bash
git checkout main
git pull
git checkout -b netlify   # skip if branch exists
git merge main          # if netlify already existed behind main
git push -u origin netlify
```

## Firewall vs. RedDirt

[`docs/ajax-reddirt-firewall.md`](docs/ajax-reddirt-firewall.md)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
