import { notFound } from "next/navigation";

import { isDevPortalEnabled } from "@/lib/dev-mode";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  if (!isDevPortalEnabled()) {
    notFound();
  }
  return <>{children}</>;
}
