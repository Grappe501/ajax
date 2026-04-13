"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitCampaignEvent } from "@/lib/campaign-events/actions";
import {
  CAMPAIGN_EVENT_KINDS,
  campaignEventKindLabel,
} from "@/lib/campaign-events/kinds";
import { ANALYTICS_EVENT } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function localDatetimeToIso(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

export function CampaignEventForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const startsLocal = String(form.querySelector<HTMLInputElement>('[name="starts_at"]')?.value ?? "");
    const endsLocal = String(form.querySelector<HTMLInputElement>('[name="ends_at"]')?.value ?? "");

    const startsIso = localDatetimeToIso(startsLocal);
    if (!startsIso) {
      setStatus("error");
      return;
    }
    fd.set("starts_at_iso", startsIso);
    if (endsLocal) {
      const endsIso = localDatetimeToIso(endsLocal);
      if (!endsIso) {
        setStatus("error");
        return;
      }
      fd.set("ends_at_iso", endsIso);
    } else {
      fd.delete("ends_at_iso");
    }

    setStatus("submitting");
    const result = await submitCampaignEvent(fd);
    if (result.ok) {
      trackEvent(ANALYTICS_EVENT.submitCampaignEvent);
      setStatus("success");
      form.reset();
    } else {
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
        <p className="font-display text-lg font-bold text-primary">Thanks — it is in the queue.</p>
        <p className="mt-2 text-muted-foreground">
          Coordinators usually review new listings within a day. Once approved, your event appears on
          the public calendar with the contact details you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "ajax-card-elevated space-y-6 border-primary/10 bg-gradient-to-b from-card to-ajax-mist/30 p-6 md:p-8",
        className,
      )}
    >
      <p className="text-sm leading-relaxed text-muted-foreground">
        <span className="font-semibold text-foreground">Times: </span>
        Use your device&apos;s local time; most volunteers should enter times in Central Time
        (Jacksonville, AR). We store an exact timestamp so the calendar stays accurate.
      </p>

      <p className="hidden" aria-hidden>
        <label>
          Company website: <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="space-y-2">
        <Label htmlFor="ev-title">Event title</Label>
        <Input
          id="ev-title"
          name="title"
          required
          minLength={4}
          maxLength={200}
          placeholder="e.g. Saturday signing table — Dupree Park"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ev-kind">Format</Label>
        <select
          id="ev-kind"
          name="event_kind"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {CAMPAIGN_EVENT_KINDS.map((k) => (
            <option key={k} value={k}>
              {campaignEventKindLabel[k]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ev-start">Starts</Label>
          <Input id="ev-start" name="starts_at" type="datetime-local" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ev-end">Ends (optional)</Label>
          <Input id="ev-end" name="ends_at" type="datetime-local" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="ev-loc">Where (short label)</Label>
        <Input
          id="ev-loc"
          name="location_label"
          required
          maxLength={200}
          placeholder="Venue or cross-streets people will recognize"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ev-addr">Address or directions (optional)</Label>
        <Textarea
          id="ev-addr"
          name="address"
          maxLength={500}
          rows={2}
          placeholder="Parking entrance, building name, or full address"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ev-ward">Ward / neighborhood (optional)</Label>
        <Input id="ev-ward" name="ward_hint" maxLength={120} placeholder="e.g. Ward 2 — north side" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ev-who">Who should come</Label>
        <Textarea
          id="ev-who"
          name="audience"
          maxLength={2000}
          rows={3}
          placeholder="Signers, witnesses, volunteers — who you are trying to gather"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="ev-how">How it will run</Label>
        <Textarea
          id="ev-how"
          name="format_notes"
          maxLength={4000}
          rows={4}
          placeholder="Tabling setup, drive-through lane, materials you will have, accessibility notes…"
        />
      </div>

      <div className="border-t border-border/60 pt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your contact</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Shown on the public calendar so neighbors can coordinate with you.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="ev-oname">Name</Label>
            <Input id="ev-oname" name="organizer_name" required maxLength={120} autoComplete="name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ev-oemail">Email</Label>
            <Input
              id="ev-oemail"
              name="organizer_email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
            />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Label htmlFor="ev-ophone">Phone (optional)</Label>
          <Input id="ev-ophone" name="organizer_phone" type="tel" maxLength={40} autoComplete="tel" />
        </div>
      </div>

      {status === "error" ? (
        <p className="text-sm font-medium text-destructive" role="alert">
          Something went wrong. Check required fields and try again, or email hello@ajaxcampaign.org.
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Submit for calendar review"}
      </Button>
    </form>
  );
}
