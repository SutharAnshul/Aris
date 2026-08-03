"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useQuote } from "@/lib/store";

export function QuoteProgress() {
  const { items, rates, pricedCount, totalCount } = useQuote();

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="flex flex-1 gap-1.5" role="presentation">
        {items.map((item) => {
          const done = !!rates[item.id];
          return (
            <div key={item.id} className="h-[7px] flex-1 overflow-hidden rounded-[2px] bg-border">
              <motion.div
                className="h-full"
                initial={false}
                animate={{
                  width: done ? "100%" : "0%",
                  backgroundColor: done ? "var(--color-primary)" : "transparent",
                }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          );
        })}
      </div>
      <p className="shrink-0 text-[13px] text-text-muted">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={pricedCount}
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 6, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-block font-medium text-text tabular-nums"
          >
            {pricedCount}
          </motion.span>
        </AnimatePresence>{" "}
        of {totalCount} priced
      </p>
    </div>
  );
}
