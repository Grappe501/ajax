"use client";

import { Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { trainings } from "@/content/trainings";
import type { TrainingModule } from "@/content/trainings";

import { cn } from "@/lib/utils";

function TrainingDialog({ t }: { t: TrainingModule }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-lg",
        )}
      >
        View overview
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">{t.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2 text-sm">
            <Clock className="size-4" aria-hidden />
            About {t.minutes} minutes ·{" "}
            {t.status === "available" ? "Available" : "Coming soon"}
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t.description} Full Articulate 360 embeds and schedules will live on the{" "}
          <Link
            href="/training"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            training center
          </Link>{" "}
          page — this preview lists what is in production.
        </p>
      </DialogContent>
    </Dialog>
  );
}

export function TrainingPreview() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {trainings.map((t) => (
        <div
          key={t.slug}
          className="flex flex-col rounded-2xl border border-border/70 bg-gradient-to-b from-card via-card to-ajax-mist/40 p-6 shadow-ajax transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-ajax-lg"
        >
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-bold text-primary">{t.title}</h3>
            <span
              className={
                t.status === "available"
                  ? "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
                  : "rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground"
              }
            >
              {t.status === "available" ? "Available" : "Coming soon"}
            </span>
          </div>
          <p className="mt-2 flex-1 text-sm text-muted-foreground">{t.description}</p>
          <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Clock className="size-3.5" aria-hidden />
            {t.minutes} min
          </p>
          <div className="mt-4">
            <TrainingDialog t={t} />
          </div>
        </div>
      ))}
    </div>
  );
}
