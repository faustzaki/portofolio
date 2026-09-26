import { bio } from "@/data/seed";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="grid gap-px border border-border bg-border lg:grid-cols-5"
    >
      <div className="flex flex-col justify-between bg-background p-8 md:p-12 lg:col-span-3">
        <div>
          <span className="inline-flex items-center gap-2 border border-border bg-surface px-3 py-1 font-mono text-xs text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
            {bio.available ? "Available for new projects" : "Not accepting new projects"}
          </span>
          <h1 className="mt-8 max-w-2xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
            {bio.headline}
          </h1>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
          <a
            href="#work"
            className="font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:text-primary"
          >
            View selected work ↓
          </a>
          <span className="font-mono text-xs text-muted">
            {bio.role} — {bio.location}
          </span>
        </div>
      </div>

      <aside className="bg-surface p-8 md:p-12 lg:col-span-2">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">Metadata</p>
        <dl className="mt-6 space-y-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-widest text-muted">Role</dt>
            <dd className="text-right">{bio.role}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-widest text-muted">Location</dt>
            <dd className="text-right">{bio.location}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="font-mono text-xs uppercase tracking-widest text-muted">Email</dt>
            <dd className="text-right">
              <a href={`mailto:${bio.email}`} className="transition-colors hover:text-accent">
                {bio.email}
              </a>
            </dd>
          </div>
        </dl>
        <div className="mt-10 grid grid-cols-3 gap-px border border-border bg-border">
          {bio.stats.map((s) => (
            <div key={s.label} className="bg-surface p-4">
              <p className="font-display text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </aside>
    </section>
  );
}
