"use client";

import { ChevronUp, Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { DashboardAgentPanel } from "@/components/agents/dashboard-agent-panel";
import { getAdminAgentForPath } from "@/lib/agents/admin-agent-routes";
import { cn } from "@/lib/utils";

export function AdminFloatingAgent() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const meta = useMemo(() => getAdminAgentForPath(pathname ?? ""), [pathname]);

  if (!meta) return null;

  return (
    <div className="pointer-events-none fixed bottom-0 right-0 z-40 p-4 md:p-6">
      <div
        className={cn(
          "pointer-events-auto ml-auto flex max-h-[min(92dvh,720px)] w-full max-w-[min(100vw-2rem,420px)] flex-col overflow-hidden rounded-t-2xl border border-white/15 bg-[#070f1c] shadow-2xl transition-[max-height] duration-300 md:rounded-2xl",
          open ? "max-h-[min(92dvh,720px)]" : "max-h-14",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#0a1524] px-4 py-3 text-left"
        >
          <span className="flex items-center gap-2 font-display text-sm font-bold text-[#fdb913]">
            <Sparkles className="size-4" aria-hidden />
            {meta.label}
          </span>
          <ChevronUp
            className={cn("size-5 text-zinc-400 transition-transform", open ? "rotate-180" : "")}
            aria-hidden
          />
        </button>
        {open ? (
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <DashboardAgentPanel
              variant="admin"
              agentId={meta.id}
              title={`${meta.label} · ops`}
              subtitle="Live pulse tools — confirm anything critical with your team."
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
