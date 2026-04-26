import type { Metadata } from "next";

import { InitiativeSubnav } from "@/components/initiative/initiative-subnav";
import { DrillDownShell, ProseBlock } from "@/components/initiative/drill-down-shell";
import { buttonVariants } from "@/components/ui/button";
import { voterLookup } from "@/content/voter-lookup";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Check your voter registration",
  description:
    "Use Arkansas VoterView, confirm Jacksonville city limits, and make sure your signature will count before you sign the AJAX petition.",
};

export default function VoterStatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <InitiativeSubnav className="mb-10" />
      <DrillDownShell
        className="px-0 py-0 sm:px-0 sm:py-0"
        eyebrow="Official tools"
        title="Voter lookup — do this first"
        subtitle="The Secretary of State hosts VoterView. AJAX volunteers use it before every signature to protect signers and protect the petition."
        crumbs={[
          { label: "Initiative", href: "/initiative" },
          { label: "Voter lookup", href: "/initiative/voter-status" },
        ]}
        showDisclaimer
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <a
            href={voterLookup.voterviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "inline-flex justify-center rounded-xl px-6 font-semibold shadow-sm",
            )}
          >
            Open VoterView (official)
          </a>
          <a
            href={voterLookup.sosVoterHubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "inline-flex justify-center rounded-xl px-6 font-semibold shadow-sm",
            )}
          >
            SOS voter information hub
          </a>
        </div>

        <ProseBlock heading="Why this is step zero" kicker="Field discipline">
          <p>
            Petitions are easier to disqualify than most people think. Checking registration first respects the signer’s
            time and keeps AJAX’s totals honest.
          </p>
        </ProseBlock>

        <div className="space-y-6">
          {voterLookup.steps.map((s) => (
            <ProseBlock key={s.title} heading={s.title} kicker="Checklist">
              <p>{s.body}</p>
            </ProseBlock>
          ))}
        </div>

        <ProseBlock heading="Need to register or update an address?" kicker="Next steps">
          <p>
            Use the{" "}
            <a
              href={voterLookup.registrationPdfUrl}
              className="font-semibold text-primary underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              official Arkansas registration application (PDF)
            </a>
            , online registration if you qualify, or the Pulaski County clerk — update your address before signing so the
            petition line matches VoterView.
          </p>
        </ProseBlock>
      </DrillDownShell>
    </div>
  );
}
