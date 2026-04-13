import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { JACKSONVILLE_AR_REGION } from "@/lib/canvass/jacksonville";
import type { CanvassUnitMarker } from "@/lib/canvass/types";
import { isSupabaseConfigured } from "@/lib/supabase/env";

const MAX_MARKERS = 4000;

function parseBounds(sp: URLSearchParams): {
  north: number;
  south: number;
  east: number;
  west: number;
} | null {
  const north = Number(sp.get("north"));
  const south = Number(sp.get("south"));
  const east = Number(sp.get("east"));
  const west = Number(sp.get("west"));
  if ([north, south, east, west].some((n) => Number.isNaN(n))) return null;
  if (south >= north || west >= east) return null;
  return { north, south, east, west };
}

/** Intersect requested viewport with the Jacksonville campaign region to avoid huge scans. */
function clampToRegion(bounds: {
  north: number;
  south: number;
  east: number;
  west: number;
}): { north: number; south: number; east: number; west: number } | null {
  const south = Math.max(bounds.south, JACKSONVILLE_AR_REGION.minLat);
  const north = Math.min(bounds.north, JACKSONVILLE_AR_REGION.maxLat);
  const west = Math.max(bounds.west, JACKSONVILLE_AR_REGION.minLng);
  const east = Math.min(bounds.east, JACKSONVILLE_AR_REGION.maxLng);
  if (south > north || west > east) return null;
  return { north, south, east, west };
}

export async function GET(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const raw = parseBounds(searchParams);
  if (!raw) {
    return NextResponse.json(
      { error: "Invalid bounds (need north, south, east, west floats)" },
      { status: 400 },
    );
  }

  const b = clampToRegion(raw);
  if (!b) {
    return NextResponse.json({ markers: [] satisfies CanvassUnitMarker[] });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            /* ignore */
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("canvass_units")
    .select(
      "id,lat,lng,address_full,ward_hint,voter_first,voter_last,party,precinct,voter_file_id,turf_tag,notes,is_demo",
    )
    .gte("lat", b.south)
    .lte("lat", b.north)
    .gte("lng", b.west)
    .lte("lng", b.east)
    .limit(MAX_MARKERS);

  if (error) {
    console.error("canvass_units:", error.message);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  return NextResponse.json({ markers: (data ?? []) as CanvassUnitMarker[] });
}
