/**
 * One-glance health check: tooling versions + which env keys are set (no secrets printed).
 * Run: npm run status
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env.local");

function parseEnv(text) {
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    const v = t.slice(i + 1).trim();
    out[k] = v;
  }
  return out;
}

function mask(s) {
  if (!s) return "(empty)";
  if (s.length <= 8) return "****";
  return `${s.slice(0, 4)}…${s.slice(-4)} (${s.length} chars)`;
}

const pkg = JSON.parse(await readFile(join(root, "package.json"), "utf8"));

let env = {};
try {
  env = parseEnv(await readFile(envPath, "utf8"));
} catch {
  console.log(".env.local: not found (run npm run setup:env)\n");
}

console.log("AJAX — project status\n");
console.log(`Node:     ${process.version}`);
console.log(`App:      ${pkg.name}@${pkg.version}`);
console.log(`Next:     ${pkg.dependencies?.next ?? "—"}`);

console.log("\nEnvironment (.env.local keys, values masked):");
const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SITE_URL",
  "OPENAI_API_KEY",
];
for (const k of keys) {
  const v = env[k];
  const ok = Boolean(v && String(v).trim());
  console.log(`  ${ok ? "[set]" : "[missing]"} ${k}: ${ok ? mask(v) : "(not set)"}`);
}

const openai = env.OPENAI_API_KEY?.trim();
if (openai) {
  console.log("\nOpenAI API check (GET /v1/models)…");
  const res = await fetch("https://api.openai.com/v1/models", {
    headers: { Authorization: `Bearer ${openai}` },
  });
  if (res.ok) {
    const data = await res.json();
    const n = Array.isArray(data.data) ? data.data.length : 0;
    console.log(`  OK — ${n} models available to this key.`);
  } else {
    console.log(`  Failed — ${res.status} ${res.statusText}`);
  }
} else {
  console.log("\nOpenAI: skipped (no OPENAI_API_KEY in .env.local)");
}

const url = env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const supabaseOk = Boolean(url && anon);
console.log(
  `\nSupabase client (browser): ${supabaseOk ? "configured" : "incomplete — add URL + anon key"}`,
);

console.log("\nDev: npm run dev   → http://localhost:3000 (or next free port)\n");
