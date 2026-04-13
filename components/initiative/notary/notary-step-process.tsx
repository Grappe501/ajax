import { notaryProcessSteps } from "@/content/notaryPage";

export function NotaryStepProcess() {
  return (
    <section className="space-y-6" aria-labelledby="notary-steps-heading">
      <h2 id="notary-steps-heading" className="font-display text-2xl font-bold text-foreground">
        {notaryProcessSteps.title}
      </h2>
      <ol className="space-y-5">
        {notaryProcessSteps.steps.map((step, i) => (
          <li key={i} className="flex gap-4">
            <span
              className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/10 text-sm font-bold text-primary"
              aria-hidden
            >
              {i + 1}
            </span>
            <p className="pt-1 text-sm leading-relaxed text-muted-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
