"use client";

import { forwardRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { RfqItem, presetRates } from "@/lib/rfq-data";
import { formatIndianNumber, formatINR } from "@/lib/currency";
import { useQuote } from "@/lib/store";
import { RatePresets } from "./ui/RatePresets";

interface RateInputProps {
  item: RfqItem;
  index: number;
}

function parseDraft(draft: string): number | null {
  if (draft.trim() === "") return null;
  const n = Number(draft);
  if (Number.isNaN(n)) return null;
  return n;
}

export const RateInput = forwardRef<HTMLDivElement, RateInputProps>(
  function RateInput({ item, index }, ref) {
    const { rates, setRate } = useQuote();
    const committed = rates[item.id];

    const [draft, setDraft] = useState(committed ? String(committed) : "");
    const [focused, setFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [justAdded, setJustAdded] = useState(false);

    useEffect(() => {
      if (!focused && committed) setDraft(String(committed));
    }, [committed, focused]);

    const draftValue = parseDraft(draft);
    const isComplete = committed !== null && committed > 0 && !focused;
    const lineTotal = draftValue && draftValue > 0 ? item.qtyMt * draftValue : 0;
    const isHigh = draftValue !== null && draftValue > 200000;
    const badgeState: "empty" | "active" | "complete" = focused
      ? "active"
      : isComplete
        ? "complete"
        : "empty";

    function handleChange(raw: string) {
      const cleaned = raw.replace(/[^0-9.]/g, "");
      const parts = cleaned.split(".");
      const normalized =
        parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : cleaned;
      setDraft(normalized);
      if (error) setError(null);
    }

    function commit(value: number) {
      setDraft(String(value));
      setError(null);
      setRate(item.id, value);
      setJustAdded(true);
      window.setTimeout(() => setJustAdded(false), 1600);
    }

    function handleBlur() {
      setFocused(false);
      const value = parseDraft(draft);

      if (draft.trim() === "") {
        setError(null);
        setRate(item.id, null);
        return;
      }
      if (value === null || value <= 0) {
        setError("Enter a valid rate");
        return;
      }

      commit(value);
    }

    return (
      <motion.div
        ref={ref}
        animate={{ paddingTop: isComplete ? 20 : 28, paddingBottom: isComplete ? 20 : 28 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`relative mb-3 rounded-[8px] px-5 transition-colors duration-200 last:mb-0 ${
          focused
            ? "bg-primary/[0.05]"
            : isComplete
              ? "bg-[#FCFAF5]"
              : "bg-surface"
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] font-mono text-[11px] transition-colors duration-200 ${
              badgeState === "complete"
                ? "bg-dark text-surface"
                : badgeState === "active"
                  ? "bg-primary text-dark"
                  : "border border-border text-text-muted"
            }`}
          >
            {badgeState === "complete" ? (
              <Check size={12} strokeWidth={2.5} />
            ) : (
              String(index + 1).padStart(2, "0")
            )}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[16px] font-semibold text-text">{item.name}</p>
            <p className="mt-0.5 font-mono text-[12px] tracking-wide text-text-muted">
              {item.grade} · {item.length} · {item.shape}
            </p>
          </div>
          <p className="shrink-0 text-[15px] text-text-muted tabular-nums">
            {formatIndianNumber(item.qtyMt)} MT
          </p>
        </div>

        <div className={isComplete ? "mt-4" : "mt-6"}>
          <label htmlFor={`rate-${item.id}`} className="sr-only">
            Your rate per metric tonne for {item.name}
          </label>
          <div
            className={`flex items-baseline pb-2 transition-colors duration-150 ${
              isComplete ? "border-b" : "border-b-2"
            } ${
              error
                ? "border-error"
                : focused
                  ? "border-primary"
                  : isComplete
                    ? "border-border/60"
                    : "border-border"
            }`}
          >
            <span
              className={`transition-all duration-300 ${
                isComplete ? "text-[15px]" : "text-[22px]"
              } ${focused || draft ? "text-text" : "text-text-muted"}`}
            >
              ₹
            </span>
            <input
              id={`rate-${item.id}`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="0"
              value={draft}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={handleBlur}
              aria-invalid={!!error}
              aria-describedby={error ? `rate-${item.id}-error` : undefined}
              className={`ml-1 w-full bg-transparent leading-none font-semibold transition-all duration-300 placeholder:text-text-muted/30 focus:outline-none ${
                isComplete ? "text-[22px] text-text-muted" : "text-[40px] text-text"
              }`}
            />
            <span className="shrink-0 pb-1 text-[13px] text-text-muted">/ MT</span>
          </div>

          <AnimatePresence>
            {error ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                id={`rate-${item.id}-error`}
                className="mt-1.5 text-[13px] text-error"
              >
                {error}
              </motion.p>
            ) : isHigh ? (
              <p className="mt-1.5 text-[13px] text-text-muted">
                That&rsquo;s a high rate — double-check the number
              </p>
            ) : justAdded ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-1.5 flex items-center gap-1.5 text-[13px] text-success"
              >
                <Check size={12} strokeWidth={2.5} /> Rate added
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

        {presetRates[item.id] ? (
          <div className={isComplete ? "mt-4" : "mt-5"}>
            <RatePresets
              presets={presetRates[item.id]}
              activeValue={committed}
              onSelect={commit}
            />
          </div>
        ) : null}

        <AnimatePresence>
          {lineTotal > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className={isComplete ? "mt-4" : "mt-5"}>
                <p className="text-[12px] text-text-muted">Order value</p>
                <p
                  className={`mt-0.5 leading-none font-semibold text-text tabular-nums transition-all duration-300 ${
                    isComplete ? "text-[28px]" : "text-[22px]"
                  }`}
                >
                  {formatINR(lineTotal)}
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    );
  }
);
