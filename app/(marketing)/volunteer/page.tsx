import type { Metadata } from "next";

import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/layout/section-heading";
import { PrimaryButton } from "@/components/cta/primary-button";
import { VolunteerSignupForm } from "@/components/forms/volunteer-signup-form";

export const metadata: Metadata = {
  title: "Volunteer",
  description: "Join the AJAX volunteer team in Jacksonville.",
};

export default function VolunteerPage() {
  return (
    <SectionShell className="min-h-[50vh]">
      <SectionHeading
        title="Volunteer with AJAX"
        subtitle="Tell us how you want to help — the same Netlify form as the homepage lives here for easy sharing and coordinator follow-up."
      />
      <VolunteerSignupForm />
      <div className="mt-10">
        <PrimaryButton href="/">Explore the full volunteer landing page</PrimaryButton>
      </div>
    </SectionShell>
  );
}
