import { bio } from "@/data/seed";

/**
 * Full-bleed hero: no card, edge-to-edge, giant name flush to the bottom.
 * Layout mirrors the reference: top row (two sentences, split left/right),
 * middle row (the "i create" list on the left, small meta on the right),
 * giant name pinned to the bottom edge.
 * All motion is CSS (globals.css §Hero) so this stays a server component.
 * ponytail: add "use client" only when the name needs real typing state.
 */

// Name split for the display stack. The first token is rendered giant and
// flush-left, the rest right-aligned underneath so the block fills the width.
const NAME_LINES = ["Faustzaki", "Ghathaf", "Rizqi"];

// The display block is currently plain text; the per-character reveal markup is
// parked (see PENDING_REVEAL below) until the styling is locked in.
const PENDING_REVEAL = false;

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="relative">
      {/* Scroll track: it must stay taller than the panel, because the
          difference IS the sticky travel (100svh) that the scroll animation
          reads. The blank tail it creates is cancelled by main's negative
          margin in page.tsx, not by shortening this box. */}
      <div className="hero-track h-[calc(200svh-6rem)]">
        {/* Full screen height: the panel IS the viewport. pt-20 clears the
            64px fixed header; pb-6 keeps the baseline off the very edge. */}
        <div className="hero-card flex min-h-[100svh] flex-col justify-between gap-10 px-5 pb-6 pt-20 sm:px-8 md:px-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <p className="max-w-md text-lg leading-snug text-primary sm:max-w-sm md:text-xl">
              {bio.headlineTall}
            </p>
            <p className="max-w-md text-lg leading-snug text-muted sm:max-w-sm sm:text-right md:text-xl">
              {bio.taglineTall}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
            <ul className="font-mono text-sm text-primary md:text-base">
              {bio.creates.map((w) => (
                <li key={w}>i create {w}</li>
              ))}
            </ul>
            <div className="font-mono text-xs text-muted sm:text-right">
              <p>{bio.location}</p>
              <p>{bio.role}</p>
            </div>
          </div>

          <h1 className="hero-name w-full font-display font-bold uppercase">
            {NAME_LINES.map((line, li) =>
              PENDING_REVEAL ? (
                <span key={li} className="hero-name-line">
                  {line.split("").map((ch, ci) => (
                    <span key={ci} className="hero-name-char" style={{ "--i": ci } as React.CSSProperties}>
                      {ch}
                    </span>
                  ))}
                </span>
              ) : (
                <span key={li} className={li === 0 ? "block" : "block text-right"}>
                  {line}
                </span>
              ),
            )}
          </h1>
        </div>
      </div>
    </section>
  );
}
