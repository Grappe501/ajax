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

const FORM_NAME = "leadership-interest";

export function LeadershipInterestForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm(FORM_NAME, e.currentTarget);
      if (!res.ok) throw new Error("Network error");
      trackEvent(ANALYTICS_EVENT.submitLeadership);
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
          Thank you — a lead organizer will follow up.
        </p>
        <p className="mt-2 text-muted-foreground">
          Leadership roles take clear expectations. We will share next steps and
          training paths that fit your ward.
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
        <Label htmlFor="li-name">Name</Label>
        <Input id="li-name" name="fullName" required autoComplete="name" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="li-email">Email</Label>
          <Input
            id="li-email"
            name="email"
            type="email"
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="li-phone">Phone</Label>
          <Input id="li-phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="li-ward">Ward if known (optional)</Label>
        <Input id="li-ward" name="ward" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="li-exp">Experience or interest</Label>
        <Textarea id="li-exp" name="experience" rows={3} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="li-why">Why do you want to help lead?</Label>
        <Textarea id="li-why" name="whyLead" rows={4} required />
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
        {status === "submitting" ? "Sending…" : "Share leadership interest"}
      </Button>
    </form>
  );
}
