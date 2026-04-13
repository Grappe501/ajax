import Link from "next/link";

import { Card } from "@/components/ui/card";
import { notaryRelatedLinks } from "@/content/notaryPage";

export function NotaryRelatedLinks() {
  return (
    <section className="space-y-4" aria-labelledby="related-links-heading">
      <h2 id="related-links-heading" className="font-display text-xl font-bold text-foreground">
        {notaryRelatedLinks.title}
      </h2>
      <Card className="rounded-2xl border-border/80 bg-muted/20 p-6">
        <ul className="space-y-3">
          {notaryRelatedLinks.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-base font-medium text-primary underline-offset-4 hover:underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
}
