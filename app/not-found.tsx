import Link from "next/link";
import { Dumbbell, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="rounded-2xl bg-fit-card border border-fit-border p-8 sm:p-16 text-center max-w-lg w-full space-y-6 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-fit-lime/5 rounded-full blur-2xl pointer-events-none" />

        <div className="w-20 h-20 rounded-full bg-fit-lime/10 border border-fit-lime/30 flex items-center justify-center mx-auto text-fit-lime">
          <Dumbbell className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-fit-lime bg-fit-lime/10 px-3 py-1 rounded-full border border-fit-lime/30">
            ERROR 404
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight pt-2">
            WORKOUT NOT FOUND
          </h1>
          <p className="text-fit-muted text-sm sm:text-base max-w-sm mx-auto pt-1 font-normal leading-relaxed">
            The workout or page you are looking for does not exist or has been removed from the library.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-fit-lime text-black font-display font-bold text-base tracking-wider uppercase hover:bg-fit-lime-hover transition-all shadow-lg active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>BACK TO WORKOUTS</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
