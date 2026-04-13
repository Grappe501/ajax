"use client";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { Loader2, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JACKSONVILLE_AR_CENTER } from "@/lib/canvass/jacksonville";
import type { CanvassUnitMarker } from "@/lib/canvass/types";

const IDLE_DEBOUNCE_MS = 450;

export function CanvassMapClient({ apiKey }: { apiKey: string }) {
  const mapDivRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const clustererRef = useRef<MarkerClusterer | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const infoRef = useRef<google.maps.InfoWindow | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const reloadRef = useRef<(() => void) | null>(null);

  const [ready, setReady] = useState(false);
  const [loadState, setLoadState] = useState<"idle" | "loading" | "error">("idle");
  const [count, setCount] = useState(0);
  const [selected, setSelected] = useState<CanvassUnitMarker | null>(null);

  useEffect(() => {
    if (!mapDivRef.current || !apiKey) return;

    let cancelled = false;

    async function loadMarkersForView() {
      const map = mapRef.current;
      if (!map) return;

      const b = map.getBounds();
      if (!b) return;

      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;

      const ne = b.getNorthEast();
      const sw = b.getSouthWest();
      const params = new URLSearchParams({
        north: String(ne.lat()),
        south: String(sw.lat()),
        east: String(ne.lng()),
        west: String(sw.lng()),
      });

      setLoadState("loading");
      try {
        const res = await fetch(`/api/canvass/markers?${params}`, {
          credentials: "same-origin",
          signal: ac.signal,
        });
        if (res.status === 401) {
          setLoadState("error");
          return;
        }
        if (!res.ok) throw new Error("fetch failed");
        const json = (await res.json()) as { markers: CanvassUnitMarker[] };
        if (ac.signal.aborted || cancelled) return;

        const data = json.markers ?? [];
        setCount(data.length);

        clustererRef.current?.clearMarkers();
        markersRef.current.forEach((m) => m.setMap(null));
        markersRef.current = [];
        infoRef.current?.close();

        const g = google.maps;
        const mapInstance = mapRef.current;
        if (!mapInstance) return;

        const newMarkers = data.map((row) => {
          const marker = new g.Marker({
            position: { lat: row.lat, lng: row.lng },
            map: null,
            title: row.address_full,
          });
          marker.addListener("click", () => {
            setSelected(row);
            if (infoRef.current) {
              infoRef.current.setContent(
                `<div style="max-width:240px;padding:4px;font-size:13px;line-height:1.35"><strong>${escapeHtml(row.address_full)}</strong>${row.is_demo ? '<div style="margin-top:6px;font-size:11px;font-weight:700;color:#b45309">DEMO PIN</div>' : ""}</div>`,
              );
              infoRef.current.open({ map: mapInstance, anchor: marker });
            }
          });
          return marker;
        });

        markersRef.current = newMarkers;
        clustererRef.current?.addMarkers(newMarkers);
        setLoadState("idle");
      } catch (e) {
        if ((e as Error).name === "AbortError") return;
        if (!cancelled) setLoadState("error");
      }
    }

    async function boot() {
      setOptions({ key: apiKey, v: "weekly" });
      await importLibrary("maps");

      if (cancelled || !mapDivRef.current) return;

      const g = google.maps;
      const map = new g.Map(mapDivRef.current, {
        center: JACKSONVILLE_AR_CENTER,
        zoom: 13,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });
      mapRef.current = map;
      infoRef.current = new g.InfoWindow();

      const clusterer = new MarkerClusterer({ map, markers: [] });
      clustererRef.current = clusterer;

      const onIdle = () => {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => void loadMarkersForView(), IDLE_DEBOUNCE_MS);
      };

      map.addListener("idle", onIdle);
      reloadRef.current = () => void loadMarkersForView();
      setReady(true);
      queueMicrotask(onIdle);
    }

    void boot();

    return () => {
      cancelled = true;
      reloadRef.current = null;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      abortRef.current?.abort();
      clustererRef.current?.clearMarkers();
      markersRef.current.forEach((m) => m.setMap(null));
      mapRef.current = null;
      clustererRef.current = null;
    };
  }, [apiKey]);

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] flex-col gap-4 lg:flex-row">
      <aside className="flex w-full flex-col gap-3 lg:w-[380px] lg:shrink-0">
        <Card className="border-primary/15 p-4 shadow-sm">
          <div className="flex items-start gap-2">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
            <div>
              <p className="font-display text-lg font-bold leading-tight">Field map</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Pan and zoom to load voter units in view. Tap a pin for a quick preview; full detail
                stays in this panel for approach planning.
              </p>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {loadState === "loading" ? (
              <span className="inline-flex items-center gap-1">
                <Loader2 className="size-3.5 animate-spin" aria-hidden />
                Loading pins…
              </span>
            ) : (
              <span>
                Pins in view: <strong className="text-foreground">{count}</strong>
              </span>
            )}
            {loadState === "error" ? (
              <span className="text-destructive">Could not refresh data — try again.</span>
            ) : null}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3 w-full"
            onClick={() => reloadRef.current?.()}
          >
            Reload this view
          </Button>
        </Card>

        <Card className="min-h-[200px] flex-1 border-border/80 p-4 shadow-sm">
          {selected ? (
            <div className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="font-display font-bold leading-snug text-foreground">
                  {selected.address_full}
                </p>
                {selected.is_demo ? (
                  <span className="shrink-0 rounded bg-amber-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Demo
                  </span>
                ) : null}
              </div>
              {(selected.voter_first || selected.voter_last) && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Voter (file)
                  </p>
                  <p className="text-foreground">
                    {[selected.voter_first, selected.voter_last].filter(Boolean).join(" ")}
                  </p>
                </div>
              )}
              {selected.ward_hint ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Ward / area
                  </p>
                  <p>{selected.ward_hint}</p>
                </div>
              ) : null}
              {selected.precinct ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Precinct
                  </p>
                  <p>{selected.precinct}</p>
                </div>
              ) : null}
              {selected.party ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Party (if provided)
                  </p>
                  <p>{selected.party}</p>
                </div>
              ) : null}
              {selected.turf_tag ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Turf / list
                  </p>
                  <p>{selected.turf_tag}</p>
                </div>
              ) : null}
              {selected.voter_file_id ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    File ID
                  </p>
                  <p className="font-mono text-xs">{selected.voter_file_id}</p>
                </div>
              ) : null}
              {selected.notes ? (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    Field notes
                  </p>
                  <p className="leading-relaxed text-muted-foreground">{selected.notes}</p>
                </div>
              ) : null}
              <Button type="button" variant="ghost" size="sm" className="px-0" onClick={() => setSelected(null)}>
                Clear selection
              </Button>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Select a map pin to load voter and address detail before you walk up.
            </p>
          )}
        </Card>
      </aside>

      <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-2xl border border-border shadow-inner lg:min-h-[calc(100dvh-10rem)]">
        {!ready ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted/50">
            <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
          </div>
        ) : null}
        <div ref={mapDivRef} className="h-full min-h-[420px] w-full" />
      </div>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
