export type LeaderboardRow = {
  id: string;
  display_name: string;
  referral_code: string;
  direct_recruits: number;
  downstream_total: number;
  commitment_goal: number;
  created_at: string;
};

export type WardTeamStats = {
  organizer_count: number;
  new_this_week: number;
};

export type MyOrganizerRow = {
  id: string;
  display_name: string;
  referral_code: string;
  commitment_goal: number;
  created_at: string;
};
