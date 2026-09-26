"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Check, X, Clock, Flame, Star } from "lucide-react";
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
    <div className="bg-[#111319] border border-[#1e2029] rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all">
      {/* Left: Thumbnail & Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        {/* Thumbnail */}
        <div className="relative w-28 h-20 rounded-xl overflow-hidden bg-[#181a24] shrink-0 border border-[#222532]">
          <Image
            src={imgSrc}
            alt={workout.name}
            fill
            className="object-cover"
            onError={() => setImgSrc(DEFAULT_WORKOUT_IMAGE)}
          />
          {isCompleted && (
            <div className="absolute inset-0 bg-[#CCFF00]/20 backdrop-blur-[1px] flex items-center justify-center">
              <span className="bg-[#CCFF00] text-black font-extrabold text-[10px] px-2 py-0.5 rounded uppercase">
                DONE
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-1">
          <h4
            className={`font-display text-base font-extrabold uppercase tracking-wide ${
              isCompleted ? "line-through text-gray-400" : "text-white"
            }`}
          >
            {workout.name}
          </h4>

          <p className="text-xs text-gray-400 font-medium">
            {workout.equipment}
          </p>

          {/* Stats Line */}
          <div className="flex items-center gap-3 pt-1 text-xs font-semibold text-gray-300">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>{workout.duration} min</span>
            </div>

            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>{workout.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-[#1e2029]">
        <Link
          href={`/workout/${workout.id}`}
          className="border border-[#2c3040] bg-[#1b1e28] hover:bg-[#242836] text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all"
        >
          View Details
        </Link>

        {!isSavedTab && onToggleComplete && (
          <button
            onClick={onToggleComplete}
            className={`text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              isCompleted
                ? "bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50"
                : "bg-[#CCFF00] text-black hover:bg-[#b8e600]"
            }`}
          >
            <Check className="w-4 h-4" />
            <span>{isCompleted ? "Completed" : "Mark as Done"}</span>
          </button>
        )}

        <button
          onClick={onRemove}
          className="text-gray-400 hover:text-white p-2 transition-colors cursor-pointer"
          aria-label={`Remove ${workout.name}`}
          title="Remove workout"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
