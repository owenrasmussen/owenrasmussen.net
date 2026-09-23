"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Scroll-linked entrance: starts small/tilted (as if farther away), and
 * straightens out to full scale, facing forward, exactly when its center
 * crosses the vertical middle of the viewport. Progress is derived purely
 * from scroll position, not a fixed-duration animation.
 */
export default function TiltPhone({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
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
      const center = rect.top + rect.height / 2;
      const raw = 1 - (center - vh / 2) / (vh / 2);
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
  }, []);

  const scale = 0.7 + 0.3 * progress;
  const rotateX = 24 - 24 * progress;
  const rotateY = 32 - 32 * progress;

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
