import type { Metadata } from "next";
import Link from "next/link";

import { HostLocationForm } from "@/components/forms/host-location-form";
import { SigningAlertsForm } from "@/components/forms/signing-alerts-form";
import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";

export const metadata: Metadata = {
  title: "Get involved",
  description:
    "Signing alerts, host a table, and other ways to stay connected with the AJAX campaign.",
};

export default function ConnectPage() {
  return (
    <>
      <SectionShell className="min-h-[40vh]">
        <SectionHeading
          eyebrow="Stay connected"
          title="Get involved"
          subtitle="Alerts for signing opportunities, hosting a location, and pathways to leadership — each with its own form so coordinators can follow up quickly."
        />
      </SectionShell>
      <SectionShell id="signing-alerts" muted>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Get signing alerts"
              subtitle="Reminders for signing opportunities, pop-up tables, and drive-and-sign events near you."
              className="!mb-6"
            />
            <SigningAlertsForm />
          </div>
          <div id="host-location">
            <SectionHeading
              title="Host a signing location"
              subtitle="Churches, businesses, and community spaces help voters participate on their schedule."
              className="!mb-6"
            />
            <HostLocationForm />
          </div>
        </div>
      </SectionShell>
      <SectionShell>
        <p className="text-center text-muted-foreground">
          Ready to help lead a ward team or coordinate outreach?{" "}
          <Link
            href="/lead"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Leadership interest form
          </Link>
        </p>
      </SectionShell>
    </>
  );
}
