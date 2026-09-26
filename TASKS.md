# Implementation Roadmap & Task List

## Milestone 1: Foundation, Typography & Seed Data (t_405ca56a - running)
- [ ] Initialize Next.js (App Router, TypeScript) inside repository
- [ ] Install & configure Tailwind CSS with custom design tokens (`#0A0A0C`, `#121518`, `#22262B`, `#5E6AD2`, `#00F0FF`)
- [ ] Setup local font files / font loaders (`Cabinet Grotesk`, `Satoshi`, `PP Neue Montreal Mono`)
- [ ] Construct `src/data/seed.ts` (projects schema, bio, skills, experience, social links)
- [ ] Test dev server boots cleanly

## Milestone 2: Core Recruiter Shell - Linear-Grade Pure DOM (t_13d3c59c - todo)
- [ ] Layout shell: Minimalist navigation header & footer
- [ ] Hero section (60/40 Asymmetric Bento: Editorial Typography + Interactive Metadata card)
- [ ] Project Showcase: Sticky stacking cards effect (pure DOM CSS/Framer Motion)
- [ ] Skills & Experience section (high-density Linear-style grid)
- [ ] About & Contact section with direct download resume trigger
- [ ] Mobile responsive layout pass (<768px view)

## Milestone 2.5: 3D Asset Pipeline & Video Previews - Paralel (t_00ff2885 - ready)
- [ ] 3D Assets: Procedural GLSL Mesh Wave / Particles + Hero GLB compressed with Draco (<3MB) in `/public/models/`
- [ ] Video Previews: 3-5s lightweight muted looping MP4/WebM clips per project for Showcase hover reveal
- [ ] High-res project mockup frames (editorial asymmetric aspect ratio)
- [ ] Asset validation: Total scene budget strictly under 3MB

## Milestone 3: Dynamic Showcase Engine - Lusion-Grade WebGL (t_32511d31 - todo, depends on M2 + M2.5)
- [ ] ModeContext (`recruiter` vs `showcase`) with localStorage persistence
- [ ] Fixed floating mode toggle button
- [ ] Dynamic import / code splitting wrapper for R3F Canvas
- [ ] Interactive 3D Mesh Wave / Particle field with cursor force-field response
- [ ] Lenis smooth scroll setup + Framer Motion scroll-driven scrub timeline
- [ ] Desktop-only gate (<768px hides showcase toggle)

## Milestone 4: Micro-Interactions & Polish (t_27ce8d51 - todo, depends on M3)
- [ ] Custom magnetic cursor with context labels (`VIEW PROJECT`, `EXPLORE`) in Showcase Mode
- [ ] Hover-reveal video preview loop on project cards
- [ ] Mode switch transition effect (glitch/scanline/blur wipe ~300ms)
- [ ] Initial preloader counter (`000` -> `100`) with shutter reveal
- [ ] Canvas auto-unmount/pause on tab blur & mode switch
