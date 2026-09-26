"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check, X, ExternalLink, Clock, Flame, Star, Dumbbell } from "lucide-react";
import { Workout } from "@/lib/types";
import { DEFAULT_WORKOUT_IMAGE } from "@/lib/api";

interface PlanWorkoutCardProps {
  workout: Workout;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
  onRemove: () => void;
  isSavedTab?: boolean;
}

export function PlanWorkoutCard({
  workout,
  isCompleted = false,
  onToggleComplete,
  onRemove,
  isSavedTab = false,
}: PlanWorkoutCardProps) {
  const [imgSrc, setImgSrc] = useState(workout.image);

  return (
    <div
      className={`rounded-xl bg-fit-card border transition-all duration-300 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between ${
        isCompleted
          ? "border-fit-lime/40 bg-fit-surface/80 opacity-90"
          : "border-fit-border hover:border-fit-border-light"
      }`}
    >
      {/* Left: Thumbnail & Info */}
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden bg-fit-surface shrink-0 border border-fit-border">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            className="object-cover"
            onError={() => setImgSrc(DEFAULT_WORKOUT_IMAGE)}
          />
          {isCompleted && (
            <div className="absolute inset-0 bg-fit-lime/20 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-fit-lime text-black font-mono font-extrabold text-[10px] px-1.5 py-0.5 rounded uppercase">
                DONE
              </span>
            </div>
          )}
        </div>

        {/* Workout Info */}
        <div className="space-y-1.5 flex-grow">
          <div className="flex items-center gap-2">
            <h4
              className={`font-display text-lg font-bold uppercase tracking-wide ${
                isCompleted ? "line-through text-fit-muted" : "text-white"
              }`}
            >
              {workout.name}
            </h4>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-fit-lime bg-fit-lime/10 px-2 py-0.5 rounded border border-fit-lime/30">
                <Check className="w-3 h-3" /> COMPLETED
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-fit-muted font-mono">
            <Dumbbell className="w-3.5 h-3.5 text-fit-lime shrink-0" />
            <span>{workout.equipment}</span>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono text-fit-muted">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-fit-lime" />
              <span>{workout.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <div className="flex items-center gap-1 text-white font-bold">
              <Star className="w-3.5 h-3.5 fill-fit-lime text-fit-lime" />
              <span>{workout.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end pt-3 sm:pt-0 border-t sm:border-t-0 border-fit-border/60">
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-fit-surface border border-fit-border text-xs font-mono font-semibold uppercase text-fit-muted hover:text-white hover:border-fit-lime transition-all"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">View Details</span>
        </Link>

        {!isSavedTab && onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs font-bold uppercase transition-all cursor-pointer ${
              isCompleted
                ? "bg-fit-lime/20 text-fit-lime border border-fit-lime/50 hover:bg-fit-lime/30"
                : "bg-fit-lime text-black hover:bg-fit-lime-hover shadow-sm"
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isCompleted ? "Completed" : "Mark as Done"}</span>
          </button>
        )}

        <button
          onClick={onRemove}
          className="p-2 rounded-lg bg-fit-surface border border-fit-border text-fit-muted hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all cursor-pointer"
          aria-label={`Remove ${workout.name}`}
          title="Remove workout"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
