import { PrimaryButton } from "@/components/cta/primary-button";
import { SecondaryButton } from "@/components/cta/secondary-button";
import { AskAjaxPlaceholder, ReadAloudPlaceholder } from "@/components/initiative/petition-placeholders";
import { notaryHero } from "@/content/notaryPage";

export function NotaryHero() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/[0.07] via-card to-[#fdb913]/10 p-8 shadow-sm sm:p-10"
      aria-labelledby="notary-hero-title"
    >
      <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl" aria-hidden />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{notaryHero.eyebrow}</p>
      <h1
        id="notary-hero-title"
        className="font-display mt-3 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
      >
        {notaryHero.title}
      </h1>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{notaryHero.subtitle}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <ReadAloudPlaceholder label="Read this section aloud (soon)" />
        <AskAjaxPlaceholder prefill="What does a notary complete on the Jacksonville ward petition? Where do I sign?" />
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <PrimaryButton href={notaryHero.primaryHref} className="justify-center">
          {notaryHero.primaryCta}
        </PrimaryButton>
        <SecondaryButton href={notaryHero.secondaryHref} className="justify-center">
          {notaryHero.secondaryCta}
        </SecondaryButton>
      </div>
    </section>
  );
}
