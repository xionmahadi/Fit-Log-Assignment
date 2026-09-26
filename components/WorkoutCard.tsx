"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";
import { Workout } from "@/lib/types";
import { DEFAULT_WORKOUT_IMAGE } from "@/lib/api";
import { useState } from "react";

interface WorkoutCardProps {
  workout: Workout;
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const [imgSrc, setImgSrc] = useState(workout.image);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block rounded-xl bg-fit-card border border-fit-border hover:border-fit-lime/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-fit-lime/5 flex flex-col h-full"
    >
      {/* Image Area */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-fit-surface">
        <Image
          src={imgSrc}
          alt={workout.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgSrc(DEFAULT_WORKOUT_IMAGE)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-fit-card via-transparent to-transparent opacity-80" />

        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3 z-10 bg-fit-bg/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-fit-border text-[10px] font-mono font-bold uppercase tracking-wider text-fit-lime">
          {workout.difficulty}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Category tags */}
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-fit-surface border border-fit-border text-[10px] font-mono font-bold uppercase tracking-wider text-fit-muted group-hover:text-white group-hover:border-fit-lime/40 transition-colors"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-display text-xl font-bold uppercase text-white tracking-wide group-hover:text-fit-lime transition-colors line-clamp-1">
            {workout.name}
          </h3>

          {/* Equipment */}
          <div className="flex items-center gap-1.5 text-xs text-fit-muted font-mono line-clamp-1">
            <Dumbbell className="w-3.5 h-3.5 text-fit-lime shrink-0" />
            <span>{workout.equipment}</span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-fit-border/60 flex items-center justify-between text-xs font-mono text-fit-muted">
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
    </Link>
  );
}
