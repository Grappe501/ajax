"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const CanvassMapClient = dynamic(
  () => import("./canvass-map-client").then((m) => m.CanvassMapClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
      </div>
    ),
  },
);

export function CanvassMapShell({ apiKey }: { apiKey: string }) {
  return <CanvassMapClient apiKey={apiKey} />;
}
