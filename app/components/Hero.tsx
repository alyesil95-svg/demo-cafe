"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, LOADER_DONE_EVENT } from "@/lib/gsap";
import { smoothScrollTo } from "./Navbar";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // make sure the ambiance video is actually playing
    videoRef.current?.play().catch(() => {});

    // Resolve elements through the section ref and hand GSAP real nodes (not a
    // selector string) so GSAP's context scoping can never hide them.
    const getEls = () =>
      root.current
        ? Array.from(root.current.querySelectorAll<HTMLElement>(".hero-anim"))
        : [];

    let played = false;
    let fallback = 0;
    const intro = () => {
      if (played) return;
      const els = getEls();
      if (!els.length) return;
      played = true;
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.12,
      });
    };

    if (reduce) {
      gsap.set(getEls(), { opacity: 1, y: 0 });
    } else {
      gsap.set(getEls(), { y: 40, opacity: 0 });
      const w = window as unknown as { __demoLoaderDone?: boolean };
      if (w.__demoLoaderDone) {
        intro();
      } else {
        window.addEventListener(LOADER_DONE_EVENT, intro, { once: true });
        // safety net in case the loader event is missed
        fallback = window.setTimeout(intro, 4500);
      }
    }

    // subtle parallax: video drifts + content fades as you scroll away
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.to(".hero-video", {
        yPercent: 18,
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-fade", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, root);

    return () => {
      window.removeEventListener(LOADER_DONE_EVENT, intro);
      window.clearTimeout(fallback);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      id="anasayfa"
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster=""
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Warm overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,47,47,0.45) 0%, rgba(59,47,47,0.30) 35%, rgba(59,47,47,0.55) 100%)",
        }}
      />

      {/* Bottom blend so the hero melts into the next (coffee) video section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48"
        style={{ background: "linear-gradient(to top, #2a2020, transparent)" }}
      />

      {/* Content */}
      <div className="hero-fade relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <p className="hero-anim label mb-6 text-caramel">
          İzmir · Specialty Coffee &amp; Kitchen
        </p>

        <h1 className="hero-anim display text-balance text-[18vw] leading-[0.9] text-warmwhite drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)] sm:text-[13vw] lg:text-[10rem]">
          DEMO CAFE
        </h1>

        <p className="hero-anim mt-6 max-w-xl text-lg font-light tracking-wide text-warmwhite/90 sm:text-2xl">
          Lezzetin ve Keyfin Buluştuğu Yer
        </p>

        {/* Location with bean dots */}
        <div className="hero-anim mt-7 flex items-center gap-4">
          <Bean />
          <span className="label text-base text-warmwhite/95">İzmir</span>
          <Bean />
        </div>

        {/* CTAs */}
        <div className="hero-anim mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => smoothScrollTo("menu")}
            className="group relative w-60 overflow-hidden rounded-full bg-caramel px-8 py-4 text-sm font-semibold tracking-[0.15em] text-espresso transition-all duration-300 hover:scale-[1.03] hover:bg-warmwhite sm:w-auto"
          >
            MENÜYÜ GÖR
          </button>
          <button
            onClick={() => smoothScrollTo("rezervasyon")}
            className="w-60 rounded-full border border-warmwhite/60 bg-warmwhite/5 px-8 py-4 text-sm font-semibold tracking-[0.15em] text-warmwhite backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-warmwhite hover:bg-warmwhite/15 sm:w-auto"
          >
            REZERVASYON
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => smoothScrollTo("menu")}
        aria-label="Aşağı kaydır"
        className="hero-fade absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="label text-[0.6rem] text-warmwhite/70">Kaydır</span>
        <span className="relative flex h-12 w-6 justify-center rounded-full border border-warmwhite/40">
          <span
            className="absolute top-2 h-2 w-1 rounded-full bg-caramel"
            style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }}
          />
        </span>
      </button>
    </section>
  );
}

function Bean() {
  return (
    <span className="flex items-center gap-1.5">
      <span className="h-1.5 w-1.5 rotate-45 rounded-[2px] bg-caramel" />
      <span className="h-px w-8 bg-gradient-to-r from-caramel/70 to-transparent" />
    </span>
  );
}
