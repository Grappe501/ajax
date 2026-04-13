import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FolderOpen,
  GraduationCap,
  HelpCircle,
  MapPin,
  ScrollText,
  Scale,
  TrendingUp,
} from "lucide-react";

import { SectionHeading } from "@/components/layout/section-heading";
import { SectionShell } from "@/components/layout/section-shell";

const links = [
  {
    href: "/initiative",
    title: "Initiative (shareable)",
    description: "Plain-language explainer for neighbors — why sign, then join the hub.",
    icon: ScrollText,
  },
  {
    href: "/campaign",
    title: "The campaign",
    description: "What the petition does and how Jacksonville’s system works today.",
    icon: BookOpen,
  },
  {
    href: "/why-it-matters",
    title: "Why it matters",
    description: "Neighborhood voice, accountability, and fairer elections.",
    icon: MapPin,
  },
  {
    href: "/rules",
    title: "Petition rules",
    description: "Field procedures, VoterView, witnessing, and turn-in.",
    icon: Scale,
  },
  {
    href: "/training",
    title: "Training center",
    description: "Modules and materials for volunteers (rolling out).",
    icon: GraduationCap,
  },
  {
    href: "/events",
    title: "Events",
    description: "Signing opportunities and community touchpoints.",
    icon: Calendar,
  },
  {
    href: "/movement",
    title: "Movement",
    description: "Momentum, stories, and partners — updated as we grow.",
    icon: TrendingUp,
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Answers by topic — petition, signing, volunteering.",
    icon: HelpCircle,
  },
  {
    href: "/resources",
    title: "Resources",
    description: "Downloads and links for volunteers.",
    icon: FolderOpen,
  },
] as const;

export function HomeQuickLinks() {
  return (
    <SectionShell>
      <SectionHeading
        eyebrow="Explore"
        title="The full site"
        subtitle="Every major topic lives on its own page so we can add depth, media, and tools without crowding a single scroll."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-ajax"
          >
            <item.icon
              className="size-5 text-primary opacity-80 group-hover:opacity-100"
              aria-hidden
            />
            <p className="mt-3 font-display text-sm font-bold text-foreground group-hover:text-primary">
              {item.title}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
