"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { AnimatedAmount } from "./ui/AnimatedAmount";
import { formatINR } from "@/lib/currency";
import { rfq } from "@/lib/rfq-data";
import { useQuote } from "@/lib/store";

export function FinancialSummary() {
  const { subtotal, gst, total } = useQuote();
  const [copied, setCopied] = useState(false);
  const totalFormatted = formatINR(total);
  const totalSize = totalFormatted.length > 13 ? "text-[32px]" : "text-[40px]";

  async function copyRfqId() {
    try {
      await navigator.clipboard.writeText(rfq.rfqId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  return (
    <div className="bg-dark px-6 pt-7 pb-8 text-surface">
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-[12px] tracking-wide text-surface/45 uppercase">
          RFQ {rfq.rfqId}
        </span>
        <button
          type="button"
          onClick={copyRfqId}
          aria-label="Copy RFQ ID"
          className="text-surface/45 transition-colors hover:text-surface"
        >
          {copied ? (
            <Check size={13} strokeWidth={2.25} className="text-success" />
          ) : (
            <Copy size={13} strokeWidth={2} />
          )}
        </button>
      </div>

      <div className="mt-6 flex items-baseline justify-between gap-4">
        <span className="text-[14px] text-surface/55">Quote value</span>
        <AnimatedAmount
          value={subtotal}
          formatted={formatINR(subtotal)}
          className="text-[17px] font-medium text-surface tabular-nums"
        />
      </div>
      <div className="mt-2 flex items-baseline justify-between gap-4">
        <span className="text-[14px] text-surface/55">
          GST ({Math.round(rfq.gstRate * 100)}%)
        </span>
        <AnimatedAmount
          value={gst}
          formatted={formatINR(gst)}
          className="text-[17px] font-medium text-surface tabular-nums"
        />
      </div>

      <div className="mt-6 border-t border-surface/15 pt-6">
        <p className="text-[11px] font-medium tracking-wide text-surface/55 uppercase">
          Total quote value
        </p>
        <div className="mt-1">
          <AnimatedAmount
            value={total}
            formatted={totalFormatted}
            className={`${totalSize} leading-none font-semibold whitespace-nowrap text-surface tabular-nums`}
          />
        </div>
      </div>
    </div>
  );
}
