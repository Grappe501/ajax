import Link from "next/link";

export default function FieldLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-card/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="font-display text-sm font-bold text-primary sm:text-base">
            AJAX Volunteer Hub
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-xs font-semibold text-muted-foreground sm:text-sm">
            <Link href="/volunteer" className="transition hover:text-primary">
              Volunteer
            </Link>
            <Link href="/events" className="transition hover:text-primary">
              Events
            </Link>
            <Link href="/rules" className="transition hover:text-primary">
              Rules
            </Link>
          </nav>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</div>
    </div>
  );
}
