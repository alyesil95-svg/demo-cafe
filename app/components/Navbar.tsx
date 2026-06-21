"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { id: "anasayfa", label: "Ana Sayfa" },
  { id: "menu", label: "Menü" },
  { id: "hakkimizda", label: "Hakkımızda" },
  { id: "galeri", label: "Galeri" },
];

export function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 64;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNav = (id: string) => {
    setOpen(false);
    // wait for menu close to release scroll lock before scrolling
    window.setTimeout(() => smoothScrollTo(id), open ? 220 : 0);
  };

  const dark = scrolled; // dark text when cream bar is visible

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-[400ms] ease-out ${
          scrolled
            ? "bg-cream/95 shadow-[0_8px_30px_-18px_rgba(59,47,47,0.35)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          {/* Logo */}
          <button
            onClick={() => handleNav("anasayfa")}
            className="group flex items-center gap-2.5"
            aria-label="DEMO CAFE ana sayfa"
          >
            <span
              className={`inline-block h-2 w-2 rotate-45 rounded-[2px] transition-colors duration-300 ${
                dark ? "bg-caramel" : "bg-caramel"
              }`}
            />
            <span
              className={`display text-[1.55rem] font-semibold leading-none tracking-wide transition-colors duration-300 sm:text-[1.8rem] ${
                dark ? "text-espresso" : "text-warmwhite"
              }`}
            >
              DEMO CAFE
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors duration-300 ${
                  dark
                    ? "text-espresso/90 hover:text-espresso"
                    : "text-warmwhite/90 hover:text-warmwhite"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNav("rezervasyon")}
            className="hidden rounded-full bg-caramel px-6 py-2.5 text-sm font-semibold tracking-wide text-espresso shadow-[0_10px_24px_-12px_rgba(176,136,86,0.9)] transition-all duration-300 hover:bg-caramel-deep hover:text-warmwhite lg:block"
          >
            Rezervasyon
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menüyü aç"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <span
              className={`h-[2px] w-7 rounded-full transition-all duration-300 ${
                open
                  ? "translate-y-[7px] rotate-45 bg-warmwhite"
                  : dark
                    ? "bg-espresso"
                    : "bg-warmwhite"
              }`}
            />
            <span
              className={`h-[2px] w-7 rounded-full transition-all duration-300 ${
                open ? "opacity-0" : dark ? "bg-espresso" : "bg-warmwhite"
              }`}
            />
            <span
              className={`h-[2px] w-7 rounded-full transition-all duration-300 ${
                open
                  ? "-translate-y-[7px] -rotate-45 bg-warmwhite"
                  : dark
                    ? "bg-espresso"
                    : "bg-warmwhite"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile slide-in full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-2 bg-espresso transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          open
            ? "pointer-events-auto translate-x-0 opacity-100"
            : "pointer-events-none translate-x-full opacity-0"
        }`}
      >
        {LINKS.map((l, i) => (
          <button
            key={l.id}
            onClick={() => handleNav(l.id)}
            className="display py-3 text-4xl text-warmwhite/90 transition-colors hover:text-caramel"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => handleNav("rezervasyon")}
          className="mt-6 rounded-full bg-caramel px-9 py-3.5 text-base font-semibold text-espresso transition-colors hover:bg-warmwhite"
        >
          Rezervasyon
        </button>
        <p className="label mt-12 text-caramel">İzmir</p>
      </div>
    </>
  );
}
