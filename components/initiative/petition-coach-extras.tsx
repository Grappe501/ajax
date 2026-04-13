"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { petitionCoachQuiz } from "@/content/petition-coach";
import { cn } from "@/lib/utils";

/** Lightweight practice row — typing feedback only (not legal validation). */
export function PetitionPracticeLine() {
  const [printed, setPrinted] = useState("");
  const tip = useMemo(() => {
    const t = printed.trim();
    if (!t) return "Type a sample printed name.";
    if (t.length < 3) return "A bit longer — think full name.";
    if (!/[a-zA-Z]/.test(t)) return "Use letters so it’s readable.";
    if (t.length > 40) return "Good length — if this were tiny or cursive, verification slows down.";
    return "Looks legible — match your voter record spelling when you sign for real.";
  }, [printed]);

  return (
    <Card className="rounded-2xl border-primary/20 bg-primary/[0.04] p-6">
      <h3 className="font-display text-lg font-bold text-foreground">Practice line (optional)</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Try printing a name the way you would on paper — this is a safe sandbox, not an official record.
      </p>
      <div className="mt-4 space-y-2">
        <Label htmlFor="practice-printed">Printed name</Label>
        <Input
          id="practice-printed"
          value={printed}
          onChange={(e) => setPrinted(e.target.value)}
          placeholder="e.g. Sam Rivera"
          autoComplete="off"
        />
      </div>
      <p className={cn("mt-3 text-sm font-medium", tip.includes("Looks") ? "text-emerald-700" : "text-muted-foreground")}>
        {tip}
      </p>
    </Card>
  );
}

export function PetitionConfidenceQuiz() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [show, setShow] = useState(false);

  const correct = useMemo(() => {
    let n = 0;
    for (const q of petitionCoachQuiz) {
      if (answers[q.id] === q.correctIndex) n += 1;
    }
    return n;
  }, [answers]);

  const allAnswered = petitionCoachQuiz.every((q) => answers[q.id] !== undefined);

  return (
    <Card className="rounded-2xl border-border p-6">
      <h3 className="font-display text-lg font-bold text-foreground">Confidence check (3 quick questions)</h3>
      <p className="mt-2 text-sm text-muted-foreground">Tap an answer for each — designed for a calm double-check, not a test score.</p>
      <div className="mt-6 space-y-6">
        {petitionCoachQuiz.map((q) => (
          <fieldset key={q.id} className="space-y-2">
            <legend className="text-sm font-semibold text-foreground">{q.prompt}</legend>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <label
                  key={opt}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 rounded-xl border px-3 py-2 text-sm transition",
                    answers[q.id] === i ? "border-primary bg-primary/5" : "border-border hover:bg-muted/40",
                  )}
                >
                  <input
                    type="radio"
                    className="mt-1"
                    name={q.id}
                    checked={answers[q.id] === i}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button type="button" variant="secondary" onClick={() => setShow(true)} disabled={!allAnswered}>
          Check my answers
        </Button>
        {show ? (
          <p className="text-sm font-medium text-foreground">
            {correct === petitionCoachQuiz.length
              ? "You’re ready to sign — or help someone else with confidence."
              : `You got ${correct} of ${petitionCoachQuiz.length} — review the highlighted steps above or open How to sign.`}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

export function ExplainItBackCard() {
  return (
    <Card className="rounded-2xl border-border bg-muted/20 p-6">
      <h3 className="font-display text-lg font-bold text-foreground">Can you explain it back?</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Adult learning sticks when you say it in your own words. Use these as scripts for doors or the dinner table.
      </p>
      <ul className="mt-4 space-y-4 text-sm">
        <li>
          <strong className="text-foreground">~30 seconds:</strong> “I’m signing so voters can decide whether Jacksonville
          elects ward council seats by neighborhood instead of citywide. I fill my row clearly and sign in front of the
          canvasser.”
        </li>
        <li>
          <strong className="text-foreground">~1 minute:</strong> Add: ID, matching address, Jacksonville in the city
          line, today’s date, and I never touch the canvasser or notary blocks.
        </li>
        <li>
          <strong className="text-foreground">Cheat sheet:</strong> Signature → printed name → birth date → street →
          Jacksonville → date signed → leave official &amp; notary areas blank.
        </li>
      </ul>
    </Card>
  );
}
