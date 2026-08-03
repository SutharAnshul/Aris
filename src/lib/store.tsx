"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { rfq, demoRates, RfqItem } from "./rfq-data";

export type Screen = "request" | "build" | "review" | "success";
export type SubmissionStatus = "idle" | "submitting" | "submitted";

interface QuoteContextValue {
  items: RfqItem[];
  rates: Record<string, number | null>;
  setRate: (id: string, value: number | null) => void;
  lineTotal: (id: string) => number;
  pricedCount: number;
  totalCount: number;
  subtotal: number;
  gst: number;
  total: number;
  allPriced: boolean;
  screen: Screen;
  goTo: (screen: Screen) => void;
  back: () => void;
  canGoBack: boolean;
  submission: SubmissionStatus;
  submit: () => void;
  fillDemoRates: () => void;
  reset: () => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

const emptyRates = Object.fromEntries(
  rfq.items.map((i) => [i.id, null])
) as Record<string, number | null>;

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [rates, setRates] = useState<Record<string, number | null>>(emptyRates);
  const [history, setHistory] = useState<Screen[]>(["request"]);
  const [submission, setSubmission] = useState<SubmissionStatus>("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const screen = history[history.length - 1];

  const setRate = useCallback((id: string, value: number | null) => {
    setRates((prev) => ({ ...prev, [id]: value }));
  }, []);

  const goTo = useCallback((next: Screen) => {
    setHistory((prev) =>
      prev[prev.length - 1] === next ? prev : [...prev, next]
    );
  }, []);

  const back = useCallback(() => {
    setHistory((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const lineTotal = useCallback(
    (id: string) => {
      const item = rfq.items.find((i) => i.id === id);
      const rate = rates[id];
      if (!item || !rate) return 0;
      return item.qtyMt * rate;
    },
    [rates]
  );

  const pricedCount = useMemo(
    () => rfq.items.filter((i) => (rates[i.id] ?? 0) > 0).length,
    [rates]
  );

  const subtotal = useMemo(
    () => rfq.items.reduce((sum, i) => sum + (rates[i.id] ? i.qtyMt * rates[i.id]! : 0), 0),
    [rates]
  );

  const gst = useMemo(() => Math.round(subtotal * rfq.gstRate), [subtotal]);
  const total = subtotal + gst;
  const allPriced = pricedCount === rfq.items.length;

  const submit = useCallback(() => {
    if (submission !== "idle") return;
    setSubmission("submitting");
    timeoutRef.current = setTimeout(() => {
      setSubmission("submitted");
    }, 700);
  }, [submission]);

  useEffect(() => {
    if (submission === "submitted" && screen === "review") {
      const t = setTimeout(() => goTo("success"), 380);
      return () => clearTimeout(t);
    }
  }, [submission, screen, goTo]);

  const fillDemoRates = useCallback(() => {
    setRates({ ...demoRates });
  }, []);

  const reset = useCallback(() => {
    setRates(emptyRates);
    setSubmission("idle");
    setHistory(["request"]);
  }, []);

  const value: QuoteContextValue = {
    items: rfq.items,
    rates,
    setRate,
    lineTotal,
    pricedCount,
    totalCount: rfq.items.length,
    subtotal,
    gst,
    total,
    allPriced,
    screen,
    goTo,
    back,
    canGoBack: history.length > 1,
    submission,
    submit,
    fillDemoRates,
    reset,
  };

  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
}

export function useQuote() {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote must be used within QuoteProvider");
  return ctx;
}
