"use client";

import { Header } from "./ui/Header";
import { ScreenShell } from "./ui/ScreenShell";
import { Disclosure } from "./ui/Disclosure";
import { ConstructionStripe } from "./ui/ConstructionStripe";
import { FinancialSummary } from "./FinancialSummary";
import { QuoteLineItem } from "./QuoteLineItem";
import { SubmitButton } from "./SubmitButton";
import { rfq } from "@/lib/rfq-data";
import { useQuote } from "@/lib/store";

function splitAddress(address: string): [string, string] {
  const parts = address.split(",").map((p) => p.trim());
  if (parts.length < 2) return [address, ""];
  return [parts.slice(0, -1).join(", "), parts[parts.length - 1]];
}

export function ReviewQuote() {
  const { items, back, submission, goTo } = useQuote();
  const readOnly = submission === "submitted";
  const [deliveryLine1, deliveryLine2] = splitAddress(rfq.deliveryAddress);

  return (
    <ScreenShell
      header={<Header label="Review" onBack={readOnly ? () => goTo("success") : back} />}
      footer={
        readOnly ? (
          <div className="shrink-0 border-t border-border bg-bg px-6 pb-6 pt-4">
            <div className="mx-auto w-full max-w-[560px]">
              <button
                type="button"
                onClick={() => goTo("success")}
                className="flex h-13 w-full items-center justify-center rounded-[4px] border border-border text-[14px] font-medium tracking-wide text-text uppercase transition-colors hover:border-text-muted"
              >
                Back to confirmation
              </button>
            </div>
            <ConstructionStripe className="mt-6" />
          </div>
        ) : (
          <div className="shrink-0 border-t border-border bg-bg">
            <SubmitButton />
            <ConstructionStripe />
          </div>
        )
      }
    >
      <div className="mx-auto w-full max-w-[560px]">
        <div className="px-6 pt-7 pb-7">
          {readOnly ? (
            <p className="mb-2 flex items-center gap-1.5 text-[13px] text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Submitted
            </p>
          ) : null}
          <h1 className="text-[22px] leading-[1.2] font-semibold text-text">
            Everything look right?
          </h1>
          <p className="mt-1 text-[14px] text-text-muted">
            Review your rates before submitting.
          </p>
        </div>

        <FinancialSummary />

        <div className="px-6 pt-8 pb-12">
          <div>
            <p className="text-[13px] font-medium tracking-wide text-text-muted uppercase">
              {items.length} items
            </p>
            <div className="mt-1">
              {items.map((item, i) => (
                <QuoteLineItem key={item.id} item={item} index={i} readOnly={readOnly} />
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div>
              <p className="text-[11px] text-text-muted">Requested by</p>
              <p className="mt-1 text-[14px] font-semibold text-text">{rfq.customer}</p>
              <p className="mt-0.5 text-[12px] text-text-muted">{rfq.customerLocation}</p>
            </div>
            <div>
              <p className="text-[11px] text-text-muted">Delivery to</p>
              <p className="mt-1 text-[14px] font-semibold text-text">{deliveryLine1}</p>
              <p className="mt-0.5 text-[12px] text-text-muted">{deliveryLine2}</p>
            </div>
          </div>

          <div className="mt-2">
            <Disclosure title="Terms & conditions">
              Payment within 30 days of delivery against invoice. Rates quoted are
              exclusive of GST unless stated otherwise. Delivery schedule to be
              confirmed on order confirmation. Quoted rates are valid until the
              response deadline shown above.
            </Disclosure>
          </div>
        </div>
      </div>
    </ScreenShell>
  );
}
