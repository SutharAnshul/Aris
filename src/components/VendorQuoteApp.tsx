"use client";

import { useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { QuoteProvider, useQuote, Screen } from "@/lib/store";
import { screenVariants } from "@/lib/motion";
import { QuoteRequest } from "./QuoteRequest";
import { QuoteBuilder } from "./QuoteBuilder";
import { ReviewQuote } from "./ReviewQuote";
import { QuoteSuccess } from "./QuoteSuccess";

const order: Screen[] = ["request", "build", "review", "success"];

function ScreenSwitch() {
  const { screen } = useQuote();
  const prevIndex = useRef(0);
  const index = order.indexOf(screen);
  const direction = index >= prevIndex.current ? 1 : -1;
  prevIndex.current = index;

  return (
    <AnimatePresence mode="wait" custom={direction} initial={false}>
      <motion.div
        key={screen}
        custom={direction}
        variants={screenVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="min-h-0 flex-1"
      >
        {screen === "request" ? <QuoteRequest /> : null}
        {screen === "build" ? <QuoteBuilder /> : null}
        {screen === "review" ? <ReviewQuote /> : null}
        {screen === "success" ? <QuoteSuccess /> : null}
      </motion.div>
    </AnimatePresence>
  );
}

export function VendorQuoteApp() {
  return (
    <QuoteProvider>
      <ScreenSwitch />
    </QuoteProvider>
  );
}
