import type { MyOrganizerRow, WardTeamStats } from "@/lib/organizing/types";
import type { ReachOutListRow } from "@/lib/reach/types";

export function mockOrganizerRow(wardSlug: string): MyOrganizerRow {
  return {
    id: "demo-organizer-id",
    display_name: "Demo Organizer",
    referral_code: `DEMO-${wardSlug.toUpperCase().replace(/-/g, "")}`,
    commitment_goal: 5,
    created_at: new Date().toISOString(),
  };
}

export function mockWardStats(): WardTeamStats {
  return { organizer_count: 12, new_this_week: 3 };
}

export function mockReachList(wardSlug: string): ReachOutListRow[] {
  const t = new Date().toISOString();
  return [
    {
      id: "reach-1",
      organizer_id: "demo-organizer-id",
      voter_directory_entry_id: null,
      display_name: "Alex Rivera",
      address_line: "1200 Main St",
      city: "Jacksonville",
      zip: "72076",
      phone: "5015550100",
      email: null,
      notes: "Demo row — connect Supabase for live data.",
      created_at: t,
    },
    {
      id: "reach-2",
      organizer_id: "demo-organizer-id",
      voter_directory_entry_id: null,
      display_name: "Jordan Lee",
      address_line: "88 Oak Ave",
      city: "Jacksonville",
      zip: "72076",
      phone: null,
      email: "jordan@example.com",
      notes: null,
      created_at: t,
    },
  ];
}
