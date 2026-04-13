"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Single kinetic hero treatment: slow drifting light fields (disabled when reduced motion is on).
 */
export function HomeHeroAurora() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <>
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-background/90 to-transparent"
          aria-hidden
        />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="pointer-events-none absolute -right-24 top-0 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl"
        aria-hidden
        animate={{
          x: [0, 14, -6, 0],
          y: [0, -12, 8, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
        aria-hidden
        animate={{
          x: [0, -10, 12, 0],
          y: [0, 16, -8, 0],
          opacity: [0.85, 1, 0.9, 0.85],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-[120%] -translate-x-1/2 bg-gradient-to-t from-background/90 to-transparent"
        aria-hidden
        animate={{ opacity: [0.88, 1, 0.92, 0.88] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}
