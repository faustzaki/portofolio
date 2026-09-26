"use client";

import { useEffect, useState } from "react";
import { bio } from "@/data/seed";
import { useMode } from "@/components/ModeContext";

const links = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skill", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [floating, setFloating] = useState(false);
  const { mode, toggle } = useMode();
  const showcase = mode === "showcase";
  const accent = showcase ? "var(--color-showcase)" : "var(--color-accent)";

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Transparent over the full-screen hero, solid once the hero has started
  // its shrink (the timeline's first phase ends at 21%). Lenis drives the
  // native scrollbar, so the native `scroll` event is the reliable signal —
  // subscribing to window.__lenis races its (re)creation under StrictMode.
  useEffect(() => {
    const apply = () => setFloating(window.scrollY > window.innerHeight * 0.35);
    window.addEventListener("scroll", apply, { passive: true });
    apply();
    return () => window.removeEventListener("scroll", apply);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300 ${
        floating ? "bg-background" : "bg-transparent"
      }`}
      style={{ "--nav-accent": accent } as React.CSSProperties}
    >
      {/* Full-bleed 5-zone bar: name / role block / mode toggle / links / meta — items pinned near viewport edges */}
      <div className="flex h-16 w-full items-center justify-between gap-4 px-5 sm:px-8">
        {/* Zone 1 — far left wordmark */}
        <a
          href="#top"
          className="font-mono text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-[var(--nav-accent)]"
        >
          <span className="sm:hidden">{bio.name.split(" ")[0]}</span>
          <span className="hidden sm:inline">{bio.name}</span>
        </a>

        {/* Zone 2 — two-row role block */}
        <div className="hidden flex-col gap-0.5 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted lg:flex">
          <span>{bio.role}</span>
          <span>{bio.location}</span>
        </div>

        {/* Zone 3 — twin square indicators, doubles as the display-mode toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Toggle display mode"
          aria-pressed={showcase}
          title={showcase ? "Showcase mode active" : "Recruiter mode active"}
          className="hidden items-center gap-1.5 md:flex"
        >
          <span
            className="block h-2 w-2 border transition-colors duration-300"
            style={{ borderColor: showcase ? "var(--color-showcase)" : "var(--color-border)" }}
          />
          <span
            className="block h-2 w-2 transition-all duration-300"
            style={{
              backgroundColor: showcase ? "var(--color-showcase)" : "transparent",
              boxShadow: showcase ? "0 0 8px rgba(0, 240, 255, 0.45)" : "none",
              border: showcase ? "none" : "1px solid var(--color-border)",
            }}
          />
        </button>

        {/* Zone 4 — inline desktop navigation links */}
        <nav aria-label="Primary navigation" className="hidden items-center gap-7 md:flex lg:gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-nav-link
              className="font-mono text-xs uppercase tracking-widest text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Zone 5 — far right two-row meta */}
        <div className="hidden flex-col items-end gap-0.5 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted lg:flex">
          <span>{bio.available ? "Open for work" : "Closed"}</span>
          <a
            href={`mailto:${bio.email}`}
            className="normal-case transition-colors hover:text-[var(--nav-accent)]"
          >
            {bio.email}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 pr-0 focus:outline-none md:hidden"
        >
          <span
            className="block h-[1.5px] w-5 bg-primary transition-all duration-300"
            style={{
              transform: mobileOpen ? "translateY(4.5px) rotate(45deg)" : "none",
              backgroundColor: mobileOpen ? accent : undefined,
            }}
          />
          <span
            className="block h-[1.5px] w-5 bg-primary transition-all duration-300"
            style={{
              transform: mobileOpen ? "translateY(-4.5px) rotate(-45deg)" : "none",
              backgroundColor: mobileOpen ? accent : undefined,
            }}
          />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-16 z-50 flex h-[calc(100vh-4rem)] flex-col justify-between bg-background px-6 py-10 md:hidden"
        >
          <div className="flex flex-col gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                data-nav-link
                className="font-mono text-base uppercase tracking-widest text-muted transition-colors hover:text-[var(--nav-accent)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href={bio.resumeHref}
              download
              onClick={() => setMobileOpen(false)}
              data-nav-link
              className="font-mono text-base uppercase tracking-widest text-primary transition-colors hover:text-[var(--nav-accent)]"
            >
              Resume
            </a>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6 font-mono text-xs text-muted">
            <span className="tracking-widest">DISPLAY MODE</span>
            <button type="button" onClick={toggle} className="flex items-center gap-3">
              <span
                className="flex h-4 w-4 items-center justify-center border transition-all duration-300"
                style={{
                  borderColor: showcase ? "var(--color-showcase)" : "var(--color-border)",
                  boxShadow: showcase ? "0 0 8px rgba(0, 240, 255, 0.45)" : "none",
                }}
              >
                <span
                  className="block transition-all duration-300"
                  style={{
                    width: showcase ? "8px" : "0px",
                    height: showcase ? "8px" : "0px",
                    backgroundColor: showcase ? "var(--color-showcase)" : "transparent",
                  }}
                />
              </span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
