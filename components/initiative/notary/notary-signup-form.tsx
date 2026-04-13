"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { notarySignupCopy } from "@/content/notarySignup";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { submitNetlifyForm } from "@/lib/netlify-form";
import { cn } from "@/lib/utils";

const FORM_NAME = "notary-interest";

function YesNoRow({
  name,
  legend,
  optional,
}: {
  name: string;
  legend: string;
  optional?: boolean;
}) {
  return (
    <fieldset className="space-y-2">
      <legend className="text-sm font-medium text-foreground">
        {legend}
        {optional ? <span className="font-normal text-muted-foreground"> (optional)</span> : null}
      </legend>
      <div className="flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="radio" name={name} value="yes" className="size-4 accent-primary" />
          Yes
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="radio" name={name} value="no" className="size-4 accent-primary" />
          No
        </label>
      </div>
    </fieldset>
  );
}

export function NotarySignupForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await submitNetlifyForm(FORM_NAME, e.currentTarget);
      if (!res.ok) throw new Error("Network error");
      trackEvent(ANALYTICS_EVENT.submitNotaryInterest);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        id="notary-signup"
        className={cn(
          "rounded-2xl border border-primary/25 bg-primary/[0.06] p-6 text-card-foreground shadow-sm sm:p-8",
          className,
        )}
      >
        <p className="font-display text-lg font-bold text-primary">{notarySignupCopy.successTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{notarySignupCopy.successBody}</p>
      </div>
    );
  }

  return (
    <div id="notary-signup" className={cn("scroll-mt-24", className)}>
      <h2 className="font-display text-2xl font-bold text-foreground">{notarySignupCopy.sectionTitle}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {notarySignupCopy.sectionDescription}
      </p>
      <form
        name={FORM_NAME}
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        onSubmit={onSubmit}
      >
        <input type="hidden" name="form-name" value={FORM_NAME} />
        <p className="hidden">
          <label>
            Do not fill this out: <input name="bot-field" />
          </label>
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notary-fullName">Full name</Label>
            <Input id="notary-fullName" name="fullName" required autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notary-phone">Phone</Label>
            <Input id="notary-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notary-email">Email</Label>
            <Input id="notary-email" name="email" type="email" required autoComplete="email" />
          </div>
        </div>

        <fieldset className="space-y-2">
          <legend className="text-sm font-medium text-foreground">Are you currently an active notary?</legend>
          <div className="flex flex-wrap gap-4">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="radio" name="activeNotary" value="yes" required className="size-4 accent-primary" />
              Yes
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="radio" name="activeNotary" value="no" required className="size-4 accent-primary" />
              No
            </label>
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="notary-county">County of commission</Label>
            <Input id="notary-county" name="countyCommission" required autoComplete="address-level1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notary-exp">Commission expiration date</Label>
            <Input id="notary-exp" name="commissionExpiration" type="date" required />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="notary-cityzip">City &amp; ZIP</Label>
            <Input id="notary-cityzip" name="cityZip" required autoComplete="address-level2 postal-code" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notary-times">Best days / times available</Label>
          <Textarea
            id="notary-times"
            name="bestDaysTimes"
            required
            rows={3}
            placeholder="e.g. weekday evenings, Saturday mornings…"
            className="resize-y min-h-[88px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notary-ward">Ward (if known)</Label>
          <Input id="notary-ward" name="ward" autoComplete="off" placeholder="Optional" />
        </div>

        <YesNoRow name="travelOk" legend="Can you travel within the area to help?" optional />
        <YesNoRow name="churchHelp" legend="Can you help at churches?" optional />
        <YesNoRow name="eventsHelp" legend="Can you help at community events?" optional />
        <YesNoRow name="hostHours" legend="Can you host notary hours (by appointment)?" optional />

        <div className="space-y-2">
          <Label htmlFor="notary-notes">Notes</Label>
          <Textarea id="notary-notes" name="notes" rows={3} placeholder="Optional — equipment, boundaries, questions…" className="resize-y min-h-[88px]" />
        </div>

        {status === "error" ? (
          <p className="text-sm text-destructive" role="alert">
            {notarySignupCopy.errorMessage}
          </p>
        ) : null}

        <p className="text-xs text-muted-foreground">{notarySignupCopy.privacyNote}</p>

        <Button
          type="submit"
          size="lg"
          id="notary-signup-submit"
          data-analytics-id="notary-signup-submit"
          className="w-full rounded-xl font-semibold"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? notarySignupCopy.submittingLabel : notarySignupCopy.submitLabel}
        </Button>
      </form>
    </div>
  );
}
