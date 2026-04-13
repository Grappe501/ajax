import type { AdminAgentId } from "@/lib/agents/personas";

/** Maps admin board pathname to specialist agent. Co-pilot page uses full-screen co-pilot only. */
export function getAdminAgentForPath(pathname: string): { id: AdminAgentId; label: string } | null {
  if (pathname.startsWith("/admin/co-pilot")) return null;
  if (pathname === "/admin" || pathname === "/admin/") {
    return { id: "ajax_ops", label: "Ajax" };
  }
  if (pathname.startsWith("/admin/volunteers")) {
    return { id: "dawn_ops", label: "Dawn" };
  }
  if (pathname.startsWith("/admin/approvals")) {
    return { id: "ivory", label: "Ivory" };
  }
  if (pathname.startsWith("/admin/outreach")) {
    return { id: "comet_ops", label: "Comet" };
  }
  if (pathname.startsWith("/admin/team")) {
    return { id: "agent409", label: "Agent409" };
  }
  return { id: "ajax_ops", label: "Ajax" };
}
