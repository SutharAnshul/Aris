"use client";

import { useEffect, useState } from "react";

const FRAME_W = 390;
const FRAME_H = 844;

/** At or below this width the viewer is on a phone-sized screen, where a
 *  letterboxed frame would waste the display, so the app runs edge to edge.
 *  Above it (desktop, tablet, landscape phone) the design is presented in a
 *  fixed 390x844 frame instead of being reflowed. */
const FULLSCREEN_MAX_W = 640;

const FRAME_MARGIN = 48;

type Fit = { full: true } | { full: false; scale: number };

/**
 * Presents the prototype at its designed 390x844 size.
 *
 * Desktop: a centred frame on a neutral backdrop, scaled down proportionally
 * when the window is too small so the layout never reflows.
 * Phone: fills the viewport.
 */
export function DeviceFrame({ children }: { children: React.ReactNode }) {
  const [fit, setFit] = useState<Fit | null>(null);

  useEffect(() => {
    function measure() {
      if (window.innerWidth <= FULLSCREEN_MAX_W) {
        setFit({ full: true });
        return;
      }
      const scale = Math.min(
        1,
        (window.innerWidth - FRAME_MARGIN) / FRAME_W,
        (window.innerHeight - FRAME_MARGIN) / FRAME_H
      );
      setFit({ full: false, scale: scale > 0 ? scale : 1 });
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const full = fit?.full ?? false;

  // The element structure is identical in both modes so that crossing the
  // breakpoint restyles rather than remounts — remounting would reset the
  // quote state held by the provider inside `children`.
  return (
    <div
      className={
        full
          ? "h-full w-full overflow-clip"
          : "flex h-full w-full items-center justify-center overflow-clip bg-[#e6e3da]"
      }
      style={{ visibility: fit === null ? "hidden" : "visible" }}
    >
      <div
        style={
          full
            ? undefined
            : {
                width: FRAME_W,
                height: FRAME_H,
                transform: `scale(${fit && !fit.full ? fit.scale : 1})`,
              }
        }
        className={
          full
            ? "relative flex h-full w-full flex-col overflow-clip bg-bg"
            : "relative flex shrink-0 flex-col overflow-clip bg-bg shadow-[0_8px_40px_rgba(0,0,0,0.16)]"
        }
      >
        {children}
      </div>
    </div>
  );
}
