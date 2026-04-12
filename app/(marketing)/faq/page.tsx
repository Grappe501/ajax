import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";
import { FaqSection } from "@/components/sections/faq-section";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about the petition, signing, volunteering, and events.",
};

export default function FaqPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Frequently asked questions"
        subtitle="This hub mirrors the homepage FAQ for easy sharing."
      />
      <FaqSection />
      <div className="mt-10">
        <PrimaryButton href="/">Back to homepage</PrimaryButton>
      </div>
    </SectionShell>
  );
}
