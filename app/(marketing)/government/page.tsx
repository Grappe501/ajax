import type { Metadata } from "next";
import Link from "next/link";

import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { jacksonvilleOfficials } from "@/content/jacksonville-officials";

export const metadata: Metadata = {
  title: "Mayor & City Council",
  description:
    "Jacksonville officeholders, initiative stance, and survey responses — AJAX public accountability pages.",
};

export default function GovernmentIndexPage() {
  const mayor = jacksonvilleOfficials.filter((o) => o.office === "mayor");
  const council = jacksonvilleOfficials.filter((o) => o.office === "council");

  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Mayor & City Council"
        subtitle="Full pages for each officeholder: tenure, news, and where they stand on putting ward-based voting on the ballot."
      />

      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        <section>
          <h2 className="font-display text-lg font-bold text-primary">Mayor</h2>
          <ul className="mt-3 space-y-2">
            {mayor.map((o) => (
              <li key={o.slug}>
                <Link href={`/government/${o.slug}`} className="font-semibold text-primary underline-offset-4 hover:underline">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="font-display text-lg font-bold text-primary">City Council</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {council.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/government/${o.slug}`}
                  className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </SectionShell>
  );
}
