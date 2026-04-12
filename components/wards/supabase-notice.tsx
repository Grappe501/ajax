import { AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";

export function SupabaseNotice() {
  return (
    <Card className="rounded-2xl border-dashed border-amber-500/50 bg-amber-50/80 p-5 text-sm text-amber-950 dark:bg-amber-950/20 dark:text-amber-100">
      <div className="flex gap-3">
        <AlertTriangle className="size-5 shrink-0" aria-hidden />
        <div>
          <p className="font-display font-bold">Connect Supabase to activate this board</p>
          <p className="mt-1 text-pretty opacity-90">
            Add{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>
            , run the SQL in{" "}
            <code className="rounded bg-black/5 px-1 py-0.5 text-xs dark:bg-white/10">
              supabase/migrations
            </code>
            , and configure Auth redirect URLs (magic link) to include your site
            origin and <code className="text-xs">/auth/callback</code>.
          </p>
        </div>
      </div>
    </Card>
  );
}
