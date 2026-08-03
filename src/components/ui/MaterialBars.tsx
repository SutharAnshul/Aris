"use client";

import { motion } from "framer-motion";

export type BarState = "neutral" | "active" | "committed";

export interface MaterialBar {
  qtyMt: number;
  state: BarState;
}

export function MaterialBars({
  bars,
  maxHeight = 40,
  minHeight = 14,
  barWidth = 10,
  gap = 6,
  className = "",
}: {
  bars: MaterialBar[];
  maxHeight?: number;
  minHeight?: number;
  barWidth?: number;
  gap?: number;
  className?: string;
}) {
  const maxQty = Math.max(...bars.map((b) => b.qtyMt));

  return (
    <div className={`flex items-end ${className}`} style={{ gap }} aria-hidden="true">
      {bars.map((b, i) => {
        const h = minHeight + (b.qtyMt / maxQty) * (maxHeight - minHeight);
        return (
          <motion.div
            key={i}
            initial={false}
            animate={{
              height: h,
              backgroundColor:
                b.state === "committed"
                  ? "var(--color-dark)"
                  : b.state === "active"
                    ? "var(--color-primary)"
                    : "transparent",
              borderColor: b.state === "neutral" ? "var(--color-border)" : "transparent",
            }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: barWidth, borderWidth: 1.5 }}
            className="border"
          />
        );
      })}
    </div>
  );
}
