"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Minus, Plus, RotateCcw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { ExplainItBackCard, PetitionConfidenceQuiz, PetitionPracticeLine } from "@/components/initiative/petition-coach-extras";
import { AskAjaxPlaceholder, ReadAloudPlaceholder } from "@/components/initiative/petition-placeholders";
import { PrimaryButton } from "@/components/cta/primary-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  beforeYouStartCopy,
  coachRoles,
  getCoachHotspots,
  getHotspotIdsForStep,
  petitionCoachMeta,
  step4Narrative,
  storySteps,
  type CoachRole,
  type StoryStep,
} from "@/content/petition-coach";
import { petitionHotspots, type PetitionHotspot, type PetitionZone } from "@/content/petitionHotspots";
import { useAssistant } from "@/components/assistant/assistant-context";
import { cn } from "@/lib/utils";

const PETITION_IMG = "/petition/petition-page-1.svg";

function zoneButtonClass(zone: PetitionZone, active: boolean): string {
  const base =
    "absolute rounded-md border-2 transition motion-safe:duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const z = {
    header: "border-amber-600/50 bg-amber-500/20 hover:bg-amber-500/30",
    signer: "border-[#c99700] bg-[#fdb913]/25 hover:bg-[#fdb913]/35",
    official: "border-slate-500 bg-slate-300/25 hover:bg-slate-300/35",
    canvasser: "border-[#002d62] bg-[#002d62]/15 hover:bg-[#002d62]/25",
    notary: "border-primary bg-primary/15 hover:bg-primary/25",
  }[zone];
  return cn(base, z, active && "ring-2 ring-primary ring-offset-2 ring-offset-background");
}

const REJECTION_REASONS = [
  "Not registered or not eligible at this address",
  "Printed name illegible or doesn’t match voter record",
  "Incomplete residence or wrong city for this petition",
  "Missing birth date or unclear date",
  "Signed outside the canvasser’s presence (where required)",
  "Duplicate or improper multiple signatures on the same part",
] as const;

