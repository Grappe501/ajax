"use client";

import Link from "next/link";
import type { ComponentProps, MouseEventHandler } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

export function PrimaryButton({
  href,
  className,
  children,
  analyticsEvent,
  onClick,
  variant = "default",
  size = "lg",
  ...rest
}: Omit<ButtonProps, "variant" | "onClick"> &
  VariantProps<typeof buttonVariants> & {
    href?: string;
    analyticsEvent?: () => void;
    onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    variant?: VariantProps<typeof buttonVariants>["variant"];
    size?: VariantProps<typeof buttonVariants>["size"];
  }) {
  const classes = cn(
    buttonVariants({ variant, size }),
    "rounded-xl px-6 font-semibold shadow-sm",
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
      variant={variant}
      size={size}
      className={cn("rounded-xl px-6 font-semibold shadow-sm", className)}
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
