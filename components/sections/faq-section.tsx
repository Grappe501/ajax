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
      <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-2 bg-muted/50 p-2">
        {categories.map((c) => (
          <TabsTrigger
            key={c}
            value={c}
            className="rounded-lg px-3 py-2 text-left text-xs font-semibold sm:text-sm"
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
                className="rounded-xl border border-border/80 bg-card px-4"
              >
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
      ))}
    </Tabs>
  );
}
