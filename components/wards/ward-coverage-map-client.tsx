"use client";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { WardMapContent } from "@/content/ward-maps";
import { cn } from "@/lib/utils";

type Props = {
  apiKey: string;
  content: WardMapContent;
  className?: string;
};

export function WardCoverageMapClient({ apiKey, content, className }: Props) {
  const divRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");

  useEffect(() => {
    if (!divRef.current || !apiKey) return;
    let cancelled = false;

    async function boot() {
      setState("loading");
      try {
        setOptions({ key: apiKey, v: "weekly" });
        await importLibrary("maps");
        if (cancelled || !divRef.current) return;

        const g = google.maps;
        const path = content.boundaryPath.map((p) => ({ lat: p.lat, lng: p.lng }));

        const map = new g.Map(divRef.current, {
          center: content.center,
          zoom: content.defaultZoom,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          gestureHandling: "cooperative",
        });

        const bounds = new g.LatLngBounds();
        path.forEach((p) => bounds.extend(p));
        map.fitBounds(bounds, 32);

        new g.Polygon({
          paths: path,
          map,
          strokeColor: "#002d62",
          strokeOpacity: 0.95,
          strokeWeight: 2,
          fillColor: content.fillColor,
          fillOpacity: 0.18,
        });

        if (!cancelled) setState("ready");
      } catch {
        if (!cancelled) setState("error");
      }
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [apiKey, content]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-muted/30", className)}>
      <div ref={divRef} className="h-[min(420px,55vh)] w-full" role="application" aria-label={`Map of ${content.slug} coverage`} />
      {state === "loading" ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background/40">
          <Loader2 className="size-8 animate-spin text-primary" aria-hidden />
          <span className="sr-only">Loading map</span>
        </div>
      ) : null}
      {state === "error" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-card/95 p-4 text-center text-sm text-muted-foreground">
          Map could not load. Check the browser console and confirm the Maps JavaScript API is enabled for
          this key.
        </div>
      ) : null}
    </div>
  );
}
