import { bio } from "@/data/seed";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-8">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {bio.name} — {bio.location}
        </p>
        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-primary"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
