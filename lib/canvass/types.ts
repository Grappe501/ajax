export type CanvassUnitMarker = {
  id: string;
  lat: number;
  lng: number;
  address_full: string;
  ward_hint: string | null;
  voter_first: string | null;
  voter_last: string | null;
  party: string | null;
  precinct: string | null;
  voter_file_id: string | null;
  turf_tag: string | null;
  notes: string | null;
  is_demo: boolean;
};
