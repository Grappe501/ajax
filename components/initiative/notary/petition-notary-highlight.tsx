import Image from "next/image";
import Link from "next/link";

import { PrimaryButton } from "@/components/cta/primary-button";
import { Card } from "@/components/ui/card";
import { notaryRegionOnDiagram, petitionNotaryHighlight } from "@/content/notaryPage";
export function PetitionNotaryHighlight() {
  const { leftPct, topPct, widthPct, heightPct } = notaryRegionOnDiagram;

  return (
    <section
      id={petitionNotaryHighlight.sectionId}
      className="scroll-mt-24 space-y-6"
      aria-labelledby="petition-notary-title"
    >
      <div>
        <h2 id="petition-notary-title" className="font-display text-2xl font-bold text-foreground">
          {petitionNotaryHighlight.title}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{petitionNotaryHighlight.description}</p>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/80 p-0 shadow-sm">
        <figure className="relative w-full bg-muted/30">
          <div className="relative mx-auto max-w-2xl">
            <Image
              src={petitionNotaryHighlight.imageSrc}
              alt={petitionNotaryHighlight.imageAlt}
              width={612}
              height={792}
              className="h-auto w-full object-contain"
              priority
            />
            {/* Highlight over notary rectangle — matches SVG layout; purely visual; see text list below. */}
            <div
              className="pointer-events-none absolute rounded-sm border-2 border-primary bg-primary/10 shadow-[0_0_0_4px_rgba(0,45,98,0.12)]"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                width: `${widthPct}%`,
                height: `${heightPct}%`,
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute rounded bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow sm:text-xs"
              style={{
                left: `calc(${leftPct}% + 4px)`,
                top: `calc(${topPct}% - 28px)`,
              }}
              aria-hidden
            >
              {petitionNotaryHighlight.overlayLabel}
            </div>
          </div>
          <figcaption className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground sm:px-6">
            <strong className="font-medium text-foreground">Text alternative:</strong> the notary block is the lower-right
            rectangle on page 1, next to the canvasser affidavit. The gold-tinted boxes at the top of the sheet are for
            official use — not for notaries or signers.
          </figcaption>
        </figure>
      </Card>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wide text-muted-foreground">Fields in the notary section</h3>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          {petitionNotaryHighlight.fieldLabels.map((f, i) => (
            <div
              key={f.id}
              className="flex gap-3 rounded-xl border border-border/70 bg-card px-3 py-2.5 text-sm shadow-sm"
            >
              <dt className="font-mono text-xs tabular-nums text-primary">{i + 1}.</dt>
              <dd className="leading-snug text-foreground">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <PrimaryButton href={petitionNotaryHighlight.fullGuideHref} className="justify-center sm:inline-flex">
          {petitionNotaryHighlight.fullGuideCta}
        </PrimaryButton>
        <p className="mt-3 text-sm text-muted-foreground">
          In the guide, open the <Link className="font-medium text-primary underline-offset-4 hover:underline" href="/initiative/petition">notary hotspot</Link>{" "}
          for field-level notes.
        </p>
      </div>
    </section>
  );
}
