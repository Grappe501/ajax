"use client";

import { useMemo } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqItems } from "@/content/faq";

function FaqAnswer({ text }: { text: string }) {
  const parts = text.split("\n\n").filter(Boolean);
  return (
    <div className="space-y-3">
      {parts.map((para, idx) => (
        <p key={idx} className="leading-relaxed">
          {para}
        </p>
      ))}
    </div>
  );
}

const categories = [
  "About the Petition",
  "About Signing",
  "About Volunteering",
  "About the Law and Process",
  "About Events and Locations",
] as const;

export function FaqSection() {
  const grouped = useMemo(() => {
    const map = new Map<string, typeof faqItems>();
    for (const c of categories) {
      map.set(c, faqItems.filter((f) => f.category === c));
    }
    return map;
  }, []);

  return (
    <Tabs defaultValue={categories[0]} className="w-full">
      <TabsList className="mb-8 flex h-auto w-full flex-wrap justify-start gap-2 rounded-2xl border border-border/60 bg-white/90 p-2 shadow-inner shadow-primary/[0.06] backdrop-blur-sm">
        {categories.map((c) => (
          <TabsTrigger
            key={c}
            value={c}
            className="rounded-xl px-3 py-2.5 text-left text-xs font-bold transition sm:px-4 sm:text-sm data-active:bg-primary data-active:text-primary-foreground data-active:shadow-md"
          >
            {c.replace("About ", "")}
          </TabsTrigger>
        ))}
      </TabsList>
      {categories.map((c) => (
        <TabsContent key={c} value={c} className="mt-0">
          <Accordion multiple={false} className="space-y-3">
            {(grouped.get(c) ?? []).map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`${c}-${i}`}
                className="rounded-2xl border border-border/70 bg-card/95 px-4 shadow-sm transition-shadow data-[state=open]:border-primary/20 data-[state=open]:shadow-ajax"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  <FaqAnswer text={item.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
