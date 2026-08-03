"use client";

import { motion } from "framer-motion";

export function CheckDraw({
  size = 20,
  color = "currentColor",
  strokeWidth = 2.25,
  delay = 0,
}: {
  size?: number;
  color?: string;
  strokeWidth?: number;
  delay?: number;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 12.5L9.5 18L20 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </motion.svg>
  );
}
