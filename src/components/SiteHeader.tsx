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
  const { mode, toggle } = useMode();
  const showcase = mode === "showcase";
  const accent = showcase ? "var(--color-showcase)" : "var(--color-accent)";

  // Close mobile drawer on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className="sticky top-0 z-50 w-full bg-background"
      style={{ "--nav-accent": accent } as React.CSSProperties}
    >
      {/* Edge-to-edge layout without horizontal padding */}
      <div className="flex h-14 w-full items-center justify-between px-0">
        {/* Left corner: Name, Software Engineer, Minimalist Switch Box */}
        <div className="flex items-center gap-4 pl-0 sm:gap-6">
          <a
            href="#top"
            className="font-mono text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:text-[var(--nav-accent)]"
          >
            {bio.name}
          </a>

          <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted sm:inline-block">
            Software Engineer
          </span>

          {/* Minimalist switch box — no text label, purely a geometric box */}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle display mode"
            aria-pressed={showcase}
            title={showcase ? "Showcase mode active" : "Recruiter mode active"}
            className="relative flex h-3.5 w-3.5 items-center justify-center border transition-all duration-300"
            style={{
              borderColor: showcase ? "var(--color-showcase)" : "var(--color-border)",
              boxShadow: showcase ? "0 0 8px rgba(0, 240, 255, 0.45)" : "none",
            }}
          >
            <span
              className="block transition-all duration-300"
              style={{
                width: showcase ? "7px" : "0px",
                height: showcase ? "7px" : "0px",
                backgroundColor: showcase ? "var(--color-showcase)" : "transparent",
              }}
            />
          </button>
        </div>

        {/* Right corner: Desktop navigation links (About, Work, Skill, Contact) + Resume */}
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 pr-0 md:flex"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-nav-link
              className="font-mono text-xs uppercase tracking-widest text-muted"
            >
              {l.label}
            </a>
          ))}
          <a
            href={bio.resumeHref}
            download
            data-nav-link
            className="font-mono text-xs uppercase tracking-widest text-primary"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 pr-0 md:hidden focus:outline-none"
        >
          <span
            className="block h-[1.5px] w-5 bg-primary transition-all duration-300"
            style={{
              transform: mobileOpen
                ? "translateY(4.5px) rotate(45deg)"
                : "none",
              backgroundColor: mobileOpen ? accent : undefined,
            }}
          />
          <span
            className="block h-[1.5px] w-5 bg-primary transition-all duration-300"
            style={{
              transform: mobileOpen
                ? "translateY(-4.5px) rotate(-45deg)"
                : "none",
              backgroundColor: mobileOpen ? accent : undefined,
            }}
          />
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-14 z-50 flex h-[calc(100vh-3.5rem)] flex-col justify-between bg-background px-6 py-10 md:hidden"
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
            <button
              type="button"
              onClick={toggle}
              className="flex items-center gap-3"
            >
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
