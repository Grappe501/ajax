"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { submitNetlifyForm } from "@/lib/netlify-form";
import { cn } from "@/lib/utils";

const FORM_NAME = "host-location";

export function HostLocationForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm(FORM_NAME, e.currentTarget);
      if (!res.ok) throw new Error("Network error");
      trackEvent(ANALYTICS_EVENT.submitHostLocation);
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
          Thank you — hosting makes a difference.
        </p>
        <p className="mt-2 text-muted-foreground">
          A coordinator will reach out about timing, traffic flow, and compliant
          setup for petition signing.
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
        <Label htmlFor="hl-name">Your name</Label>
        <Input id="hl-name" name="fullName" required autoComplete="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hl-org">Organization / business / church</Label>
        <Input id="hl-org" name="organization" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hl-address">Address</Label>
        <Input id="hl-address" name="address" required autoComplete="street-address" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="hl-email">Email</Label>
          <Input
            id="hl-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hl-phone">Phone</Label>
          <Input id="hl-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="hl-type">Type of location</Label>
        <Input
          id="hl-type"
          name="locationType"
          placeholder="Church, cafe, office, outdoor, etc."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hl-times">Best times</Label>
        <Input
          id="hl-times"
          name="bestTimes"
          placeholder="Weekday evenings, Sunday after service, etc."
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hl-notes">Notes (optional)</Label>
        <Textarea id="hl-notes" name="notes" rows={3} />
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
        {status === "submitting" ? "Sending…" : "Offer your location"}
      </Button>
    </form>
  );
}
