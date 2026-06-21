"use client";

import { useEffect } from "react";

/**
 * Global scroll-reveal controller (IntersectionObserver based).
 *
 * Toggles `.is-visible` on every `.reveal` element as it enters/leaves the
 * viewport, so entrance animations replay scrolling BOTH down and up.
 *
 * IO is used instead of GSAP ScrollTrigger here because the three video
 * sections change height (100svh → 280svh) on the client after mount, which
 * makes position-based triggers unreliable for everything below them. IO reacts
 * to real intersection regardless of layout shifts.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal"),
    );
    if (!els.length) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduce) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const delay = parseFloat(el.dataset.revealDelay || "0");
            if (delay > 0) {
              window.setTimeout(() => el.classList.add("is-visible"), delay * 1000);
            } else {
              el.classList.add("is-visible");
            }
          } else {
            el.classList.remove("is-visible");
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
