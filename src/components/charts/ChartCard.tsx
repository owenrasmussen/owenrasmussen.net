"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Delays mounting the chart itself until this card has scrolled into view,
 * so recharts' own bar-grow / line-draw animation plays right as you reach
 * it — instead of finishing instantly on page load, off-screen, before the
 * user ever sees it.
 */
export default function ChartCard({
  title,
  children,
  className = "",
  height = 280,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`rounded-lg border border-black/10 p-4 dark:border-white/10 sm:p-6 ${className}`}
    >
      {title && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-zinc-500">
          {title}
        </p>
      )}
      {mounted ? children : <div style={{ height }} />}
    </div>
  );
}
