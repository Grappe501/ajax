"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AskAjaxPlaceholder } from "@/components/initiative/petition-placeholders";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faqItems, type FaqItem } from "@/content/faq";

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

function filterItems(items: FaqItem[], q: string): FaqItem[] {
  const s = q.trim().toLowerCase();
  if (!s) return items;
  return items.filter(
    (f) =>
      f.question.toLowerCase().includes(s) ||
      f.answer.toLowerCase().includes(s) ||
      f.category.toLowerCase().includes(s),
  );
}

export function InteractiveFaqSection() {
  const [query, setQuery] = useState("");
  const filteredAll = useMemo(() => filterItems(faqItems, query), [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, FaqItem[]>();
    for (const c of categories) {
      map.set(c, filterItems(faqItems.filter((f) => f.category === c), query));
    }
    return map;
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="relative max-w-xl flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search every question and answer…"
            className="pl-10"
            aria-label="Search FAQ"
          />
          {query ? (
            <p className="mt-2 text-xs text-muted-foreground">
              {filteredAll.length} match{filteredAll.length === 1 ? "" : "es"}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 flex-col gap-2 rounded-2xl border border-primary/15 bg-primary/[0.04] p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">Still stuck?</p>
          <AskAjaxPlaceholder prefill="Answer my FAQ-style question about the Jacksonville ward petition and volunteering." />
        </div>
      </div>

      {query.trim() ? (
        <div className="space-y-3">
          <h3 className="font-display text-lg font-bold text-foreground">Search results</h3>
          {filteredAll.length === 0 ? (
            <p className="text-sm text-muted-foreground">No matches — try another word or open the AJAX Guide.</p>
          ) : (
            <Accordion multiple={false} className="space-y-2">
              {filteredAll.map((item, i) => (
                <AccordionItem
                  key={`${item.question}-${i}`}
                  value={`sr-${i}`}
                  className="rounded-2xl border border-border/70 bg-card px-4 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-muted-foreground">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary/80">{item.category}</p>
                    <FaqAnswer text={item.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      ) : (
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
      )}
    </div>
  );
}
