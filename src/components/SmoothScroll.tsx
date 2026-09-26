"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Global smooth-scroll engine (§3). No preventDefault / no hijack — Lenis
// drives the native scrollbar; Framer's useScroll reads it for scrubbing.
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    // Publish instance so scroll-consumers (header, hero scrub) share one source of truth.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    // ponytail: raf loop runs always; upgrade to pause-on-hidden when Showcase WebGL lands.
    let id: number;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}