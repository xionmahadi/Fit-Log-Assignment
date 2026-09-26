import Link from "next/link";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({
  title = "NOTHING HERE YET",
  description = "Browse the library and add a lift to get today moving.",
}: EmptyStateProps) {
  return (
    <div className="border border-dashed border-[#232736] rounded-2xl p-12 sm:p-20 text-center bg-[#111319]/40 my-4 space-y-4">
      <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide">
        {title}
      </h3>
      <p className="text-xs text-gray-400 max-w-sm mx-auto font-medium">
        {description}
      </p>
      <div className="pt-2">
        <Link
          href="/"
          className="inline-block bg-[#CCFF00] hover:bg-[#b8e600] text-black font-bold text-xs px-6 py-2.5 rounded-full transition-all shadow-md active:scale-95"
        >
          Go to workouts
        </Link>
      </div>
    </div>
  );
}
