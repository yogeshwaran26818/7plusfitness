# 7plus Fitness — PRD

## Original Problem Statement
Create a modern, energetic, mobile-friendly fitness website for a boutique strength and HIIT studio named **7plus Fitness**: bold homepage hero (high-energy background image, motivational tagline, prominent 'Book a Class' CTA), Class Schedule (interactive timetable: class names, intensity levels, duration, trainers, reserve button), Workout Styles cards (HIIT, Strength, Mobility), Trainer Profiles (bios, photos, specialties, certifications), Pricing & Memberships (drop-in, multi-class packs, monthly memberships, personal training), Social Proof (transformations, reviews, community gallery), Location & Contact (address, hours, map integration, inquiry/trial form).

## User Choices (from ask_human)
- Visual vibe: Bold & energetic — dark theme, punchy accent color, high-contrast athletic type
- Booking: Quick reservation flow — pick a class from schedule, enter name/email, stored in backend with confirmation
- Map: Embedded Google Map (no API key)
- Content: Realistic placeholder content (Chennai, Tamil Nadu context requested)

## Architecture
- **Frontend**: React 19 (CRA), Tailwind, framer-motion, lenis smooth scrolling, lucide icons, sonner toasts. Single-page site, 12 components under `/app/frontend/src/components/`.
- **Backend**: FastAPI (`/app/backend/server.py`), MongoDB via Motor. Endpoints: `GET /api/`, `POST/GET /api/reservations`, `POST/GET /api/inquiries`. Pydantic models, email/phone validation, uuid ids, no raw `_id` exposure.
- **Design**: `/app/design_guidelines.json` — "Performance Pro" dark theme (#0B0C0E bg, #CCFF00 volt + #00F0FF neon accents), Barlow Condensed display + Plus Jakarta Sans body.

## Core Requirements → Status
- Hero (kinetic masked line reveal, parallax bg, CTA) → ✅ 2026-09-14
- Editorial marquee + numbered manifesto chapters → ✅ 2026-09-14
- Interactive Schedule (Mon–Sun tabs, intensity filters, live slot counts from backend, reserve modal → POST /api/reservations, confirmation ID + toast) → ✅ 2026-09-14
- Workout Styles bento cards (HIIT / Strength / Mobility) → ✅ 2026-09-14
- Trainer profiles (3 coaches, photos, specialties, certifications) → ✅ 2026-09-14
- Pricing (Drop-in ₹850, 10-pack ₹7,500, Monthly ₹6,999, PT ₹18,000/12) → ✅ 2026-09-14
- Social proof (transformations, reviews, 6-photo gallery) → ✅ 2026-09-14
- Location & Contact (Nungambakkam address, hours, dark-embedded Google Map, trial inquiry form → POST /api/inquiries) → ✅ 2026-09-14
- data-testids on all interactive elements → ✅

## Personas
- Busy Chennai professional booking early-morning/late-evening HIIT classes
- Strength beginner seeking coached, safe programming and free trial
- Traveller/expat looking for drop-in passes

## Backlog (P0/P1/P2)
- P0: Real studio content swap (address, phone, prices, trainer bios/photos)
- P1: Reservation management (cancellation link, WhatsApp reminder), admin panel for reservations/inquiries
- P1: Payments integration for pass purchase (Stripe/Razorpay)
- P2: Instagram feed integration, Google Reviews live widget, multi-language (Tamil) copy

## Verification Log
- 2026-09-14: curl POST/GET reservations + inquiries + validation errors — all pass. Screenshots: desktop 1440 (hero, full page, booking modal, confirmation), mobile 390 (hero + full page) — no overflow, no blank sections.
