import Link from "next/link";

import { site } from "@/content/site";

export function ConstituentFooter() {
  return (
    <footer className="border-t border-border bg-muted/40 py-10">
      <div className="mx-auto max-w-3xl px-4 text-center text-sm text-muted-foreground sm:px-6">
        <p>
          Part of the{" "}
          <span className="font-semibold text-foreground">{site.name}</span> — ward-based
          representation for Jacksonville.
        </p>
        <p className="mt-3">
          <Link href="/" className="font-semibold text-primary underline-offset-4 hover:underline">
            Volunteer Hub home
          </Link>
          <span className="mx-2 text-border">·</span>
          <a
            href={`mailto:${site.footer.email}`}
            className="font-medium underline-offset-4 hover:underline"
          >
            {site.footer.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
