"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { submitNetlifyForm } from "@/lib/netlify-form";
import { cn } from "@/lib/utils";

const FORM_NAME = "join-volunteer-team";

const helpOptions = [
  { id: "help_event_volunteer", label: "Event volunteer" },
  { id: "help_petition_carrier", label: "Petition carrier" },
  { id: "help_church_outreach", label: "Church outreach" },
  { id: "help_tabling", label: "Tabling" },
  { id: "help_phone_text", label: "Phone / text outreach" },
  { id: "help_hosting", label: "Hosting a location" },
  { id: "help_leadership", label: "Leadership interest" },
] as const;

export function VolunteerSignupForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm(FORM_NAME, e.currentTarget);
      if (!res.ok) throw new Error("Network error");
      trackEvent(ANALYTICS_EVENT.submitVolunteer);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "ajax-card-elevated border-primary/10 p-8 text-card-foreground",
          className,
        )}
      >
        <p className="font-display text-lg font-bold text-primary">
          You are on the list — thank you.
        </p>
        <p className="mt-2 text-muted-foreground">
          A volunteer coordinator will follow up with next steps. If you do not
          hear back within a few days, email the campaign inbox.
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
        "ajax-card-elevated space-y-5 border-primary/10 bg-gradient-to-b from-card to-ajax-mist/30 p-6 md:p-8",
        className,
      )}
      onSubmit={onSubmit}
    >
      <input type="hidden" name="form-name" value={FORM_NAME} />
      <p className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Where this goes: </span>
        Submissions are sent securely through this site&apos;s form service (Netlify Forms) to the
        campaign team. A coordinator follows up by email or phone. The same form is on the{" "}
        <Link href="/volunteer" className="font-medium text-primary underline-offset-4 hover:underline">
          volunteer page
        </Link>{" "}
        for easy sharing.
      </p>
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="vf-first">First name</Label>
          <Input id="vf-first" name="firstName" required autoComplete="given-name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vf-last">Last name</Label>
          <Input id="vf-last" name="lastName" required autoComplete="family-name" />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="vf-email">Email</Label>
          <Input
            id="vf-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vf-phone">Phone</Label>
          <Input
            id="vf-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="vf-zip">ZIP code</Label>
        <Input id="vf-zip" name="zipCode" required autoComplete="postal-code" />
      </div>
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-foreground">
          How would you like to help?
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {helpOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-border/80 bg-background/60 p-3 text-sm leading-snug hover:bg-muted/60"
            >
              <input
                type="checkbox"
                name={opt.id}
                value="yes"
                id={opt.id}
                className="mt-1 size-4 shrink-0 rounded border border-input accent-primary"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="space-y-2">
        <Label htmlFor="vf-notes">Anything you want us to know? (optional)</Label>
        <Textarea id="vf-notes" name="notes" rows={3} />
      </div>
      {status === "error" ? (
        <p className="text-sm text-destructive" role="alert">
          Something went wrong. Please try again or email the campaign.
        </p>
      ) : null}
      <Button
        type="submit"
        size="lg"
        className="w-full rounded-xl font-semibold sm:w-auto"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Sending…" : "Join the volunteer team"}
      </Button>
    </form>
  );
}
