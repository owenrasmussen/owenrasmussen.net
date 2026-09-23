"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Continuous scroll-linked float-up, driven by the element's own position —
 * not a one-shot threshold fade. Progress goes 0 (element just below the
 * fold) to 1 (element risen ~85% of the way up the viewport), so it reads as
 * the text rising into place as you scroll, and reverses smoothly if you
 * scroll back up.
 */
export default function ScrollReveal({
  children,
  className = "",
  offset = 72,
  startDelayPx = 0,
}: {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  startDelayPx?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw = (vh - rect.top - startDelayPx) / (vh * 0.55);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [startDelayPx]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translateY(${offset * (1 - progress)}px)`,
        opacity: progress,
      }}
    >
      {children}
    </div>
  );
}
