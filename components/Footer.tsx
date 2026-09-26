import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-fit-surface border-t border-fit-border py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        {/* Left: Brand */}
        <Logo />

        {/* Right: Copyright */}
        <p className="text-xs text-fit-muted tracking-wide font-mono">
          &copy; 2026 FitLog &mdash; Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
