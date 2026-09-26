/**
 * Single source of truth for all portfolio content.
 * 100% hardcoded local data — no CMS, no fetch. See AGENTS.md §5.
 */

export type Project = {
  id: string;
  /** Zero-padded index for the mono "01/04" counter treatment */
  index: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  year: string;
  /** Tech tags rendered in the mono face */
  tags: string[];
  links: { label: string; href: string }[];
  featured: boolean;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export const bio = {
  name: "Faustzaki",
  role: "Creative Developer & UI/UX Designer",
  headline: "Building interfaces that sell the story — fast for recruiters, alive for everyone else.",
  about: "Freelance creative developer and designer focused on the point where marketing meets craft: interfaces that load fast, read clean and move with intent. Four years across studios and independent clients, from fintech dashboards to award-entry campaign sites.",
  location: "Jakarta, Indonesia",
  available: true,
  /** ponytail: drop /resume.pdf in public/ when the resume exists (M2 wires the download) */
  resumeHref: "/resume.pdf",
  email: "hello@faustzaki.dev",
  stats: [
    { label: "Years crafting", value: "4+" },
    { label: "Projects shipped", value: "20+" },
    { label: "Happy clients", value: "15+" },
  ],
} as const;

export const projects: Project[] = [
  {
    id: "nusantara-atlas",
    index: "01",
    title: "Nusantara Atlas",
    tagline: "Interactive data-viz atlas of Indonesian craft heritage",
    description:
      "Scroll-driven map exploration connecting 340+ craft villages with live trade data. Custom Mapbox styling, D3 overlays and a choreographed camera that keeps 60fps on mid-range phones.",
    role: "Design & Frontend",
    year: "2026",
    tags: ["Next.js", "Mapbox GL", "D3", "Framer Motion"],
    links: [{ label: "Live", href: "#" }],
    featured: true,
  },
  {
    id: "teroka",
    index: "02",
    title: "Teroka",
    tagline: "WebGL travel journal that reads like a film",
    description:
      "Editorial long-form scroll where each destination dissolves into the next through shader-driven image transitions. Lenis smooth scroll with a scroll-scrubbed timeline of 12 scenes.",
    role: "Creative Developer",
    year: "2025",
    tags: ["Three.js", "GLSL", "Lenis", "GSAP"],
    links: [{ label: "Live", href: "#" }],
    featured: true,
  },
  {
    id: "ledgr",
    index: "03",
    title: "Ledgr",
    tagline: "Fintech dashboard with Linear-grade density",
    description:
      "Cash-flow dashboard for SMEs: keyboard-first navigation, optimistic mutations and a command palette. Pure DOM tables rendering 10k rows without a single virtual-scroll jank.",
    role: "UI/UX & Frontend",
    year: "2025",
    tags: ["React", "TypeScript", "Tailwind", "tRPC"],
    links: [{ label: "Case Study", href: "#" }],
    featured: true,
  },
  {
    id: "aria-synth",
    index: "04",
    title: "Aria Synth",
    tagline: "Browser-native synthesizer you can play with your keyboard",
    description:
      "WebAudio polyphonic synth with an oscilloscope canvas, preset morphing and MIDI-in. Zero dependencies on the audio path; UI is a single server component plus one client island.",
    role: "Solo Build",
    year: "2024",
    tags: ["WebAudio", "Canvas", "React"],
    links: [{ label: "Play", href: "#" }],
    featured: false,
  },
];

export const skills: SkillGroup[] = [
  {
    category: "Frontend",
    items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion", "Lenis"],
  },
  {
    category: "Creative / 3D",
    items: ["Three.js", "React Three Fiber", "Drei", "GLSL", "WebAudio", "Canvas 2D"],
  },
  {
    category: "Backend & Tools",
    items: ["Node.js", "Laravel", "PostgreSQL", "Docker", "Git", "Vercel"],
  },
  {
    category: "Design",
    items: ["Figma", "Design Systems", "Prototyping", "Motion Design", "Typography"],
  },
];

export const experience: Experience[] = [
  {
    company: "Independent",
    role: "Freelance Creative Developer",
    period: "2023 — Now",
    summary:
      "Shipping marketing sites and interactive product stories for startups and agencies across SEA. Owner of the full loop: scoping, design, build, deploy.",
  },
  {
    company: "Studio Kanvas",
    role: "Frontend Engineer",
    period: "2022 — 2023",
    summary:
      "Built award-entry campaign sites and internal design-system tooling. Cut average LCP across the studio's client portfolio by 40%.",
  },
  {
    company: "DigitaLab",
    role: "UI/UX Designer",
    period: "2021 — 2022",
    summary:
      "Designed dashboards and mobile flows for fintech and logistics clients; handed off pixel-exact specs and prototyped every micro-interaction.",
  },
];

export const socials: SocialLink[] = [
  { label: "GitHub", handle: "@faustzaki", href: "https://github.com/faustzaki" },
  { label: "Dribbble", handle: "@faustzaki", href: "https://dribbble.com/faustzaki" },
  { label: "X", handle: "@faustzaki", href: "https://x.com/faustzaki" },
  { label: "Email", handle: "hello@faustzaki.dev", href: "mailto:hello@faustzaki.dev" },
];
