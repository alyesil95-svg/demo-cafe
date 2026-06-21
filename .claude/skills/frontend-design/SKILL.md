# Frontend Design Skill

## Goal
Create the most stunning, premium cafe and restaurant website that makes owners say "I have never seen a website like this in my life".

## Design Rules
- Style: warm, cozy, appetizing, premium - like a high-end coffee brand meets a gourmet restaurant
- Color palette: warm cream #F5EFE6, rich espresso brown #3B2F2F, soft caramel #C8A27C, warm white #FFFCF7, deep charcoal #1a1a1a for text
- Accent: warm golden caramel tones (but tasteful, not cheap gold)
- Typography: elegant serif for headings (Playfair Display or Cormorant Garamond), clean sans for body (Inter)
- Generous spacing, editorial food-magazine feel
- Everything must feel warm and make people hungry

## Technical Stack
- Next.js App Router
- Tailwind CSS
- GSAP + ScrollTrigger for scroll animations
- Framer Motion

## CRITICAL: Mobile Performance
- Most visitors are on phones (scanning QR at the table)
- ZERO lag, ZERO freezing on mobile
- Scroll-controlled videos ONLY on desktop
- On mobile: same videos autoplay muted loop instead of scroll scrubbing
- Disable heavy 3D animations on mobile, simple fades only
- Lazy load all images

## Sections
1. Hero - fullscreen autoplay background video (cafe ambiance)
2. Menu showcase with scroll-controlled food videos (coffee, pizza, burger)
3. Digital QR menu with categories and photos
4. AI assistant (smart - recommends, calculates, filters)
5. Order system (table order + WhatsApp packet order)
6. Loyalty card
7. Reservation
8. Google reviews + Instagram
9. Contact
