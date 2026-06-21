"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface Stat {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
}

const STATS: Stat[] = [
  { target: 10000, decimals: 0, suffix: "+", label: "Mutlu Müşteri" },
  { target: 50, decimals: 0, suffix: "+", label: "Çeşit Lezzet" },
  { target: 8, decimals: 0, suffix: "", label: "Yıl Tecrübe" },
  { target: 4.9, decimals: 1, suffix: "", label: "Google Puanı" },
];

function format(v: number, decimals: number) {
  if (decimals > 0) {
    return v.toLocaleString("tr-TR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }
  return Math.round(v).toLocaleString("tr-TR");
}

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const nums = gsap.utils.toArray<HTMLElement>(".stat-num", root.current);

    if (reduce) {
      nums.forEach((el, i) =>
        (el.textContent =
          format(STATS[i].target, STATS[i].decimals) + STATS[i].suffix),
      );
      return;
    }

    const run = () => {
      nums.forEach((el, i) => {
        const s = STATS[i];
        const obj = { v: 0 };
        gsap.to(obj, {
          v: s.target,
          duration: 2,
          ease: "power2.out",
          overwrite: true,
          onUpdate: () => {
            el.textContent = format(obj.v, s.decimals) + s.suffix;
          },
        });
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) run();
      },
      { threshold: 0.4 },
    );
    if (root.current) io.observe(root.current);

    return () => io.disconnect();
  }, []);

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-24"
      style={{
        background:
          "linear-gradient(135deg, #F5EFE6 0%, #EFE2D2 50%, #E7D5BE 100%)",
      }}
    >
      <div
        ref={root}
        className="mx-auto grid max-w-6xl grid-cols-2 gap-y-12 px-6 lg:grid-cols-4 lg:px-10"
      >
        {STATS.map((s) => (
          <div key={s.label} className="reveal text-center">
            <div className="display text-5xl font-semibold text-espresso sm:text-6xl">
              <span className="stat-num">0{s.suffix}</span>
            </div>
            <div className="mx-auto my-4 h-px w-10 bg-caramel-deep/40" />
            <p className="label text-espresso/70">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
