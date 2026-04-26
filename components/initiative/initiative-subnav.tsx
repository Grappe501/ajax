"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const links = [
  { href: "/initiative/voter-status", label: "Voter check" },
  { href: "/initiative/petition-guide", label: "Rule guide" },
  { href: "/initiative/law", label: "Law & history" },
  { href: "/initiative/petition", label: "Petition Coach" },
  { href: "/initiative/language", label: "Initiative language" },
  { href: "/initiative/how-to-sign", label: "How to sign" },
  { href: "/initiative/mistakes", label: "Common mistakes" },
  { href: "/initiative/instructions", label: "Instructions" },
  { href: "/initiative/canvassers", label: "Canvassers" },
  { href: "/initiative/notaries", label: "Notaries" },
  { href: "/initiative/faq", label: "Initiative FAQ" },
] as const;

export function InitiativeSubnav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex flex-wrap gap-2 border-b border-border/80 bg-card/80 pb-3 pt-1 backdrop-blur-sm",
        className,
      )}
      aria-label="Initiative section"
    >
      <Link
        href="/initiative"
        className={cn(
          "rounded-full px-3 py-1.5 text-xs font-semibold transition",
          pathname === "/initiative"
            ? "bg-primary text-primary-foreground"
            : "bg-muted/80 text-muted-foreground hover:bg-muted",
        )}
      >
        Overview
      </Link>
      {links.map((l) => {
        const active = pathname === l.href || pathname?.startsWith(l.href + "/");
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-semibold transition",
              active ? "bg-primary text-primary-foreground" : "bg-muted/80 text-muted-foreground hover:bg-muted",
            )}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
