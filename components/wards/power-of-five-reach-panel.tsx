"use client";

import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { Loader2, Search, Trash2, Send } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  addReachFromVoterDirectory,
  addReachManual,
  queueOutreachRequest,
  removeReachListItem,
  searchVotersInWard,
} from "@/lib/reach/actions";
import { powerOfFiveReach } from "@/content/power-of-five";
import type { ReachOutListRow, VoterDirectoryRow } from "@/lib/reach/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const templateKeys = ["smsInvite", "smsEvent", "emailInvite"] as const;

export function PowerOfFiveReachPanel({
  wardSlug,
  initialRows,
  voterDirectoryCount,
}: {
  wardSlug: string;
  initialRows: ReachOutListRow[];
  voterDirectoryCount: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [rows, setRows] = useState(initialRows);
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<VoterDirectoryRow[]>([]);
  const [searching, setSearching] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [manual, setManual] = useState({
    displayName: "",
    addressLine: "",
    city: "Jacksonville",
    zip: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState<ReachOutListRow | null>(null);
  const [channel, setChannel] = useState<"email" | "sms">("sms");
  const [templateKey, setTemplateKey] = useState<(typeof templateKeys)[number]>("smsInvite");
  const [messageSubject, setMessageSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const applyTemplateKey = useCallback((key: (typeof templateKeys)[number]) => {
    setTemplateKey(key);
    if (key === "emailInvite") {
      const t = powerOfFiveReach.templates.emailInvite;
      setMessageSubject(t.subject);
      setMessageBody(t.body);
      setChannel("email");
    } else {
      const t = powerOfFiveReach.templates[key];
      setMessageSubject("");
      setMessageBody(t.body);
      setChannel("sms");
    }
  }, []);

  const runSearch = useCallback(async () => {
    if (voterDirectoryCount === 0) return;
    setSearching(true);
    setFeedback(null);
    const res = await searchVotersInWard(wardSlug, q);
    setSearching(false);
    if (!res.ok) {
      setHits([]);
      setFeedback("Search unavailable. Check that you are signed in to this ward.");
      return;
    }
    setHits(res.rows);
    if (res.rows.length === 0) setFeedback("No matches. Try another name or add the person manually.");
  }, [wardSlug, q, voterDirectoryCount]);

  useEffect(() => {
    if (voterDirectoryCount === 0 || q.trim().length < 2) {
      setHits([]);
      return;
    }
    const t = window.setTimeout(() => {
      void runSearch();
    }, 400);
    return () => window.clearTimeout(t);
  }, [q, voterDirectoryCount, runSearch]);

  function openQueue(row: ReachOutListRow) {
    setActive(row);
    setContactPhone(row.phone ?? "");
    setContactEmail(row.email ?? "");
    applyTemplateKey("smsInvite");
    setDialogOpen(true);
  }

  function onQueueSubmit() {
    if (!active) return;
    startTransition(async () => {
      const res = await queueOutreachRequest(wardSlug, {
        reachOutListItemId: active.id,
        channel,
        messageSubject: channel === "email" ? messageSubject : null,
        messageBody,
        contactPhone: contactPhone || null,
        contactEmail: contactEmail || null,
      });
      if (!res.ok) {
        setFeedback("Could not queue that request. Try again.");
        return;
      }
      setFeedback("Queued for staff. They will send from campaign accounts.");
      setDialogOpen(false);
      router.refresh();
    });
  }

  const directoryEmpty = voterDirectoryCount === 0;

  const templateOptions = useMemo(
    () =>
      templateKeys.map((k) => ({
        key: k,
        label: powerOfFiveReach.templates[k].label,
      })),
    [],
  );

  return (
    <Card className="rounded-2xl border-border p-6">
      <h2 className="font-display text-xl font-bold text-primary">{powerOfFiveReach.sectionTitle}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {powerOfFiveReach.sectionIntro}
      </p>

      {directoryEmpty ? (
        <p className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-foreground">
          {powerOfFiveReach.emptyDirectoryHint}
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          <Label htmlFor="voter-search" className="text-xs font-semibold uppercase text-muted-foreground">
            Search voters in this ward
          </Label>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="voter-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name or part of an address"
                className="pl-9"
                autoComplete="off"
              />
            </div>
            <Button type="button" variant="secondary" onClick={() => void runSearch()} disabled={searching}>
              {searching ? <Loader2 className="size-4 animate-spin" /> : "Search"}
            </Button>
          </div>
          {hits.length > 0 ? (
            <ul className="space-y-2">
              {hits.map((v) => (
                <li
                  key={v.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-background/60 px-3 py-2 text-sm"
                >
                  <div>
                    <p className="font-semibold">{v.display_name}</p>
                    <p className="text-muted-foreground">
                      {[v.address_line, v.city, v.zip].filter(Boolean).join(", ") || "—"}
                    </p>
                  </div>
                  <Button
                    type="button"
                    size="sm"
                    disabled={pending}
                    onClick={() => {
                      startTransition(async () => {
                        const res = await addReachFromVoterDirectory(wardSlug, v.id);
                        if (res.ok) {
                          router.refresh();
                          return;
                        }
                        if (res.reason === "duplicate") setFeedback("Already on your list.");
                        else setFeedback("Could not add that row.");
                      });
                    }}
                  >
                    Add to list
                  </Button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Add someone manually</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="manual-name">Name</Label>
            <Input
              id="manual-name"
              value={manual.displayName}
              onChange={(e) => setManual((m) => ({ ...m, displayName: e.target.value }))}
              placeholder="Full name"
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="manual-addr">Address</Label>
            <Input
              id="manual-addr"
              value={manual.addressLine}
              onChange={(e) => setManual((m) => ({ ...m, addressLine: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-city">City</Label>
            <Input
              id="manual-city"
              value={manual.city}
              onChange={(e) => setManual((m) => ({ ...m, city: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-zip">ZIP</Label>
            <Input
              id="manual-zip"
              value={manual.zip}
              onChange={(e) => setManual((m) => ({ ...m, zip: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-phone">Phone (if you have it)</Label>
            <Input
              id="manual-phone"
              value={manual.phone}
              onChange={(e) => setManual((m) => ({ ...m, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="manual-email">Email (if you have it)</Label>
            <Input
              id="manual-email"
              value={manual.email}
              onChange={(e) => setManual((m) => ({ ...m, email: e.target.value }))}
            />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="manual-notes">Notes</Label>
            <Textarea
              id="manual-notes"
              value={manual.notes}
              onChange={(e) => setManual((m) => ({ ...m, notes: e.target.value }))}
              rows={2}
            />
          </div>
        </div>
        <Button
          type="button"
          className="mt-4"
          disabled={pending || !manual.displayName.trim()}
          onClick={() => {
            startTransition(async () => {
              const res = await addReachManual(wardSlug, {
                displayName: manual.displayName,
                addressLine: manual.addressLine,
                city: manual.city,
                zip: manual.zip,
                phone: manual.phone,
                email: manual.email,
                notes: manual.notes,
              });
              if (res.ok) {
                setManual({
                  displayName: "",
                  addressLine: "",
                  city: "Jacksonville",
                  zip: "",
                  phone: "",
                  email: "",
                  notes: "",
                });
                router.refresh();
              } else setFeedback("Could not save that contact.");
            });
          }}
        >
          Save to reach list
        </Button>
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase text-muted-foreground">Your reach list</p>
        {rows.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">Nobody on your list yet.</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-background/60 px-3 py-3"
              >
                <div className="min-w-0">
                  <p className="font-semibold">{row.display_name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {[row.address_line, row.city, row.zip].filter(Boolean).join(", ") || "—"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {[row.phone, row.email].filter(Boolean).join(" · ") || "No phone/email on file"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" size="sm" variant="secondary" onClick={() => openQueue(row)}>
                    <Send className="mr-1 size-3.5" />
                    Queue outreach
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => {
                      startTransition(async () => {
                        await removeReachListItem(wardSlug, row.id);
                        router.refresh();
                      });
                    }}
                  >
                    <Trash2 className="size-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {feedback ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {feedback}
        </p>
      ) : null}

      <p className="mt-6 text-xs text-muted-foreground">{powerOfFiveReach.outreachDisclaimer}</p>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg sm:max-w-lg" showCloseButton>
          <DialogHeader>
            <DialogTitle>Queue outreach</DialogTitle>
            <DialogDescription>
              Staff sends from campaign email or SMS. Edit the draft and confirm phone or email for
              this person.
            </DialogDescription>
          </DialogHeader>
          {active ? (
            <div className="space-y-3">
              <p className="text-sm font-medium">{active.display_name}</p>
              <div>
                <Label htmlFor="tpl">Starting text</Label>
                <select
                  id="tpl"
                  className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={templateKey}
                  onChange={(e) => {
                    applyTemplateKey(e.target.value as (typeof templateKeys)[number]);
                  }}
                >
                  {templateOptions.map((o) => (
                    <option key={o.key} value={o.key}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              {channel === "email" ? (
                <div>
                  <Label htmlFor="subj">Subject</Label>
                  <Input
                    id="subj"
                    value={messageSubject}
                    onChange={(e) => setMessageSubject(e.target.value)}
                  />
                </div>
              ) : null}
              <div>
                <Label htmlFor="body">Message</Label>
                <Textarea
                  id="body"
                  rows={8}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="cq">Phone to use</Label>
                  <Input
                    id="cq"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Numbers you have for them"
                  />
                </div>
                <div>
                  <Label htmlFor="ce">Email to use</Label>
                  <Input
                    id="ce"
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : null}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" disabled={pending} onClick={onQueueSubmit}>
              {pending ? <Loader2 className="size-4 animate-spin" /> : "Submit to queue"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
