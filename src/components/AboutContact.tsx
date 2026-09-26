import { bio, socials } from "@/data/seed";

export function AboutContact() {
  return (
    <section id="about" aria-labelledby="about-heading" className="mt-24 scroll-mt-20">
      <div className="flex items-baseline justify-between">
        <h2 id="about-heading" className="font-display text-3xl font-bold tracking-tight">
          About & Contact
        </h2>
        <span className="font-mono text-xs text-muted">03</span>
      </div>

      <div className="mt-8 grid gap-px border border-border bg-border lg:grid-cols-5">
        <div className="bg-background p-8 md:p-12 lg:col-span-3">
          <p className="max-w-xl text-lg leading-relaxed">{bio.about}</p>
          <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted">
            Currently {bio.available ? "open to freelance and full-time opportunities" : "at capacity"}.
            Fastest way to reach me is email — I reply within a day.
          </p>
        </div>

        <div id="contact" className="scroll-mt-20 bg-surface p-8 md:p-12 lg:col-span-2">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Get in touch</p>
          <a
            href={`mailto:${bio.email}`}
            className="mt-4 block font-display text-2xl font-bold tracking-tight transition-colors hover:text-accent"
          >
            {bio.email}
          </a>
          <ul className="mt-8 space-y-3 text-sm">
            {socials.map((s) => (
              <li
                key={s.label}
                className="flex items-center justify-between gap-4 border-b border-border pb-3 last:border-0"
              >
                <span className="font-mono text-xs uppercase tracking-widest text-muted">
                  {s.label}
                </span>
                <a href={s.href} className="transition-colors hover:text-accent">
                  {s.handle} ↗
                </a>
              </li>
            ))}
          </ul>
          <a
            href={bio.resumeHref}
            download
            className="mt-10 inline-flex items-center gap-2 border border-accent px-4 py-2 font-mono text-xs uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-white"
          >
            Download resume ↓
          </a>
        </div>
      </div>
    </section>
  );
}
