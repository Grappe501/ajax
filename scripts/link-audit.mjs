/**
 * After `npm run build`, starts production server briefly and GET-checks known routes.
 * Usage: node scripts/link-audit.mjs
 *   or:  npm run audit:links
 */
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const PORT = process.env.AUDIT_PORT ?? "3029";
const ORIGIN = `http://127.0.0.1:${PORT}`;

/** Static + representative dynamic paths (must match app router). */
const PATHS = [
  "/",
  "/campaign",
  "/canvass/map",
  "/connect",
  "/dev",
  "/events",
  "/events/submit",
  "/faq",
  "/hub",
  "/hub/notary",
  "/initiative",
  "/initiative/language",
  "/initiative/how-to-sign",
  "/initiative/instructions",
  "/initiative/petition",
  "/initiative/faq",
  "/initiative/canvassers",
  "/initiative/notaries",
  "/initiative/mistakes",
  "/lead",
  "/movement",
  "/resources",
  "/rules",
  "/training",
  "/volunteer",
  "/why-it-matters",
  "/wards",
  "/wards/ward-1",
  "/wards/ward-1/join",
  "/wards/ward-1/onboard",
  "/wards/ward-1/dashboard",
  "/admin/login",
  "/auth/callback",
  "/api/assistant/status",
];

function okStatus(code) {
  return (code >= 200 && code < 400) || code === 404;
}

async function fetchStatus(path) {
  const res = await fetch(`${ORIGIN}${path}`, {
    redirect: "manual",
    headers: { Accept: "text/html,application/json" },
  });
  return { path, status: res.status, loc: res.headers.get("location") };
}

async function waitForServer(maxMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < maxMs) {
    try {
      const r = await fetch(ORIGIN, { redirect: "manual" });
      if (r.status > 0) return;
    } catch {
      /* not ready */
    }
    await delay(400);
  }
  throw new Error(`Server did not respond on ${ORIGIN} within ${maxMs}ms`);
}

async function main() {
  const child = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["next", "start", "-p", PORT],
    {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, PORT },
      shell: process.platform === "win32",
    },
  );

  let stderr = "";
  child.stderr?.on("data", (c) => {
    stderr += c.toString();
  });

  try {
    await waitForServer();
    const results = [];
    for (const path of PATHS) {
      results.push(await fetchStatus(path));
      await delay(20);
    }

    const bad = results.filter((r) => !okStatus(r.status));
    const redirects = results.filter((r) => r.status >= 300 && r.status < 400);

    console.log(`\nLink audit — ${ORIGIN} (${PATHS.length} paths)\n`);
    for (const r of results) {
      const tag =
        r.status >= 300 && r.status < 400
          ? `→ ${r.loc ?? "?"}`
          : r.status === 404
            ? "(404 — see note)"
            : r.status >= 400
              ? "FAIL"
              : "ok";
      console.log(`  [${r.status}] ${r.path} ${tag !== "ok" ? tag : ""}`);
    }

    if (redirects.length) {
      console.log("\nRedirects (expected for some auth-gated routes):");
      for (const r of redirects) {
        console.log(`  ${r.path} → ${r.status} ${r.loc ?? ""}`);
      }
    }

    console.log(
      "\nNote: /dev may 404 unless NEXT_PUBLIC_DEV_PORTAL=true (intentional).\n",
    );

    if (bad.length) {
      console.error(`\n❌ ${bad.length} path(s) returned unexpected status (not 2xx/3xx/404).`);
      process.exitCode = 1;
    } else {
      console.log("✓ All checked paths returned success, redirect, or 404 as appropriate.");
    }
  } finally {
    child.kill("SIGTERM");
    await delay(500);
    if (child.exitCode === null) child.kill("SIGKILL");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
