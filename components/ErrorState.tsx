import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  onRetry: () => void;
  message?: string;
}

export function ErrorState({ onRetry, message }: ErrorStateProps) {
  return (
    <div className="rounded-2xl bg-fit-card border border-red-900/30 p-8 sm:p-12 text-center max-w-xl mx-auto my-12 space-y-6 shadow-2xl">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-500">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-white">
          UNABLE TO LOAD WORKOUTS
        </h3>
        <p className="text-fit-muted text-sm max-w-md mx-auto">
          {message || "Something went wrong while loading the workout library."}
        </p>
      </div>

      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-fit-lime text-black font-display font-bold text-sm tracking-wider uppercase hover:bg-fit-lime-hover transition-colors shadow-lg active:scale-95 cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>TRY AGAIN</span>
      </button>
    </div>
  );
}
