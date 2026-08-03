"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RfqItem, presetRates } from "@/lib/rfq-data";
import { formatIndianNumber, formatINR } from "@/lib/currency";
import { AnimatedAmount } from "./ui/AnimatedAmount";
import { RatePresets } from "./ui/RatePresets";
import { useQuote } from "@/lib/store";

export function QuoteLineItem({
  item,
  index,
  readOnly = false,
}: {
  item: RfqItem;
  index: number;
  readOnly?: boolean;
}) {
  const { rates, setRate, lineTotal } = useQuote();
  const rate = rates[item.id] ?? 0;
  const total = lineTotal(item.id);

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(rate));
  const [error, setError] = useState<string | null>(null);

  function openEdit() {
    setDraft(String(rate));
    setError(null);
    setEditing(true);
  }

  function save() {
    const value = Number(draft);
    if (!draft.trim() || Number.isNaN(value) || value <= 0) {
      setError("Enter a valid rate");
      return;
    }
    setRate(item.id, value);
    setEditing(false);
  }

  function selectPreset(value: number) {
    setError(null);
    setRate(item.id, value);
    setEditing(false);
  }

  return (
    <div className="border-b border-border py-3 last:border-b-0">
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="shrink-0 font-mono text-[11px] text-text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="truncate text-[15px] font-semibold text-text">{item.name}</p>
        </div>
        <AnimatedAmount
          value={total}
          formatted={formatINR(total)}
          className="shrink-0 text-[15px] font-semibold text-text tabular-nums"
        />
      </div>

      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="font-mono text-[12px] text-text-muted tabular-nums">
          {formatIndianNumber(item.qtyMt)}MT x {formatINR(rate)}
        </p>
        {readOnly || editing ? null : (
          <button
            type="button"
            onClick={openEdit}
            className="shrink-0 text-[12px] text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-dark"
          >
            Edit
          </button>
        )}
      </div>

      <AnimatePresence initial={false}>
        {editing ? (
          <motion.div
            key="edit"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {presetRates[item.id] ? (
              <div className="mt-4">
                <RatePresets
                  presets={presetRates[item.id]}
                  activeValue={rate || null}
                  onSelect={selectPreset}
                />
              </div>
            ) : null}
            <div className="mt-4 flex items-start gap-3">
              <div className="flex-1">
                <div
                  className={`flex h-12 items-center rounded-[4px] border bg-bg px-3 transition-colors ${
                    error
                      ? "border-error"
                      : "border-primary shadow-[0_0_0_3px_rgba(242,183,5,0.22)]"
                  }`}
                >
                  <span className="text-[16px] text-text">₹</span>
                  <input
                    autoFocus
                    type="text"
                    inputMode="decimal"
                    value={draft}
                    onChange={(e) => {
                      setDraft(e.target.value.replace(/[^0-9.]/g, ""));
                      if (error) setError(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") save();
                    }}
                    className="ml-1 w-full bg-transparent text-[16px] text-text focus:outline-none"
                  />
                  <span className="shrink-0 text-[13px] text-text-muted">/ mt</span>
                </div>
                {error ? (
                  <p className="mt-1.5 text-[13px] text-error">{error}</p>
                ) : null}
              </div>
              <button
                type="button"
                onClick={save}
                className="h-12 shrink-0 rounded-[4px] bg-dark px-4 text-[13px] font-medium tracking-wide text-surface uppercase transition-colors hover:bg-[#2e2e2e]"
              >
                Save
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
