"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Copy, Check } from "lucide-react";
import { staggerItem } from "@/lib/motion";
import { rfq, totalQtyMt } from "@/lib/rfq-data";
import { formatIndianNumber } from "@/lib/currency";

function splitAddress(address: string): [string, string] {
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length < 2) return [address, ""];
  return [parts.slice(0, -1).join(", "), parts[parts.length - 1]];
}

export function RequestSummary() {
  const [copied, setCopied] = useState(false);
  const [deliveryLine1, deliveryLine2] = splitAddress(rfq.deliveryAddress);

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
    <>
      <motion.div variants={staggerItem} className="flex items-start justify-between">
        <span className="rounded-[4px] bg-primary px-2.5 py-1 text-[11px] font-semibold tracking-wide text-dark uppercase">
          New request
        </span>
        <div className="text-right">
          <p className="text-[11px] text-text-muted">Respond by</p>
          <p className="mt-0.5 flex items-center justify-end gap-1.5 text-[13px] font-semibold text-text">
            {rfq.deadline}
            <Clock size={13} strokeWidth={2.25} className="text-primary-hover" />
          </p>
        </div>
      </motion.div>

      <motion.div variants={staggerItem} className="mt-6">
        <p className="text-[56px] leading-[0.95] tracking-[-0.04em] font-semibold text-text tabular-nums">
          {formatIndianNumber(totalQtyMt)}
          <span className="ml-2 text-[24px] tracking-normal font-medium text-text-muted">MT</span>
        </p>
        <p className="mt-3 text-[24px] leading-none font-semibold text-text">
          {rfq.category} Required
        </p>
        <p className="mt-1.5 text-[13px] text-text-muted">
          {rfq.items.length === 1 ? "1 item" : "Multiple items"}
        </p>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="mt-5 flex items-center justify-between"
      >
        <div>
          <p className="text-[11px] text-text-muted">RFQ ID</p>
          <p className="mt-1 font-mono text-[14px] font-semibold text-text">{rfq.rfqId}</p>
        </div>
        <button
          type="button"
          onClick={copyRfqId}
          aria-label="Copy RFQ ID"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[4px] text-text-muted transition-colors hover:text-text"
        >
          {copied ? (
            <Check size={15} strokeWidth={2.25} className="text-success" />
          ) : (
            <Copy size={15} strokeWidth={2} />
          )}
        </button>
      </motion.div>

      <motion.div
        variants={staggerItem}
        className="mt-4 grid grid-cols-2 rounded-[8px] border border-border"
      >
        <div className="border-r border-border px-4 py-3.5">
          <p className="text-[11px] text-text-muted">Requested by</p>
          <p className="mt-1 text-[14px] font-semibold text-text">{rfq.customer}</p>
          <p className="mt-0.5 text-[12px] text-text-muted">{rfq.customerLocation}</p>
        </div>
        <div className="px-4 py-3.5">
          <p className="text-[11px] text-text-muted">Delivery to</p>
          <p className="mt-1 text-[14px] font-semibold text-text">{deliveryLine1}</p>
          <p className="mt-0.5 text-[12px] text-text-muted">{deliveryLine2}</p>
        </div>
      </motion.div>
    </>
  );
}
