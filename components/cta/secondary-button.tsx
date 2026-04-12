"use client";

import Link from "next/link";
import type { ComponentProps, MouseEventHandler } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

export function SecondaryButton({
  href,
  className,
  children,
  analyticsEvent,
  onClick,
  size = "lg",
  ...rest
}: Omit<ButtonProps, "variant" | "onClick"> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    analyticsEvent?: () => void;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  }) {
  const classes = cn(
    buttonVariants({ variant: "outline", size }),
    "rounded-xl border-primary/25 bg-background/80 px-6 font-semibold",
    className,
  );
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={(e) => {
          analyticsEvent?.();
          onClick?.(e);
        }}
      >
        {children}
      </Link>
    );
  }
  return (
    <Button
      variant="outline"
      size={size}
      className={cn(
        "rounded-xl border-primary/25 bg-background/80 px-6 font-semibold",
        className,
      )}
      onClick={(e) => {
        analyticsEvent?.();
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
