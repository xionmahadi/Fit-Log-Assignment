"use client";

import { useEffect, useState, useCallback } from "react";
import { Workout, SortOption } from "@/lib/types";
import { fetchWorkouts } from "@/lib/api";
import { sortWorkouts } from "@/lib/utils";
import { WorkoutCard } from "./WorkoutCard";
import { SortDropdown } from "./SortDropdown";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { ErrorState } from "./ErrorState";
import { Dumbbell } from "lucide-react";

export function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWorkouts();
      setWorkouts(data);
    } catch (err) {
      setError("Something went wrong while loading the workout library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const sortedWorkouts = sortWorkouts(workouts, sortBy);

  return (
    <section id="library" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-fit-border">
        <div>
          <div className="flex items-center gap-2 text-fit-lime text-xs font-mono font-bold tracking-wider uppercase mb-1">
            <Dumbbell className="w-4 h-4" />
            <span>EXERCISE DIRECTORY</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
            THE LIBRARY
          </h2>
          <p className="text-fit-muted text-sm sm:text-base mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sorting Dropdown */}
        {!loading && !error && workouts.length > 0 && (
          <div className="self-start md:self-end">
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
        )}
      </div>

      {/* Content Rendering */}
      {loading ? (
        <LoadingSkeleton count={6} />
      ) : error ? (
        <ErrorState onRetry={loadData} message={error} />
      ) : sortedWorkouts.length === 0 ? (
        <div className="text-center py-16 bg-fit-card rounded-2xl border border-fit-border">
          <p className="text-fit-muted font-mono">No workouts found in the library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}
