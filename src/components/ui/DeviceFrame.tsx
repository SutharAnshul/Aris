"use client";

import { useEffect, useState } from "react";

const FRAME_W = 390;
const FRAME_H = 844;

/**
 * Locks the prototype to a fixed 390x844 canvas so it presents identically
 * regardless of the viewer's window. When the window is smaller than the
 * frame, the whole frame is scaled down proportionally rather than reflowed,
 * so layout and type sizes stay exactly as designed.
 */
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    function fit() {
      const margin = window.innerWidth < FRAME_W ? 0 : 48;
      const next = Math.min(
        1,
        (window.innerWidth - margin) / FRAME_W,
        (window.innerHeight - margin) / FRAME_H
      );
      setScale(next > 0 ? next : 1);
    }

    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#e6e3da]">
      <div
        style={{
          width: FRAME_W,
          height: FRAME_H,
          transform: scale === null ? undefined : `scale(${scale})`,
          visibility: scale === null ? "hidden" : "visible",
        }}
        className="relative flex shrink-0 flex-col overflow-hidden bg-bg shadow-[0_8px_40px_rgba(0,0,0,0.16)]"
      >
        {children}
      </div>
    </div>
  );
}
