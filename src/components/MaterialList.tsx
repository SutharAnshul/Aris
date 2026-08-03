"use client";

import { motion } from "framer-motion";
import { staggerItem } from "@/lib/motion";
import { rfq } from "@/lib/rfq-data";
import { formatIndianNumber } from "@/lib/currency";

export function MaterialList() {
  return (
    <motion.div variants={staggerItem} className="mt-8">
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] font-medium tracking-wide text-text-muted uppercase">
          Materials ({rfq.items.length})
        </p>
        <span className="text-[12px] font-medium tracking-wide text-text-muted uppercase">
          View all
        </span>
      </div>

      <div className="mt-2">
        {rfq.items.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start gap-3 border-b border-border py-3.5 last:border-b-0"
          >
            <span className="mt-0.5 font-mono text-[12px] text-text-muted">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[15px] font-semibold text-text">{item.name}</p>
              <p className="mt-0.5 font-mono text-[12px] tracking-wide text-text-muted">
                {item.grade} · {item.length} · {item.shape}
              </p>
            </div>
            <p className="shrink-0 text-[15px] font-semibold text-text tabular-nums">
              {formatIndianNumber(item.qtyMt)} <span className="font-normal text-text-muted">MT</span>
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
