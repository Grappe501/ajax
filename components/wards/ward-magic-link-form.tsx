"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createSupabaseBrowser } from "@/lib/supabase/client";

export function WardMagicLinkForm({
  redirectOrigin,
  nextPath,
}: {
  redirectOrigin: string;
  /** Path after /auth/callback (e.g. /wards/ward-1/onboard?ref=abc) */
  nextPath: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const supabase = createSupabaseBrowser();
    if (!supabase) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${redirectOrigin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        shouldCreateUser: true,
      },
    });
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <p className="text-sm text-muted-foreground">
        Check your email for a sign-in link. After you confirm, you will finish your ward
        profile and get your referral code.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="wm-email">Email</Label>
        <Input
          id="wm-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Could not send link. Confirm Supabase Auth settings and try again.
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-xl font-semibold"
      >
        {status === "loading" ? "Sending link…" : "Email me a sign-in link"}
      </Button>
    </form>
  );
}
