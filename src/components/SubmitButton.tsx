"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { CheckDraw } from "./ui/CheckDraw";
import { useQuote } from "@/lib/store";

export function SubmitButton() {
  const { submission, submit } = useQuote();
  const isSubmitting = submission === "submitting";
  const isSubmitted = submission === "submitted";
  const idle = submission === "idle";

  return (
    <div className="mx-auto w-full max-w-[560px] px-6 pb-6 pt-4">
      <div
        className="mb-3 flex items-start gap-2 rounded-[4px] bg-primary/15 px-3.5 py-3 transition-opacity duration-200"
        style={{ opacity: idle ? 1 : 0 }}
      >
        <Info size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-primary-hover" />
        <p className="text-[13px] leading-[1.4] text-text">
          By submitting, you&rsquo;re confirming these rates for this RFQ.
        </p>
      </div>

      <div className="h-px w-full bg-border">
        <motion.div
          className="h-px bg-primary"
          initial={false}
          animate={{ width: isSubmitting || isSubmitted ? "100%" : "0%" }}
          transition={{
            duration: isSubmitting ? 0.7 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>

      <motion.button
        type="button"
        onClick={submit}
        disabled={!idle}
        whileTap={idle ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.1 }}
        aria-live="polite"
        className={`relative mt-3 flex h-13 w-full items-center overflow-hidden rounded-[4px] bg-dark pl-6 pr-2 text-[14px] font-medium tracking-wide text-surface uppercase ${
          idle ? "justify-between transition-colors duration-150 hover:bg-[#2e2e2e]" : "justify-center"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isSubmitted ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-6 w-6 items-center justify-center"
            >
              <motion.span
                initial={{ scale: 0.5, opacity: 0.6 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border border-surface/60"
              />
              <CheckDraw size={22} color="var(--color-surface)" delay={0.05} />
            </motion.span>
          ) : (
            <motion.span
              key={isSubmitting ? "submitting" : "idle"}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {isSubmitting ? "Submitting" : "Submit quote"}
            </motion.span>
          )}
        </AnimatePresence>
        {idle ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-dark">
            <ArrowRight size={16} strokeWidth={2.25} />
          </span>
        ) : null}
      </motion.button>
    </div>
  );
}