export function PetitionCoach() {
  const { openAssistant } = useAssistant();
  const [role, setRole] = useState<CoachRole>("signing");
  const [advanced, setAdvanced] = useState(false);
  const [storyStep, setStoryStep] = useState<StoryStep>(1);
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<PetitionHotspot | null>(null);
  const [open, setOpen] = useState(false);
  const [listIndex, setListIndex] = useState(0);
  const [sheetSide, setSheetSide] = useState<"bottom" | "right">("bottom");

  const visibleIds = useMemo(() => new Set(getHotspotIdsForStep(role, storyStep)), [role, storyStep]);
  const ordered = useMemo(() => getCoachHotspots(role, storyStep), [role, storyStep]);

  useEffect(() => {
    const q = window.matchMedia("(min-width: 1024px)");
    const apply = () => setSheetSide(q.matches ? "right" : "bottom");
    apply();
    q.addEventListener("change", apply);
    return () => q.removeEventListener("change", apply);
  }, []);

  const openHotspot = useCallback(
    (h: PetitionHotspot) => {
      if (!visibleIds.has(h.id)) return;
      setSelected(h);
      setOpen(true);
      const idx = ordered.findIndex((x) => x.id === h.id);
      if (idx >= 0) setListIndex(idx);
    },
    [ordered, visibleIds],
  );

  const goPrev = useCallback(() => {
    const i = Math.max(0, listIndex - 1);
    setListIndex(i);
    setSelected(ordered[i] ?? null);
  }, [listIndex, ordered]);

  const goNext = useCallback(() => {
    const i = Math.min(ordered.length - 1, listIndex + 1);
    setListIndex(i);
    setSelected(ordered[i] ?? null);
  }, [listIndex, ordered]);

  useEffect(() => {
    if (!selected) return;
    const idx = ordered.findIndex((x) => x.id === selected.id);
    if (idx < 0) return;
    queueMicrotask(() => setListIndex(idx));
  }, [selected, ordered]);

  const before = beforeYouStartCopy[role];
  const stepMeta = storySteps.find((s) => s.step === storyStep)!;

  return (
    <div id="petition-coach-walkthrough" className="space-y-10 scroll-mt-24 pb-28">
      {/* Hero */}
      <header className="max-w-3xl" id="petition-coach-top">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Petition Coach</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {petitionCoachMeta.headline}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{petitionCoachMeta.description}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryButton href="#petition-coach-walkthrough" className="justify-center">
            Start the guided walkthrough
          </PrimaryButton>
          <PrimaryButton href="#official-petition-pdf" variant="secondary" className="justify-center">
            View the full petition
          </PrimaryButton>
          <PrimaryButton href="/initiative/language" variant="secondary" className="justify-center">
            Read the initiative language
          </PrimaryButton>
        </div>
      </header>

      {/* Role */}
      <section aria-labelledby="role-heading">
        <h2 id="role-heading" className="font-display text-lg font-bold text-foreground">
          Choose your role
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">We’ll tune the steps and which parts of the form we highlight.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {coachRoles.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setRole(opt.id);
                setStoryStep(1);
              }}
              className={cn(
                "rounded-2xl border px-4 py-4 text-left text-sm transition",
                role === opt.id ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-card hover:border-primary/30",
              )}
            >
              <span className="font-display font-bold text-foreground">{opt.label}</span>
              <span className="mt-1 block text-muted-foreground">{opt.description}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Basic / Advanced */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-medium text-foreground">Help level</p>
        <div className="inline-flex rounded-full border border-border bg-muted/40 p-1">
          <button
            type="button"
            onClick={() => setAdvanced(false)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm",
              !advanced ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Basic help
          </button>
          <button
            type="button"
            onClick={() => setAdvanced(true)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition sm:text-sm",
              advanced ? "bg-card text-primary shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            Advanced help
          </button>
        </div>
        <p className="text-xs text-muted-foreground sm:max-w-md">
          Advanced adds legal and process notes in each panel — optional if you already know the basics.
        </p>
      </div>

      {/* Story progress */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Your path</p>
          <span className="text-xs tabular-nums text-muted-foreground">
            Step {storyStep} of 4
          </span>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-1">
          {storySteps.map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setStoryStep(s.step)}
              className={cn(
                "rounded-lg px-2 py-3 text-left text-[11px] font-semibold leading-snug transition sm:text-xs",
                storyStep === s.step
                  ? "bg-primary text-primary-foreground shadow"
                  : "bg-muted/60 text-muted-foreground hover:bg-muted",
              )}
            >
              <span className="block opacity-90">{s.step}. {s.title}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 font-display text-base font-bold text-foreground">{stepMeta.title}</p>
        <p className="text-sm text-muted-foreground">{stepMeta.subtitle}</p>
      </div>

      {/* Step 1 intro */}
      {storyStep === 1 ? (
        <Card className="rounded-2xl border-primary/20 bg-primary/[0.04] p-6">
          <h3 className="font-display text-base font-bold text-primary">Before you start</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            {before.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {before.helperNote ? <p className="mt-4 text-sm text-foreground">{before.helperNote}</p> : null}
        </Card>
      ) : null}

      {/* Step 4 narrative */}
      {storyStep === 4 ? (
        <Card className="rounded-2xl border-border p-6">
          <h3 className="font-display text-base font-bold text-foreground">What happens next</h3>
          <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-muted-foreground">
            {step4Narrative[role].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* Mistakes detector — compact, always visible */}
      <Card className="rounded-2xl border-rose-500/20 bg-rose-500/[0.06] p-6">
        <h3 className="font-display text-base font-bold text-foreground">Most common reasons a signature gets rejected</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {REJECTION_REASONS.map((m) => (
            <li key={m} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-rose-600" aria-hidden>
                •
              </span>
              {m}
            </li>
          ))}
        </ul>
        <Link href="/initiative/mistakes" className="mt-4 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Read the full mistakes guide →
        </Link>
      </Card>

      {/* Viewer + list */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-8">
        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Petition stage</span>
            <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1 py-1">
              <Button type="button" variant="ghost" size="icon-sm" title="Zoom out" onClick={() => setZoom((z) => Math.max(0.75, Math.round((z - 0.25) * 100) / 100))}>
                <Minus className="size-4" aria-hidden />
              </Button>
              <span className="min-w-[3rem] text-center text-xs tabular-nums">{Math.round(zoom * 100)}%</span>
              <Button type="button" variant="ghost" size="icon-sm" title="Zoom in" onClick={() => setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100))}>
                <Plus className="size-4" aria-hidden />
              </Button>
              <Button type="button" variant="ghost" size="icon-sm" title="Reset zoom" onClick={() => setZoom(1)}>
                <RotateCcw className="size-4" aria-hidden />
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden rounded-2xl border-primary/25 bg-gradient-to-b from-[#faf8f5] to-card p-2 shadow-[0_20px_50px_-20px_rgba(0,45,98,0.25)]">
            <div className="relative mx-auto max-w-full overflow-auto rounded-xl bg-white shadow-inner" style={{ maxHeight: "min(70vh, 720px)" }}>
              <div className="relative inline-block min-w-full origin-top-left transition-transform duration-200" style={{ transform: `scale(${zoom})` }}>
                <Image
                  src={PETITION_IMG}
                  alt="Jacksonville petition page 1 — tap highlighted regions for this step."
                  width={612}
                  height={792}
                  className="h-auto w-full max-w-full select-none"
                  priority
                />
                <div className="pointer-events-none absolute inset-0">
                  {petitionHotspots.map((h) => {
                    const allowed = visibleIds.has(h.id);
                    return (
                      <button
                        key={h.id}
                        type="button"
                        tabIndex={allowed ? 0 : -1}
                        disabled={!allowed}
                        className={cn(
                          "absolute rounded-md transition",
                          zoneButtonClass(h.zone, selected?.id === h.id && open),
                          allowed ? "pointer-events-auto" : "pointer-events-none opacity-[0.12]",
                        )}
                        style={{
                          left: `${h.region.x}%`,
                          top: `${h.region.y}%`,
                          width: `${h.region.width}%`,
                          height: `${h.region.height}%`,
                        }}
                        onClick={() => openHotspot(h)}
                        aria-label={h.listLabel}
                        aria-hidden={!allowed}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="mt-2 px-2 text-[11px] text-muted-foreground">
              Gold tint: signer columns · Blue: canvasser · Navy: notary · Gray: official only. Only regions for this step
              are tappable.
            </p>
          </Card>
        </div>

        <aside className="w-full shrink-0 space-y-3 lg:max-w-sm xl:max-w-md">
          <Card className="rounded-2xl border-border p-4 text-sm shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">This step</p>
            <p className="mt-2 text-muted-foreground">
              {ordered.length} part{ordered.length === 1 ? "" : "s"} to review. Open any hotspot for field help and mistakes.
            </p>
          </Card>
        </aside>
      </div>

      <section aria-labelledby="hotspot-list-heading">
        <h2 id="hotspot-list-heading" className="font-display text-lg font-bold text-foreground">
          Tap a part of the petition
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Same content as the diagram — numbered for mobile and keyboard. Hotspots match your role and step.
        </p>
        <ol className="mt-4 space-y-2">
          {ordered.map((h, i) => (
            <li key={h.id}>
              <button
                type="button"
                onClick={() => openHotspot(h)}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left text-sm transition",
                  selected?.id === h.id && open ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40 hover:bg-muted/40",
                )}
              >
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-primary-foreground",
                    h.zone === "signer" && "bg-[#c99700]",
                    h.zone === "header" && "bg-amber-700",
                    h.zone === "official" && "bg-slate-500",
                    h.zone === "canvasser" && "bg-[#002d62]",
                    h.zone === "notary" && "bg-primary",
                  )}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold text-foreground">{h.listLabel}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-2">{h.summary}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>

      {/* Phase 2 blocks */}
      <div className="space-y-8 border-t border-border/80 pt-12">
        <PetitionPracticeLine />
        <ExplainItBackCard />
        <PetitionConfidenceQuiz />
      </div>

      {/* Sticky ask */}
      <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto flex w-full max-w-lg items-center gap-2 rounded-2xl border border-border bg-card/95 px-3 py-2 shadow-lg backdrop-blur-md">
          <Button
            type="button"
            className="flex-1 gap-2 rounded-xl bg-[#002d62] font-semibold text-white hover:bg-[#001a35]"
            onClick={() =>
              openAssistant(
                "I’m on the Petition Coach page. Walk me through what I need to write on the Jacksonville petition for my role.",
              )
            }
          >
            <Sparkles className="size-4" aria-hidden />
            Ask AJAX about this form
          </Button>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side={sheetSide}
          className={cn(
            "gap-0 overflow-y-auto p-0",
            sheetSide === "bottom" && "max-h-[85vh] rounded-t-3xl",
            sheetSide === "right" && "h-full max-h-full w-full max-w-md border-l",
          )}
        >
          {selected ? (
            <>
              <SheetHeader className="border-b border-border pb-4 text-left">
                <SheetTitle className="font-display text-lg">{selected.panelTitle}</SheetTitle>
                <SheetDescription className="text-base text-foreground">{selected.summary}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 py-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary">What to do</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.howToComplete}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary">Who fills this out</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.whoFills}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-amber-800">Watch out for</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-muted-foreground">
                    {selected.mistakes.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-primary">Why it matters</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{selected.whyMatters}</p>
                </div>
                {selected.example ? (
                  <div className="rounded-xl border border-primary/20 bg-primary/[0.06] px-3 py-2">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-primary">Example</h3>
                    <p className="mt-1 text-sm text-foreground">{selected.example}</p>
                  </div>
                ) : null}
                {advanced ? (
                  <div className="rounded-xl border border-border/80 bg-muted/30 px-3 py-3">
                    <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Advanced / legal context</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {selected.advanced ?? selected.whatFor}
                    </p>
                  </div>
                ) : null}
                {selected.related.length > 0 ? (
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wide text-primary">Related</h3>
                    <ul className="mt-2 space-y-1.5 text-sm">
                      {selected.related.map((r) => (
                        <li key={r.href}>
                          <Link href={r.href} className="font-semibold text-primary underline-offset-4 hover:underline">
                            {r.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                <div className="flex flex-wrap gap-2 border-t border-border pt-4">
                  <ReadAloudPlaceholder label="Read this aloud (soon)" />
                  <AskAjaxPlaceholder
                    prefill={`What goes in “${selected.panelTitle}” on the Jacksonville petition? Who fills it out?`}
                  />
                </div>
                <div className="flex items-center justify-between gap-2 border-t border-border pt-4">
                  <Button type="button" variant="outline" size="sm" onClick={goPrev} disabled={listIndex <= 0}>
                    <ChevronLeft className="size-4" aria-hidden />
                    Previous
                  </Button>
                  <span className="text-xs text-muted-foreground">
                    {listIndex + 1} / {ordered.length}
                  </span>
                  <Button type="button" variant="outline" size="sm" onClick={goNext} disabled={listIndex >= ordered.length - 1}>
                    Next
                    <ChevronRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}
