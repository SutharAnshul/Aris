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
      <div className="mx-auto flex w-full max-w-[560px] items-center justify-between gap-2.5 px-5 py-4">
        <div className="min-w-0">
          <p className="flex items-baseline gap-1.5 text-[11px] font-medium tracking-wide whitespace-nowrap text-surface/50 uppercase">
            Quote value
            {!allPriced ? <span>· {remaining} left</span> : null}
          </p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={subtotal}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-[22px] leading-none font-semibold whitespace-nowrap text-surface tabular-nums"
            >
              {formatINR(subtotal)}
            </motion.p>
          </AnimatePresence>
        </div>
        <motion.button
          type="button"
          whileTap={allPriced ? { scale: 0.98 } : undefined}
          transition={{ duration: 0.1 }}
          disabled={!allPriced}
          onClick={() => goTo("review")}
          className={`h-13 shrink-0 rounded-[4px] px-5 text-[14px] font-medium tracking-wide whitespace-nowrap uppercase transition-colors duration-150 ${
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
