# AGENTS.md — Hybrid Showcase Portfolio

> Operational rules for AI agents working in this repository.

## 1. Project Purpose
Awwwards-grade creative portfolio for **Creative Developer & UI/UX Designer** (Faustzaki).
Core identity: **Showcase & visual exhibition first**. Recruiter speed + high visual craft. SEO is low priority.

## 2. Core Architecture: Dual-Mode
- **Recruiter Mode (Default)**:
  - 100% pure DOM, high-density, zero WebGL/3D overhead.
  - Linear.app style: clean, fast, asymmetric editorial layout.
- **Showcase Mode (Opt-in)**:
  - Lusion.co style: 3D interactive mesh wave canvas, magnetic cursor, hover preview.
  - **HARD RULE:** Library 3D (`@react-three/fiber`, `@react-three/drei`, `three`) wajib di-isolate via `React.lazy` / dynamic import. Zero 3D bundle during initial load.
  - Desktop only (<768px hide showcase toggle).

## 3. Interaction & Motion Rules
- **Scroll:** Scroll-driven scrub via Lenis + Framer Motion (`useScroll`). **Dilarang keras scroll hijacking / preventDefault native scroll**.
- **Performance:** InstancedMesh for particles. Unmount/pause WebGL canvas when switched back to Recruiter Mode or tab hidden (`visibilitychange`).

## 4. Design System Tokens
- **Fonts:**
  - Display: `Cabinet Grotesk` (tight tracking, headings/hero)
  - Body: `Satoshi` (clean, descriptions)
  - Mono: `PP Neue Montreal Mono` (tech tags, numbers `01/04`)
- **Colors:**
  - Background: `#0A0A0C` (charcoal dark)
  - Surface: `#121518`
  - Border: `#22262B` (1px clean border)
  - Text Primary: `#EDEDED`
  - Text Muted: `#8A8F98`
  - Accent Linear: `#5E6AD2` (Indigo)
  - Accent Showcase: `#00F0FF` (Cyan neon glow)

## 5. Tech Stack
- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS
- Motion: Framer Motion + Lenis
- 3D (Showcase only): Three.js + React Three Fiber + Drei (Dynamic Import)
- Icons: Phosphor Icons (`@phosphor-icons/react`) or Lucide Icons
- Data: Single source of truth in `src/data/seed.ts` (100% hardcoded local data)

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
