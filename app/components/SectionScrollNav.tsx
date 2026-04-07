"use client";

import { useEffect, useState } from "react";

/**
 * Single vertical oval track on the right; inner dot slides with scroll progress.
 */
export function SectionScrollNav() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      const p = window.scrollY / scrollable;
      setProgress(Math.min(1, Math.max(0, p)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const percent = Math.round(progress * 100);

  return (
    <div
      className="pointer-events-none fixed right-5 top-1/2 z-30 hidden -translate-y-1/2 sm:block"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="Page scroll position"
    >
      <div className="relative h-4 w-2.5 overflow-hidden rounded-full border border-white/15 bg-black/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm md:h-8 md:w-3">
        {/* subtle inner track highlight */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-full bg-linear-to-b from-white/8 to-transparent"
          aria-hidden
        />
        {/* sliding dot */}
        <div
          className="absolute left-1/2 h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.85)] transition-[top] duration-100 ease-out will-change-[top] md:h-3 md:w-3"
          style={{
            top: `${progress * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
