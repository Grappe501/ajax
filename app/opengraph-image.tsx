import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const runtime = "edge";

export const alt =
  "AJAX Volunteer Hub — ward-based representation for Jacksonville, Arkansas";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  const line = site.tagline.slice(0, 132) + (site.tagline.length > 132 ? "…" : "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(152deg, #000814 0%, #001a35 38%, #002d62 72%, #003875 100%)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -80,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253,185,19,0.35) 0%, transparent 68%)",
            filter: "blur(2px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: -100,
            bottom: -60,
            width: 440,
            height: 440,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,45,98,0.55) 0%, transparent 65%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              width: 88,
              height: 6,
              borderRadius: 4,
              background: "linear-gradient(90deg, #fdb913, #ffc82d)",
            }}
          />
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              color: "#ffffff",
              lineHeight: 1.05,
            }}
          >
            AJAX Volunteer Hub
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(232,237,245,0.92)",
              lineHeight: 1.45,
              maxWidth: 860,
            }}
          >
            {line}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#fdb913",
            }}
          >
            Jacksonville, Arkansas
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "rgba(232,237,245,0.75)",
            }}
          >
            ajaxcampaign.org
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
