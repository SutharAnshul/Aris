"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoreVertical, Check } from "lucide-react";
import { Header } from "./ui/Header";
import { ScreenShell } from "./ui/ScreenShell";
import { Button } from "./ui/Button";
import { Disclosure } from "./ui/Disclosure";
import { ConstructionStripe } from "./ui/ConstructionStripe";
import { RequestSummary } from "./RequestSummary";
import { MaterialList } from "./MaterialList";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { useQuote } from "@/lib/store";

export function QuoteRequest() {
  const { goTo } = useQuote();
  const [menuOpen, setMenuOpen] = useState(false);
  const [declined, setDeclined] = useState(false);

  return (
    <ScreenShell
      header={
        <Header
          label="Quote request"
          right={
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="More options"
                className="-mr-2 flex h-11 w-11 items-center justify-center text-text-muted transition-colors active:text-text"
              >
                <MoreVertical size={20} strokeWidth={1.75} />
              </button>
              {menuOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-11 z-30 w-44 border border-border bg-surface shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full px-4 py-3 text-left text-[14px] text-text hover:bg-bg"
                  >
                    Share RFQ
                  </button>
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full border-t border-border px-4 py-3 text-left text-[14px] text-text hover:bg-bg"
                  >
                    Report an issue
                  </button>
                </motion.div>
              ) : null}
            </div>
          }
        />
      }
      footer={
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="shrink-0 border-t border-border bg-bg"
        >
          <div className="mx-auto w-full max-w-[560px] px-5 pb-6 pt-4">
            <Button onClick={() => goTo("build")}>Start quote</Button>
            <div className="mt-3 flex justify-center">
              {declined ? (
                <span className="flex items-center gap-1.5 text-[13px] text-text-muted">
                  <Check size={14} strokeWidth={2} /> Noted — marked as declined
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setDeclined(true)}
                  className="text-[13px] text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-text"
                >
                  Can&rsquo;t supply this
                </button>
              )}
            </div>
          </div>
          <ConstructionStripe />
        </motion.div>
      }
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto w-full max-w-[560px] px-5 pb-10 pt-8"
      >
        <RequestSummary />
        <MaterialList />

        <motion.div variants={staggerItem} className="mt-8">
          <Disclosure title="Terms & conditions">
            Payment within 30 days of delivery against invoice. Rates quoted are
            exclusive of GST unless stated otherwise. Delivery schedule to be
            confirmed on order confirmation. Quoted rates are valid until the
            response deadline shown above.
          </Disclosure>
        </motion.div>
      </motion.div>
    </ScreenShell>
  );
}
