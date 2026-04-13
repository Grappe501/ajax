import type { Metadata } from "next";
import Link from "next/link";

import { InitiativePageShell } from "@/components/initiative/initiative-page-shell";
import { PrimaryButton } from "@/components/cta/primary-button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Why signatures get rejected",
  description:
    "The most common reasons petition lines fail verification — and how to avoid them before you sign.",
};

const reasons = [
  {
    title: "Not registered or wrong address",
    body:
      "Municipal petitions usually require voters registered inside the city. If your registration is out of date or outside Jacksonville, the line may not count.",
  },
  {
    title: "Illegible printed name",
    body:
      "If staff cannot match your printed name to the voter file, the signature can be challenged. Print clearly in block letters.",
  },
  {
    title: "Incomplete or wrong residence",
    body:
      "Missing street number, using a mailing address when residence is required, or the wrong city can invalidate a line.",
  },
  {
    title: "Missing birth date or unreadable date",
    body:
      "Date of birth is part of identifying the signer. Blank or ambiguous dates cause problems.",
  },
  {
    title: "Signed outside the canvasser’s presence",
    body:
      "When the instructions require signing in front of the circulator, signatures obtained otherwise may not count.",
  },
  {
    title: "Duplicate or improper extra signatures",
    body:
      "Signing more than once on the same measure when not allowed, or other duplication issues, can void lines.",
  },
] as const;

export default function InitiativeMistakesPage() {
  return (
    <InitiativePageShell>
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Initiative</p>
        <h1 className="font-display mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Top reasons signatures fail
        </h1>
        <p className="mt-3 text-muted-foreground">
          This is not a substitute for the official instruction sheet — it answers the fear most signers have:{" "}
          <strong className="font-medium text-foreground">will my line count?</strong> Use the Petition Coach to practice
          before you use real ink.
        </p>
      </header>
      <div className="space-y-4">
        {reasons.map((r) => (
          <Card key={r.title} className="rounded-2xl border-border/80 p-5">
            <h2 className="font-display text-base font-bold text-primary">{r.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
          </Card>
        ))}
      </div>
      <div className="mt-12 flex flex-wrap gap-3">
        <PrimaryButton href="/initiative/petition">Open Petition Coach</PrimaryButton>
        <PrimaryButton href="/initiative/how-to-sign" variant="secondary">
          How to sign
        </PrimaryButton>
      </div>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link href="/initiative/instructions" className="font-semibold text-primary underline-offset-4 hover:underline">
          Full official instructions
        </Link>
      </p>
    </InitiativePageShell>
  );
}
