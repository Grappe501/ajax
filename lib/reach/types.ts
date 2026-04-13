export type VoterDirectoryRow = {
  id: string;
  ward_slug: string;
  display_name: string;
  address_line: string | null;
  city: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
};

export type ReachOutListRow = {
  id: string;
  organizer_id: string;
  voter_directory_entry_id: string | null;
  display_name: string;
  address_line: string | null;
  city: string | null;
  zip: string | null;
  phone: string | null;
  email: string | null;
  notes: string | null;
  created_at: string;
};
