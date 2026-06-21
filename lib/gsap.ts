// Central GSAP + ScrollTrigger registration. Imported only by client components.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Detect devices that should NOT scrub video on scroll (mobile / touch / coarse pointer).
export const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (window.innerWidth < 768 ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches);

// Fired by LoadingScreen when the intro finishes, so ScrollTrigger can recalc.
export const LOADER_DONE_EVENT = "demo-cafe:loaded";
