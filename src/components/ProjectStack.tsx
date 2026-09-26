import { projects } from "@/data/seed";

/**
 * Stacking offset: `--stack-top` (globals.css, 96px on mobile for the two-row
 * header) + 14px depth per card.
 */
const STEP = 14;

export function ProjectStack() {
  const total = String(projects.length).padStart(2, "0");
  return (
    <section id="work" aria-labelledby="work-heading" className="mt-24 scroll-mt-20">
      <div className="flex items-baseline justify-between">
        <h2 id="work-heading" className="font-display text-3xl font-bold tracking-tight">
          Selected Work
        </h2>
        <span className="font-mono text-xs text-muted">01 / {total}</span>
      </div>

      <div className="mt-8">
        {projects.map((p, i) => (
          <article
            key={p.id}
            style={{ top: `calc(var(--stack-top) + ${i * STEP}px)` }}
            className="sticky border border-border bg-surface p-6 shadow-[0_-8px_24px_rgba(0,0,0,0.35)] md:p-10"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-sm text-accent">
                {p.index} <span className="text-muted">/ {total}</span>
              </span>
              <span className="font-mono text-xs text-muted">{p.year}</span>
            </div>
            <h3 className="mt-6 font-display text-3xl font-bold tracking-tight md:text-4xl">
              {p.title}
            </h3>
            <p className="mt-2 text-muted">{p.tagline}</p>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">{p.description}</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <ul className="flex flex-wrap gap-2" aria-label="Technologies">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="border border-border bg-background px-2 py-1 font-mono text-xs text-muted"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted">{p.role}</span>
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="font-mono text-xs uppercase tracking-widest text-primary transition-colors hover:text-accent"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
