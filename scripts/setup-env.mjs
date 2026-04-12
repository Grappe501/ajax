/**
 * Interactive setup for .env.local (Supabase + site URL).
 * Run: npm run setup:env
 */
import { writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outFile = join(root, ".env.local");

const rl = createInterface({ input, output });

console.log("\nAJAX Volunteer Hub — environment setup\n");
console.log("Paste values from Supabase → Project Settings → API.\n");

const url = await rl.question(
  "NEXT_PUBLIC_SUPABASE_URL (https://xxxx.supabase.co): ",
);
const key = await rl.question(
  "NEXT_PUBLIC_SUPABASE_ANON_KEY (long jwt starting with eyJ): ",
);
const site =
  (await rl.question(
    "NEXT_PUBLIC_SITE_URL [http://localhost:3000]: ",
  )).trim() || "http://localhost:3000";

rl.close();

const lines = [
  "# Local secrets — gitignored. Created by npm run setup:env",
  `NEXT_PUBLIC_SUPABASE_URL=${url.trim()}`,
  `NEXT_PUBLIC_SUPABASE_ANON_KEY=${key.trim()}`,
  `NEXT_PUBLIC_SITE_URL=${site.trim()}`,
  "",
];

await writeFile(outFile, lines.join("\n"), "utf8");

console.log(`\nWrote ${outFile}`);
console.log("Restart the dev server (npm run dev) if it is already running.\n");
