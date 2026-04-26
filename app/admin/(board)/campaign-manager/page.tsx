import type { Metadata } from "next";
import Link from "next/link";

import {
  COMMS_PASS_THROUGH_MARKUP,
  applyCommsMarkup,
  getAjaxDonateUrl,
} from "@/config/campaign-external";

export const metadata: Metadata = {
  title: "Campaign manager",
};

/** Sample numbers — wire to Supabase `comms_vendor_ledger` + finance tables. */
const SAMPLE_VENDOR_MTD = { twilioUsd: 127.4, sendgridUsd: 48.2 };
const GRANT = { awardUsd: 25_000, recognizedSpendUsd: 10_000, remainingUsd: 15_000 };

const SAMPLE_BUDGET_LINES = [
  { line: "Paid social (Meta / boosting)", usd: 5_000, note: "Geo-fenced Jacksonville + ward creatives" },
  { line: "Local newspaper & print", usd: 3_500, note: "Display + legal notices as required" },
  { line: "SMS / voice (Twilio) — metered", usd: 2_000, note: "Ward + block captains; billed cost + 25%" },
  { line: "Email (SendGrid) — metered", usd: 800, note: "Surveys to officials + organizer blasts" },
  { line: "Events & house parties", usd: 1_800, note: "Supplies, venues, notary days" },
  { line: "Canvass / phone bank ops", usd: 1_200, note: "Lists, handouts, dialer stipends" },
  { line: "Ethics / compliance / filings", usd: 500, note: "FPPC-style logs, treasurer workflow" },
  { line: "Reserve & contingencies", usd: 200, note: "Unplanned media or legal review" },
] as const;

export default function CampaignManagerPage() {
  const vendorSum = SAMPLE_VENDOR_MTD.twilioUsd + SAMPLE_VENDOR_MTD.sendgridUsd;
  const billed = applyCommsMarkup(vendorSum);
  const donate = getAjaxDonateUrl();
  const budgetTotal = SAMPLE_BUDGET_LINES.reduce((s, r) => s + r.usd, 0);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col gap-0 md:flex-row">
      <section className="flex min-h-0 w-full flex-col border-b border-white/10 md:w-[42%] md:border-b-0 md:border-r">
        <div className="shrink-0 border-b border-white/10 bg-[#0a1424] px-4 py-3">
          <h1 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#fdb913]">
            Comms meter
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            Pass-through billing: vendor invoice × (1 + {Math.round(COMMS_PASS_THROUGH_MARKUP * 100)}%) to campaign.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 md:p-5">
          <div className="grid gap-3">
            <MeterCard
              label="Twilio (MTD sample)"
              sub="SMS segments, voice minutes — from vendor dashboard"
              value={`$${SAMPLE_VENDOR_MTD.twilioUsd.toFixed(2)}`}
            />
            <MeterCard
              label="SendGrid (MTD sample)"
              sub="Email sends — from vendor dashboard"
              value={`$${SAMPLE_VENDOR_MTD.sendgridUsd.toFixed(2)}`}
            />
            <div className="rounded-xl border border-[#fdb913]/40 bg-[#fdb913]/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#fdb913]">Billable to campaign (sample)</p>
              <p className="mt-2 font-display text-3xl font-bold text-white">${billed.toFixed(2)}</p>
              <p className="mt-1 text-xs text-zinc-400">
                Raw vendor: ${vendorSum.toFixed(2)} · includes {Math.round(COMMS_PASS_THROUGH_MARKUP * 100)}% operations
                fee
              </p>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              Ward captains and block captains use the same Twilio / SendGrid project once provisioned; usage rolls up here.
              Connect live APIs in the next sprint.
            </p>
          </div>
        </div>
      </section>

      <section className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-white/10 bg-[#0a1424] px-4 py-3">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#fdb913]">
            Grant & sample budget
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            NAACP grant (illustrative): ${GRANT.awardUsd.toLocaleString()} award · $
            {GRANT.recognizedSpendUsd.toLocaleString()} recognized spend ·{" "}
            <strong className="text-zinc-300">${GRANT.remainingUsd.toLocaleString()} remaining</strong> for planning.
          </p>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-4 md:flex md:gap-4 md:p-5">
          <div className="min-w-0 flex-1 space-y-4">
            <div className="rounded-xl border border-white/10 bg-[#070f1c] p-4">
              <h3 className="font-display text-xs font-bold uppercase tracking-wide text-zinc-400">
                Sample allocation ({budgetTotal.toLocaleString()} / {GRANT.remainingUsd.toLocaleString()} shown)
              </h3>
              <table className="mt-3 w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase text-zinc-500">
                    <th className="py-2 pr-2">Line</th>
                    <th className="py-2 pr-2">$</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_BUDGET_LINES.map((row) => (
                    <tr key={row.line} className="border-b border-white/5 text-zinc-300">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-white">{row.line}</span>
                        <p className="text-xs text-zinc-500">{row.note}</p>
                      </td>
                      <td className="whitespace-nowrap py-2 tabular-nums text-[#fdb913]">
                        {row.usd.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-3 text-xs text-zinc-500">
                Treasurer will reconcile historical spend against bank + grant reporting before locking categories.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#070f1c] p-4">
              <h3 className="font-display text-xs font-bold uppercase tracking-wide text-zinc-400">
                Ethics & transparency (stub)
              </h3>
              <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-zinc-400">
                <li>Finance dashboard: approvals, vendors, 1099 prep, grant restrictions log.</li>
                <li>FOIA intake chunked in database — see migration `ajax_organizing_intel`.</li>
                <li>Official survey answers published with date + attribution only when authorized.</li>
              </ul>
            </div>
          </div>
          <aside className="mt-4 w-full shrink-0 space-y-3 md:mt-0 md:w-56">
            <Link
              href={donate}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl border border-[#fdb913]/50 bg-[#fdb913]/15 px-4 py-3 text-center text-sm font-bold text-[#fdb913] hover:bg-[#fdb913]/25"
            >
              GoodChange (AJAX) ↗
            </Link>
            <Link
              href="/faith"
              className="block rounded-xl border border-white/10 px-4 py-3 text-center text-xs font-semibold text-zinc-300 hover:bg-white/5"
            >
              Public faith section
            </Link>
            <Link
              href="/government"
              className="block rounded-xl border border-white/10 px-4 py-3 text-center text-xs font-semibold text-zinc-300 hover:bg-white/5"
            >
              Mayor & Council pages
            </Link>
          </aside>
        </div>
      </section>
    </div>
  );
}

function MeterCard({ label, sub, value }: { label: string; sub: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#070f1c] p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-2 font-display text-2xl font-bold text-white">{value}</p>
      <p className="mt-1 text-xs text-zinc-500">{sub}</p>
    </div>
  );
}
