"use client";

import { motion, AnimatePresence } from "framer-motion";

export function AnimatedAmount({
  value,
  formatted,
  className = "",
}: {
  value: number;
  formatted: string;
  className?: string;
}) {
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className={`inline-block tabular-nums ${className}`}
      >
        {formatted}
      </motion.span>
    </AnimatePresence>
  );
}
