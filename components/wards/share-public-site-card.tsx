"use client";

import { QRCodeSVG } from "qrcode.react";
import { Check, Copy, QrCode, Share2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { publicCampaignUrls } from "@/lib/site-url";
import { cn } from "@/lib/utils";

function CopyUrlButton({ url, label }: { url: string; label: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setDone(true);
      setTimeout(() => setDone(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="h-auto shrink-0 gap-1.5 rounded-lg py-1.5 text-xs font-semibold"
      onClick={copy}
    >
      {done ? <Check className="size-3.5 text-primary" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
      {label}
    </Button>
  );
}

export function SharePublicSiteCard({ siteBase }: { siteBase: string }) {
  const urls = publicCampaignUrls(siteBase);
  /** QR opens the main public site — fastest path to hub + navigation. */
  const qrValue = urls.home;

  return (
    <Card className="overflow-hidden rounded-2xl border-accent/30 bg-gradient-to-br from-accent/12 via-card to-primary/[0.06] p-0 shadow-ajax">
      <div className="border-b border-border/60 bg-primary/[0.04] px-5 py-4 sm:px-6">
        <div className="flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Share2 className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-display text-lg font-bold leading-tight text-foreground">
              Share the public website
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Your neighbors don’t need the ward dashboard — send them the campaign site. Use the QR
              on a table tent, flyer, or phone screen; or paste the links in a group text or email.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 sm:px-6 sm:py-6">
        <div className="flex flex-col items-center sm:items-start">
          <div
            className={cn(
              "rounded-2xl border border-white/80 bg-white p-3 shadow-inner",
              "ring-1 ring-primary/10",
            )}
          >
            <QRCodeSVG
              value={qrValue}
              size={168}
              level="M"
              includeMargin={false}
              fgColor="#002d62"
              bgColor="#ffffff"
            />
          </div>
          <p className="mt-2 flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            <QrCode className="size-3" aria-hidden />
            Opens {new URL(qrValue).hostname}
          </p>
        </div>

        <div className="min-w-0 space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-primary">Primary link (QR)</p>
            <p className="mt-1 break-all font-mono text-sm text-foreground">{urls.home}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <CopyUrlButton url={urls.home} label="Copy home" />
            </div>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/80 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Easiest for curious neighbors
            </p>
            <p className="mt-1 break-all font-mono text-sm text-foreground">{urls.initiative}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Short explainer without volunteer clutter — great for texts and social posts.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <CopyUrlButton url={urls.initiative} label="Copy initiative" />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Deeper read
            </p>
            <p className="mt-1 break-all font-mono text-sm text-foreground">{urls.campaign}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <CopyUrlButton url={urls.campaign} label="Copy campaign" />
            </div>
          </div>

          <ul className="list-inside list-disc space-y-1.5 text-xs text-muted-foreground">
            <li>At events: show the QR on a tablet or printed sign.</li>
            <li>In conversations: “Scan this — it explains what we’re doing.”</li>
            <li>Keep tone welcoming; let the site do the heavy explaining.</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
