"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { submitNetlifyForm } from "@/lib/netlify-form";
import { cn } from "@/lib/utils";

const FORM_NAME = "signing-alerts";

export function SigningAlertsForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm(FORM_NAME, e.currentTarget);
      if (!res.ok) throw new Error("Network error");
      trackEvent(ANALYTICS_EVENT.submitSigningAlerts);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm",
          className,
        )}
      >
        <p className="font-display text-lg font-bold text-primary">
          You will get signing alerts.
        </p>
        <p className="mt-2 text-muted-foreground">
          Watch for texts or emails with times, locations, and what to bring.
        </p>
      </div>
    );
  }

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      className={cn(
        "space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm",
        className,
      )}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="space-y-2">
        <Label htmlFor="sa-first">First name</Label>
        <Input id="sa-first" name="firstName" required autoComplete="given-name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sa-mobile">Mobile phone</Label>
        <Input
          id="sa-mobile"
          name="mobilePhone"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sa-email">Email (optional)</Label>
        <Input id="sa-email" name="email" type="email" autoComplete="email" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sa-ward">Preferred ward or neighborhood (optional)</Label>
        <Input id="sa-ward" name="ward" autoComplete="address-level2" />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl font-semibold"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Get signing alerts"}
      </Button>
    </form>
  );
}
