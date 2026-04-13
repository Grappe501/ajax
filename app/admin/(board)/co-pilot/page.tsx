import type { Metadata } from "next";

import { CoPilotPanel } from "@/components/admin/co-pilot-panel";

export const metadata: Metadata = {
  title: "Co-pilot",
};

export default function AdminCoPilotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-white">Campaign co-pilot</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400">
          Strategic partner for coordinators — uses{" "}
          <strong className="text-zinc-300">database pulse metrics</strong> (event moderation, organizer
          counts) plus your question. It does{" "}
          <strong className="text-zinc-300">not</strong> read private voter canvass rows or Netlify form
          exports unless you paste them. Keep legal decisions with counsel and the city clerk.
        </p>
      </div>
      <CoPilotPanel />
    </div>
  );
}
