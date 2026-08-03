"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/Button";
import { formatINR } from "@/lib/currency";
import { rfq } from "@/lib/rfq-data";
import { useQuote } from "@/lib/store";

const EASE = [0.16, 1, 0.3, 1] as const;

const MOTIF_W = 1280;
const MOTIF_H = 720;

function SuccessMotif() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Freeze on a canvas once playback ends so the clip visibly stops on its
    // final frame instead of looping or reverting to the poster.
    function handleEnded() {
      ctx!.drawImage(video!, 0, 0, MOTIF_W, MOTIF_H);
      setFrozen(true);
    }

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  return (
    <div className="relative mx-auto h-52 w-full max-w-[380px]">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        poster="/confirmation-graphic.png"
        className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
        style={{ visibility: frozen ? "hidden" : "visible" }}
      >
        <source src="/confirmation-motif.mp4" type="video/mp4" />
      </video>
      <canvas
        ref={canvasRef}
        width={MOTIF_W}
        height={MOTIF_H}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain mix-blend-multiply"
        style={{ visibility: frozen ? "visible" : "hidden" }}
      />
    </div>
  );
}

function SiteLineArt() {
  return (
    <img
      src="/site-illustration.png"
      alt=""
      aria-hidden="true"
      className="h-auto w-full mix-blend-multiply"
    />
  );
}

export function QuoteSuccess() {
  const { total, goTo, reset } = useQuote();

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-[560px] px-5"
        aria-hidden="true"
      >
        <SiteLineArt />
      </motion.div>

      <main className="relative mx-auto flex w-full max-w-[560px] flex-1 flex-col justify-center px-5 pb-4">
        <SuccessMotif />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.75, ease: EASE }}
          className="mt-5 text-center text-[19px] font-semibold text-text"
        >
          Quote submitted
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.88, ease: EASE }}
          className="mt-2 text-center text-[44px] leading-none tracking-[-0.04em] font-semibold text-text tabular-nums"
        >
          {formatINR(total)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0, ease: EASE }}
          className="mt-4 text-center"
        >
          <p className="text-[13px] text-text-muted">Sent to</p>
          <p className="mt-0.5 text-[15px] font-semibold text-text">{rfq.customer}</p>
          <p className="text-[13px] text-text-muted">{rfq.customerLocation}</p>
          <p className="mt-3 text-[13px] text-text-muted">
            We&rsquo;ll let you know when there&rsquo;s an update.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.14, ease: EASE }}
          className="mt-10"
        >
          <Button onClick={() => goTo("review")}>View quote</Button>
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={reset}
              className="text-[13px] text-text-muted underline decoration-border underline-offset-4 transition-colors hover:text-text"
            >
              Back to requests
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
