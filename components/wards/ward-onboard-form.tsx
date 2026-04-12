"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { completeOrganizerProfile } from "@/lib/organizing/actions";

export function WardOnboardForm({
  wardSlug,
  defaultParentRef = "",
}: {
  wardSlug: string;
  defaultParentRef?: string;
}) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [parentCode, setParentCode] = useState(defaultParentRef);
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorCode, setErrorCode] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    setErrorCode(null);
    const res = await completeOrganizerProfile(
      wardSlug,
      displayName,
      parentCode.trim() || null,
    );
    if (!res.ok) {
      setStatus("error");
      setErrorCode(res.code);
      return;
    }
    router.push(`/wards/${wardSlug}/dashboard`);
    router.refresh();
  }

  const errMsg =
    errorCode === "bad_parent"
      ? "That referral code does not match this ward."
      : errorCode === "exists"
        ? "You already have a profile for this ward — open your dashboard."
        : errorCode === "auth"
          ? "Sign in first."
          : errorCode === "not_configured"
            ? "Supabase is not configured."
            : "Something went wrong. Try again.";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="on-name">Display name</Label>
        <Input
          id="on-name"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="How teammates will see you"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="on-parent">Inviter referral code (optional)</Label>
        <Input
          id="on-parent"
          value={parentCode}
          onChange={(e) => setParentCode(e.target.value)}
          placeholder="Connects you to the person who invited you"
          className="font-mono"
        />
        <p className="text-xs text-muted-foreground">
          Ask your ward captain or the friend who recruited you for their code.
        </p>
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          {errMsg}
        </p>
      ) : null}
      <Button
        type="submit"
        disabled={status === "saving"}
        className="w-full rounded-xl font-semibold"
      >
        {status === "saving" ? "Saving…" : "Start my organizing profile"}
      </Button>
    </form>
  );
}
