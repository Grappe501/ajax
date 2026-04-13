import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notaryFaqItems, notaryFaqMeta } from "@/content/notaryFaq";

export function NotaryFaqAccordion() {
  return (
    <section className="space-y-4" aria-labelledby="notary-faq-heading">
      <h2 id="notary-faq-heading" className="font-display text-2xl font-bold text-foreground">
        {notaryFaqMeta.title}
      </h2>
      <Accordion multiple={false} className="w-full space-y-2">
        {notaryFaqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="rounded-xl border border-border/70 bg-card px-3 shadow-sm"
          >
            <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-sm leading-relaxed text-muted-foreground">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
