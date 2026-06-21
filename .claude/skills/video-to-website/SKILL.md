# Video To Website Skill

## Goal
Use videos cinematically - some autoplay, some scroll-controlled - for a premium feel.

## Hero Video (cafe ambiance)
- File: /hero.mp4
- Autoplay, muted, loop, playsInline
- Always moving, never stops
- Fullscreen background with warm overlay

## Scroll-Controlled Food Videos (coffee, pizza, burger)
- Files: /coffee.mp4, /pizza.mp4, /burger.mp4
- DESKTOP: video scrubbing - video frames advance as user scrolls (GSAP ScrollTrigger)
- MOBILE: autoplay muted loop instead (scrubbing lags on phones)
- Detect mobile: window.innerWidth < 768 || navigator.maxTouchPoints > 0
- Each food video is a full-screen cinematic moment with text overlay

## Performance
- Preload video metadata
- Use requestAnimationFrame for smooth scrubbing on desktop
- On mobile NEVER use scrubbing - always autoplay
- Lower resolution sources on mobile
