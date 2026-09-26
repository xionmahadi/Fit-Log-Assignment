import Link from "next/link";
import { Dumbbell, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "NOTHING HERE YET",
  description = "Browse the library and add a lift to get today moving.",
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl bg-fit-card border border-fit-border p-10 sm:p-16 text-center space-y-6 max-w-xl mx-auto my-8">
      <div className="w-16 h-16 rounded-full bg-fit-lime/10 border border-fit-lime/30 flex items-center justify-center mx-auto text-fit-lime">
        <Dumbbell className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          {title}
        </h3>
        <p className="text-fit-muted text-sm max-w-sm mx-auto font-normal leading-relaxed">
          {description}
        </p>
      </div>

      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fit-lime text-black font-display font-bold text-sm tracking-wider uppercase hover:bg-fit-lime-hover transition-colors shadow-lg active:scale-95"
        >
          <span>GO TO WORKOUTS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
