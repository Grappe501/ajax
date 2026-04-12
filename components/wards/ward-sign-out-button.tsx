"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { createSupabaseBrowser } from "@/lib/supabase/client";

export function WardSignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createSupabaseBrowser();
    if (supabase) await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <Button type="button" variant="ghost" size="sm" className="text-muted-foreground" onClick={signOut}>
      Sign out
    </Button>
  );
}
