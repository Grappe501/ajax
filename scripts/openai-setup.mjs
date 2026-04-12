/**
 * Prompts for OpenAI API key, verifies with OpenAI (GET /v1/models), then saves OPENAI_API_KEY to .env.local.
 * Run: npm run setup:openai
 *
 * By default we always ask in the terminal (we do not read OPENAI_API_KEY from your shell unless you opt in).
 * CI / automation: npm run setup:openai -- --from-env   (requires OPENAI_API_KEY in the environment)
 */
import { readFile, writeFile } from "node:fs/promises";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env.local");

const useEnv = process.argv.includes("--from-env");

function mergeOpenAiKey(content, value) {
  const lines = content.split(/\r?\n/);
  let found = false;
  const next = lines.map((line) => {
    if (/^OPENAI_API_KEY=/.test(line)) {
      found = true;
      return `OPENAI_API_KEY=${value}`;
    }
    return line;
  });
  if (!found) {
    const body = next.join("\n").replace(/\s*$/, "");
    const prefix = body.length ? `${body}\n` : "";
    return `${prefix}OPENAI_API_KEY=${value}\n`;
  }
  return next.join("\n").replace(/\s*$/, "") + "\n";
}

let apiKey = "";

if (useEnv) {
  apiKey = process.env.OPENAI_API_KEY?.trim() ?? "";
  if (!apiKey) {
    console.error(
      "\n--from-env was set but OPENAI_API_KEY is missing or empty in the environment.\n",
    );
    process.exit(1);
  }
} else {
  const rl = createInterface({ input, output });
  console.log("\nOpenAI API key — paste your secret key (starts with sk-...)\n");
  apiKey = (await rl.question("OPENAI_API_KEY: ")).trim();
  rl.close();
  if (!apiKey) {
    console.error(
      "\nNo key entered. Run again and paste your key at the prompt.\n" +
        "For automation only: npm run setup:openai -- --from-env (with OPENAI_API_KEY set).\n",
    );
    process.exit(1);
  }
}

console.log("\nVerifying key with OpenAI (GET /v1/models)...\n");

const res = await fetch("https://api.openai.com/v1/models", {
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

if (!res.ok) {
  const errText = await res.text();
  console.error(`Request failed: ${res.status} ${res.statusText}`);
  console.error(errText.slice(0, 500));
  console.error("\n.env.local was not updated.\n");
  process.exit(1);
}

const data = await res.json();
const count = Array.isArray(data.data) ? data.data.length : 0;
console.log(`OK — key is valid (${count} models visible to this key).\n`);

let existing = "";
try {
  existing = await readFile(envPath, "utf8");
} catch {
  existing = "";
}

await writeFile(envPath, mergeOpenAiKey(existing, apiKey), "utf8");
console.log(`Wrote OPENAI_API_KEY to ${envPath}`);
console.log("Restart the dev server if it was already running.\n");
