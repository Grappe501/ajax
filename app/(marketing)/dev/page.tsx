"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { Card } from "@/components/ui/card";
import { wards } from "@/content/wards";

export default function DevPortalPage() {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function postSession(body: { admin?: boolean; wardSlug?: string | null }) {
    setPending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/dev/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        setMsg("Session API refused (is dev portal enabled?)");
        return;
      }
      setMsg("Saved. Use the links below.");
      router.refresh();
    } catch {
      setMsg("Network error.");
    } finally {
      setPending(false);
    }
  }

  async function clearSession() {
    setPending(true);
    await fetch("/api/dev/session", { method: "DELETE" });
    setMsg("Cleared dev cookies.");
    router.refresh();
    setPending(false);
  }

  const demoWard = wards[0]?.slug ?? "ward-1";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Development only</p>
      <h1 className="font-display mt-2 text-3xl font-bold text-foreground">Preview &amp; dummy logins</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        These shortcuts set secure preview cookies for this browser. They do not run in production unless{" "}
        <code className="rounded bg-muted px-1 font-mono text-xs">NEXT_PUBLIC_DEV_PORTAL=true</code> is set.
      </p>

      {msg ? (
        <p className="mt-4 text-sm text-primary" role="status">
          {msg}
        </p>
      ) : null}

      <div className="mt-8 space-y-6">
        <Card className="space-y-4 rounded-2xl border-border p-6">
          <h2 className="font-display text-lg font-bold">Admin hub (local)</h2>
          <p className="text-sm text-muted-foreground">
            Bypasses Supabase auth in middleware <strong className="text-foreground">only when NODE_ENV=development</strong>.
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton
              type="button"
              className="justify-center"
              disabled={pending}
              onClick={() => void postSession({ admin: true })}
            >
              Enable admin bypass
            </PrimaryButton>
            <SecondaryButton type="button" className="justify-center" disabled={pending} onClick={() => router.push("/admin")}>
              Open /admin
            </SecondaryButton>
          </div>
        </Card>

        <Card className="space-y-4 rounded-2xl border-border p-6">
          <h2 className="font-display text-lg font-bold">Ward dashboard (demo data)</h2>
          <p className="text-sm text-muted-foreground">
            Loads the ward dashboard with sample Power of 5 rows — no Supabase sign-in required.
          </p>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton
              type="button"
              className="justify-center"
              disabled={pending}
              onClick={() => void postSession({ wardSlug: demoWard })}
            >
              Set demo ward ({demoWard})
            </PrimaryButton>
            <SecondaryButton
              type="button"
              className="justify-center"
              disabled={pending}
              onClick={() => router.push(`/wards/${demoWard}/dashboard`)}
            >
              Open dashboard
            </SecondaryButton>
          </div>
        </Card>

        <Card className="rounded-2xl border-border p-6">
          <h2 className="font-display text-lg font-bold">Clear</h2>
          <SecondaryButton type="button" className="mt-3 justify-center" disabled={pending} onClick={() => void clearSession()}>
            Clear dev session cookies
          </SecondaryButton>
        </Card>
      </div>

      <p className="mt-10 text-center text-sm">
        <Link href="/hub" className="font-semibold text-primary underline-offset-4 hover:underline">
          ← Volunteer hub
        </Link>
      </p>
    </div>
  );
}
