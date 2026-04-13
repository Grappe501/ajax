"use client";

import { Sparkles } from "lucide-react";

import { PrimaryButton } from "@/components/cta/primary-button";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";
import { ASSISTANT_QUICK_PROMPTS } from "@/content/assistant-knowledge";
import { useAssistant } from "@/components/assistant/assistant-context";

export function AssistantSpotlight() {
  const { openAssistant } = useAssistant();

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-gradient-to-b from-[#001a35] via-[#002d62] to-[#001a35] text-primary-foreground">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(253,185,19,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <SectionShell className="relative py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
              <Sparkles className="size-4 text-accent" aria-hidden />
              Live help
            </div>
            <SectionHeading
              align="left"
              className="mb-0 mt-6 [&_h2]:text-white [&_h2]:drop-shadow-sm [&_p]:text-primary-foreground/85"
              title="Questions before you take the next step?"
              subtitle="Open the AJAX Guide anytime — it answers from approved campaign content, points you to rules and FAQs, and never replaces a lawyer or election official for legal specifics."
            />
            <PrimaryButton
              type="button"
              className="mt-8 border border-accent/40 bg-accent text-accent-foreground shadow-ajax-gold hover:bg-ajax-gold-soft"
              onClick={() => {
                openAssistant();
              }}
            >
              Chat with AJAX Guide
            </PrimaryButton>
          </div>
          <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur-md md:p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">Try asking</p>
            <ul className="mt-4 flex flex-col gap-2">
              {ASSISTANT_QUICK_PROMPTS.map((p) => (
                <li key={p}>
                  <button
                    type="button"
                    onClick={() => openAssistant(p)}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-medium text-white transition hover:border-accent/40 hover:bg-white/10"
                  >
                    “{p}”
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}
