"use client";

import { useEffect, useRef } from "react";
import { Header } from "./ui/Header";
import { ScreenShell } from "./ui/ScreenShell";
import { QuoteProgress } from "./QuoteProgress";
import { RateInput } from "./RateInput";
import { QuoteSummary } from "./QuoteSummary";
import { useQuote } from "@/lib/store";

export function QuoteBuilder() {
  const { items, rates, pricedCount, back, fillDemoRates } = useQuote();
  const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const prevPriced = useRef(pricedCount);

  useEffect(() => {
    if (pricedCount > prevPriced.current) {
      const next = items.find((i) => !rates[i.id]);
      if (next) {
        const el = rowRefs.current[next.id];
        window.setTimeout(() => {
          el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
      }
    }
    prevPriced.current = pricedCount;
  }, [pricedCount, items, rates]);

  return (
    <ScreenShell
      header={<Header label="Build quote" onBack={back} />}
      footer={<QuoteSummary />}
    >
      <div className="mx-auto w-full max-w-[560px] px-5 pb-10 pt-6">
        <h1 className="text-[28px] leading-[1.15] font-semibold text-text">
          Build your quote
        </h1>
        <p className="mt-1.5 text-[15px] text-text-muted">
          Enter your rate per metric tonne.
        </p>

        <QuoteProgress />

        <button
          type="button"
          onClick={fillDemoRates}
          className="mt-4 text-[13px] text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-dark"
        >
          Use standard rates
        </button>

        <div className="mt-4">
          {items.map((item, i) => (
            <RateInput
              key={item.id}
              item={item}
              index={i}
              ref={(el) => {
                rowRefs.current[item.id] = el;
              }}
            />
          ))}
        </div>
      </div>
    </ScreenShell>
  );
}
