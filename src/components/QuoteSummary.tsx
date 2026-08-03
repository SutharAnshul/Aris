"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatINR } from "@/lib/currency";
import { useQuote } from "@/lib/store";
import { ConstructionStripe } from "./ui/ConstructionStripe";

export function QuoteSummary() {
  const { subtotal, allPriced, pricedCount, totalCount, goTo } = useQuote();
  const remaining = totalCount - pricedCount;

  return (
    <div className="shrink-0 bg-dark">
      <div className="mx-auto flex w-full max-w-[560px] items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-wide text-surface/50 uppercase">
            Current quote value
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={subtotal}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="truncate text-[24px] leading-none font-semibold text-surface tabular-nums"
            >
              {formatINR(subtotal)}
            </motion.p>
          </AnimatePresence>
        </div>
        {!allPriced ? (
          <p className="shrink-0 text-[11px] font-medium tracking-wide text-surface/50 uppercase">
            {remaining} item{remaining === 1 ? "" : "s"} left
          </p>
        ) : null}
        <motion.button
          type="button"
          whileTap={allPriced ? { scale: 0.98 } : undefined}
          transition={{ duration: 0.1 }}
          disabled={!allPriced}
          onClick={() => goTo("review")}
          className={`h-13 shrink-0 rounded-[4px] px-6 text-[14px] font-medium tracking-wide uppercase transition-colors duration-150 ${
            allPriced
              ? "bg-primary text-dark hover:bg-primary-hover"
              : "cursor-not-allowed bg-surface/10 text-surface/35"
          }`}
        >
          Review quote
        </motion.button>
      </div>
      <ConstructionStripe />
    </div>
  );
}
