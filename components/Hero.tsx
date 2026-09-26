"use client";

import Image from "next/image";
import { ArrowDown, Flame, Zap } from "lucide-react";

export function Hero() {
  const scrollToLibrary = () => {
    const element = document.getElementById("library");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-fit-bg via-fit-surface/50 to-fit-bg border-b border-fit-border py-12 md:py-20">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-fit-lime/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fit-surface border border-fit-border text-fit-lime text-xs font-mono font-semibold tracking-wider uppercase">
              <Zap className="w-3.5 h-3.5" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight uppercase leading-[0.95] drop-shadow-sm">
              TRAIN WITH INTENT. <br />
              <span className="text-fit-lime">LOG EVERY SET.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-fit-muted text-base sm:text-lg max-w-xl font-normal leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#library"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToLibrary();
                }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-fit-lime text-black font-display font-bold text-lg tracking-wider uppercase hover:bg-fit-lime-hover transform hover:-translate-y-0.5 transition-all shadow-lg shadow-fit-lime/10 active:translate-y-0 cursor-pointer"
              >
                <span>BROWSE WORKOUTS</span>
                <ArrowDown className="w-5 h-5" />
              </a>
            </div>

            {/* Quick feature highlights */}
            <div className="pt-6 border-t border-fit-border/60 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="font-display font-bold text-xl text-white">12</div>
                <div className="text-xs text-fit-muted font-mono uppercase">Master Lifts</div>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-fit-lime">5 MAX</div>
                <div className="text-xs text-fit-muted font-mono uppercase">Daily Cap</div>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-white">100%</div>
                <div className="text-xs text-fit-muted font-mono uppercase">Tracked</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-fit-border bg-fit-card shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-t from-fit-card via-transparent to-transparent z-10" />
              <Image
                src="/assets/banner.png"
                alt="FitLog Training Hero"
                width={740}
                height={500}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                priority
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-fit-bg/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-fit-border">
                <Flame className="w-4 h-4 text-fit-lime" />
                <span className="text-xs font-mono font-semibold text-white tracking-wider uppercase">
                  HIGH-INTENSITY LIBRARIES
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
