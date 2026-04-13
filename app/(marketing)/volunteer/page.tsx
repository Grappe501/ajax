import type { Metadata } from "next";

import { SecondaryButton } from "@/components/cta/secondary-button";
import { VolunteerSignupForm } from "@/components/forms/volunteer-signup-form";
import { LadderSection } from "@/components/marketing/ladder-section";
import { VolunteerStorySection } from "@/components/marketing/volunteer-story-section";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";

export const metadata: Metadata = {
  title: "Volunteer",
  description:
    "How AJAX volunteers power the campaign, ways to step up, and the form to join the team.",
};

export default function VolunteerPage() {
  return (
    <>
      <VolunteerStorySection />
      <LadderSection />
      <SectionShell id="join-form" muted>
        <SectionHeading
          title="Join the volunteer team"
          subtitle="Short form, fast follow-up — tell us how you want to help and we will connect you with the right lead."
        />
        <VolunteerSignupForm />
        <div className="mt-10 flex flex-wrap gap-4">
          <SecondaryButton href="/connect">Get signing alerts or host</SecondaryButton>
          <SecondaryButton href="/training">Training center</SecondaryButton>
          <SecondaryButton href="/wards">Ward teams</SecondaryButton>
        </div>
      </SectionShell>
    </>
  );
}
