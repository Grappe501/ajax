import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { OfficialStanceBanner } from "@/components/government/official-stance-banner";
import { SectionShell } from "@/components/layout/section-shell";
import { getOfficialBySlug, officialSurvey } from "@/content/jacksonville-officials";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const o = getOfficialBySlug(slug);
  return { title: o ? o.name : "Official" };
}

export default async function OfficialPage({ params }: Props) {
  const { slug } = await params;
  const o = getOfficialBySlug(slug);
  if (!o) notFound();

  return (
    <div className="min-h-[50vh]">
      <OfficialStanceBanner stance={o.stance} name={o.name} />
      <SectionShell className="py-10">
        <nav className="text-sm text-muted-foreground">
          <Link href="/government" className="font-semibold text-primary hover:underline">
            ← Mayor & Council
          </Link>
        </nav>
        <h1 className="font-display mt-6 text-3xl font-bold text-primary md:text-4xl">{o.name}</h1>
        <p className="mt-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {o.office === "mayor" ? "Executive" : "Legislative"} · Jacksonville, Arkansas
        </p>
        {o.wardLabel ? (
          <p className="mt-1 text-sm text-muted-foreground">
            Ward: {o.wardLabel}
            {o.position ? ` · Position ${o.position}` : ""}
          </p>
        ) : null}

        <section className="mt-8 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-primary">In office</h2>
          <p className="mt-2 text-muted-foreground">{o.yearsInOfficeNote}</p>
          {o.stanceNote ? <p className="mt-3 text-sm text-muted-foreground">{o.stanceNote}</p> : null}
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-primary">Overview</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">{o.summary}</p>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold text-primary">In the news</h2>
          {o.newsHighlights.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">
              Headlines will be curated from public sources — nothing listed yet.
            </p>
          ) : (
            <ul className="mt-3 list-inside list-disc space-y-2 text-muted-foreground">
              {o.newsHighlights.map((n, i) => (
                <li key={i}>
                  {n.url ? (
                    <a href={n.url} className="text-primary underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
                      {n.headline}
                    </a>
                  ) : (
                    n.headline
                  )}
                  {n.year ? ` (${n.year})` : ""}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6">
          <h2 className="font-display text-lg font-bold text-primary">Initiative questionnaire</h2>
          <p className="mt-2 text-sm text-muted-foreground">{officialSurvey.intro}</p>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
            {officialSurvey.questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted-foreground">
            Answers will appear in this section when returned. Sent via campaign email — not an automated public form.
          </p>
        </section>
      </SectionShell>
    </div>
  );
}
