"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  HeartHandshake,
  LayoutDashboard,
  Mail,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";

import type { CampaignAdminRole } from "@/lib/admin/auth";
import { cn } from "@/lib/utils";

const nav: {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  match?: "exact";
}[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, match: "exact" },
  { href: "/admin/volunteers", label: "Volunteers", icon: HeartHandshake },
  { href: "/admin/approvals", label: "Approvals", icon: CheckSquare },
  { href: "/admin/outreach", label: "Outreach queue", icon: Mail },
  { href: "/admin/team", label: "Team & roles", icon: Users },
  { href: "/admin/co-pilot", label: "Co-pilot", icon: Sparkles },
];

export function AdminShell({
  children,
  role,
  email,
}: {
  children: React.ReactNode;
  role: CampaignAdminRole;
  email: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-dvh flex-col bg-[#050a12] text-zinc-100 md:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-b border-white/10 bg-[#070f1c] md:w-64 md:border-b-0 md:border-r">
        <div className="border-b border-white/10 px-5 py-6">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-[#fdb913]">
            AJAX Command
          </p>
          <p className="mt-1 font-display text-lg font-bold tracking-tight text-white">Operations board</p>
          <p className="mt-2 truncate text-xs text-zinc-500">{email ?? "Signed in"}</p>
          <p className="mt-1 inline-flex rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
            {role}
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3">
          {nav.map((item) => {
            const active =
              item.match === "exact" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition",
                  active
                    ? "bg-[#fdb913]/15 text-[#fdb913]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100",
                )}
              >
                <item.icon className="size-4 shrink-0 opacity-90" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            className="text-xs font-medium text-zinc-500 transition hover:text-zinc-300"
          >
            ← Public site
          </Link>
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <header className="flex items-center justify-between border-b border-white/10 bg-[#070f1c]/80 px-4 py-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-2 text-zinc-500">
            <Radio className="size-4" aria-hidden />
            <span className="text-xs font-medium uppercase tracking-wider">Operations</span>
          </div>
        </header>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
