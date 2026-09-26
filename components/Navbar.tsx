"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useFitLog } from "@/lib/context";

export function Navbar() {
  const pathname = usePathname();
  const { planCount, savedCount } = useFitLog();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isMyPlan = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12]/95 backdrop-blur-md border-b border-[#1b1d26]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-3">
          <Link
            href="/"
            className={`text-xs font-semibold tracking-wide transition-all px-4 py-2 rounded-full ${
              isHome
                ? "bg-[#182603] text-[#CCFF00] border border-[#2e4708]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-xs font-semibold tracking-wide transition-all px-4 py-2 rounded-full ${
              isMyPlan
                ? "bg-[#182603] text-[#CCFF00] border border-[#2e4708]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Badges */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#CCFF00] text-black text-[11px] font-extrabold flex items-center justify-center">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-[#1b1e28] border border-[#2c3040] text-white text-[11px] font-extrabold flex items-center justify-center">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-bold text-white"
          >
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-[#CCFF00] text-black text-[11px] font-extrabold flex items-center justify-center">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-bold text-white"
          >
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-[#1b1e28] border border-[#2c3040] text-white text-[11px] font-extrabold flex items-center justify-center">
              {savedCount}
            </span>
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-gray-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d12] border-b border-[#1b1d26] px-4 py-4 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-semibold px-4 py-2.5 rounded-lg ${
              isHome ? "bg-[#182603] text-[#CCFF00]" : "text-gray-400"
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm font-semibold px-4 py-2.5 rounded-lg ${
              isMyPlan ? "bg-[#182603] text-[#CCFF00]" : "text-gray-400"
            }`}
          >
            My Plan
          </Link>
        </div>
      )}
    </header>
  );
}
