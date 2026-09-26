"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Dumbbell, Bookmark } from "lucide-react";
import { Logo } from "./Logo";
import { useFitLog } from "@/lib/context";

export function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 bg-fit-bg/90 backdrop-blur-md border-b border-fit-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Nav links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className={`text-sm font-semibold tracking-wider uppercase transition-colors py-1 border-b-2 ${
              isActive("/") && pathname === "/"
                ? "text-fit-lime border-fit-lime"
                : "text-fit-muted hover:text-white border-transparent"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold tracking-wider uppercase transition-colors py-1 border-b-2 ${
              isActive("/my-plan")
                ? "text-fit-lime border-fit-lime"
                : "text-fit-muted hover:text-white border-transparent"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fit-lime text-black font-semibold text-xs tracking-wider uppercase hover:bg-fit-lime-hover transition-all shadow-sm active:scale-95"
            aria-label={`Today's Plan with ${planCount} items`}
          >
            <Dumbbell className="w-3.5 h-3.5 text-black" />
            <span>Plan</span>
            <span className="bg-black text-fit-lime px-1.5 py-0.5 rounded-full text-[11px] font-bold min-w-[20px] text-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fit-surface border border-fit-border-light text-white font-semibold text-xs tracking-wider uppercase hover:border-fit-lime hover:text-fit-lime transition-all active:scale-95"
            aria-label={`Saved workouts with ${savedCount} items`}
          >
            <Bookmark className="w-3.5 h-3.5 text-fit-muted group-hover:text-fit-lime transition-colors" />
            <span>Saved</span>
            <span className="bg-fit-card border border-fit-border text-white group-hover:border-fit-lime group-hover:text-fit-lime px-1.5 py-0.5 rounded-full text-[11px] font-bold min-w-[20px] text-center">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Quick badge links on mobile header */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fit-lime text-black text-xs font-bold"
          >
            <Dumbbell className="w-3 h-3" />
            <span>{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-fit-surface border border-fit-border text-white text-xs font-bold"
          >
            <Bookmark className="w-3 h-3 text-fit-lime" />
            <span>{savedCount}</span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-fit-muted hover:text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-fit-lime"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-fit-surface border-b border-fit-border px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-semibold uppercase tracking-wider py-2 px-3 rounded-lg transition-colors ${
                isActive("/") && pathname === "/"
                  ? "bg-fit-card text-fit-lime border-l-4 border-fit-lime"
                  : "text-fit-muted hover:text-white"
              }`}
            >
              Workout Library
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base font-semibold uppercase tracking-wider py-2 px-3 rounded-lg transition-colors ${
                isActive("/my-plan")
                  ? "bg-fit-card text-fit-lime border-l-4 border-fit-lime"
                  : "text-fit-muted hover:text-white"
              }`}
            >
              My Plan ({planCount})
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
