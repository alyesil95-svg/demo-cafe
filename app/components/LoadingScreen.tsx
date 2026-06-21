"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, LOADER_DONE_EVENT } from "@/lib/gsap";

const TITLE = "DEMO CAFE";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = "";
      (window as unknown as { __demoLoaderDone?: boolean }).__demoLoaderDone =
        true;
      setDone(true);
      // Dispatch outside the loader's GSAP timeline/context so listeners that
      // run GSAP selector queries aren't scoped to this component's subtree.
      setTimeout(() => window.dispatchEvent(new Event(LOADER_DONE_EVENT)), 0);
    };

    if (reduce) {
      const t = window.setTimeout(finish, 600);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(".ls-letter", { yPercent: 120, opacity: 0 });
      gsap.set(".ls-tag", { y: 16, opacity: 0 });
      gsap.set(".ls-line", { opacity: 0 });
      gsap.set(".ls-steam", { opacity: 0, y: 8 });

      tl
        // draw the cup line-art
        .to(".ls-line", { opacity: 1, duration: 0.05, stagger: 0.1 }, 0)
        .to(
          ".ls-draw",
          { strokeDashoffset: 0, duration: 0.9, ease: "power2.inOut", stagger: 0.08 },
          0,
        )
        // steam drifts up
        .to(".ls-steam", { opacity: 0.55, y: 0, duration: 0.5, stagger: 0.1 }, 0.5)
        // letters cascade in
        .to(
          ".ls-letter",
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "power4.out" },
          0.6,
        )
        // tagline fades up
        .to(".ls-tag", { y: 0, opacity: 1, duration: 0.6 }, 1.35)
        .to({}, { duration: 0.35 }) // hold
        // elegant curtain reveal
        .to(
          ".ls-content",
          { y: -40, opacity: 0, duration: 0.5, ease: "power2.in" },
          ">-0.05",
        )
        .to(
          root.current,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
            onComplete: finish,
          },
          "<0.1",
        );
    }, root);

    return () => {
      document.body.style.overflow = "";
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-cream"
      aria-hidden="true"
    >
      <div className="ls-content flex flex-col items-center px-6">
        {/* Coffee cup line-art */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          fill="none"
          className="mb-8"
        >
          <g
            stroke="#3B2F2F"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* steam */}
            <path
              className="ls-steam"
              stroke="#C8A27C"
              d="M85 66 C78 56 92 50 85 40 C80 33 90 28 86 20"
            />
            <path
              className="ls-steam"
              stroke="#C8A27C"
              d="M100 64 C93 54 107 48 100 38 C95 31 105 26 101 18"
            />
            <path
              className="ls-steam"
              stroke="#C8A27C"
              d="M115 66 C108 56 122 50 115 40 C110 33 120 28 116 20"
            />
            {/* rim */}
            <path
              className="ls-line ls-draw"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              d="M58 84 C58 78 142 78 142 84"
            />
            {/* body */}
            <path
              className="ls-line ls-draw"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              d="M62 88 L70 150 C71 162 80 166 92 166 L108 166 C120 166 129 162 130 150 L138 88"
            />
            {/* handle */}
            <path
              className="ls-line ls-draw"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              d="M138 98 C164 98 164 134 132 132"
            />
            {/* saucer */}
            <path
              className="ls-line ls-draw"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
              d="M50 180 C70 190 130 190 150 180"
            />
          </g>
        </svg>

        {/* DEMO CAFE letter cascade */}
        <h1 className="display flex overflow-hidden text-5xl text-espresso sm:text-6xl">
          {TITLE.split("").map((ch, i) => (
            <span
              key={i}
              className="ls-letter inline-block"
              style={{ width: ch === " " ? "0.4em" : undefined }}
            >
              {ch === " " ? " " : ch}
            </span>
          ))}
        </h1>

        <p className="ls-tag label mt-5 text-center text-caramel-deep">
          Lezzetin ve Keyfin Buluştuğu Yer
        </p>
      </div>
    </div>
  );
}
