"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface Props {
  id?: string;
  src: string;
  label: string;
  title: string;
  body: string;
  align?: "left" | "center";
  /** color the top/bottom edges melt into (matches the adjacent section) */
  blendTop?: string;
  blendBottom?: string;
}

/**
 * Full-screen cinematic video section.
 *
 * The video simply autoplays (muted/loop) on every device — NO scroll
 * scrubbing / currentTime seeking (that caused the lag). The cinematic feel
 * comes purely from GPU-accelerated transform/opacity effects:
 *   - text entrance (fade + slide + scale) on enter, replays both directions
 *   - subtle text parallax (moves slower than scroll)
 *   - gentle video zoom (scale 1.0 → 1.08) across the section's passage
 * Offscreen videos are paused to keep decoding light on mobile.
 */
export default function ScrollVideoSection({
  id,
  src,
  label,
  title,
  body,
  align = "center",
  blendTop = "#2a2020",
  blendBottom = "#2a2020",
}: Props) {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const parallax = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const v = video.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // --- autoplay, and pause when far offscreen (perf) ---
    let cleanupPlay: (() => void) | undefined;
    if (v && section.current) {
      v.muted = true;
      v.play().catch(() => {});
      const playIO = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) v.play().catch(() => {});
            else v.pause();
          }
        },
        { rootMargin: "300px 0px 300px 0px", threshold: 0 },
      );
      playIO.observe(section.current);
      cleanupPlay = () => playIO.disconnect();
    }

    // --- text entrance (CSS class), replays both directions ---
    const textIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          text.current?.classList.toggle("svs-in", e.isIntersecting);
        }
      },
      { threshold: 0.28 },
    );
    if (text.current) textIO.observe(text.current);

    // --- GPU transform-only scroll effects (zoom + parallax) ---
    let ctx: gsap.Context | undefined;
    if (!reduce) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          zoom.current,
          { scale: 1.0 },
          {
            scale: 1.08,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          parallax.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: section.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }, section);
    }

    return () => {
      cleanupPlay?.();
      textIO.disconnect();
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={section}
      id={id}
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ background: "#2a2020" }}
    >
      {/* Zooming video layer */}
      <div
        ref={zoom}
        className="absolute inset-0 will-change-transform"
        style={{ willChange: "transform" }}
      >
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={src} type="video/mp4" />
        </video>
      </div>

      {/* readability gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(42,32,32,0.55) 0%, rgba(42,32,32,0.25) 45%, rgba(42,32,32,0.7) 100%)",
        }}
      />

      {/* Edge blends so the video melts into the neighbouring sections */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-48"
        style={{ background: `linear-gradient(to bottom, ${blendTop}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: `linear-gradient(to top, ${blendBottom}, transparent)` }}
      />

      {/* Parallax layer holds the text */}
      <div
        ref={parallax}
        className={`absolute inset-0 flex h-full w-full flex-col justify-center px-8 will-change-transform sm:px-16 lg:px-24 ${
          align === "center"
            ? "items-center text-center"
            : "items-start text-left"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          ref={text}
          className={`svs-text max-w-2xl ${align === "center" ? "mx-auto" : ""}`}
        >
          <p className="label mb-5 text-caramel">{label}</p>
          <h2 className="display text-balance text-5xl leading-[1.02] text-warmwhite sm:text-6xl lg:text-7xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-warmwhite/85 sm:text-xl">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
