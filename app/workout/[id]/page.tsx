"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Dumbbell, Bookmark, Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { Workout } from "@/lib/types";
import { fetchWorkoutById, DEFAULT_WORKOUT_IMAGE } from "@/lib/api";
import { useFitLog } from "@/lib/context";
import { SpecsPanel } from "@/components/SpecsPanel";
import { InstructionList } from "@/components/InstructionList";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

export default function WorkoutDetailPage() {
  const params = useParams();
  const idStr = Array.isArray(params?.id) ? params.id[0] : params?.id;
  
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [imgSrc, setImgSrc] = useState<string>(DEFAULT_WORKOUT_IMAGE);

  const { addToPlan, saveWorkout, isInPlan, isSaved, isPlanFull } = useFitLog();

  useEffect(() => {
    if (!idStr) return;

    let isMounted = true;
    setLoading(true);
    setError(false);

    fetchWorkoutById(idStr)
      .then((data) => {
        if (!isMounted) return;
        if (!data) {
          setError(true);
        } else {
          setWorkout(data);
          setImgSrc(data.image);
        }
      })
      .catch(() => {
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [idStr]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="h-6 w-32 bg-fit-surface rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 h-[400px] bg-fit-surface rounded-2xl animate-pulse" />
          <div className="lg:col-span-7 space-y-4">
            <div className="h-10 w-2/3 bg-fit-surface rounded animate-pulse" />
            <div className="h-20 w-full bg-fit-surface rounded animate-pulse" />
            <div className="h-40 w-full bg-fit-surface rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !workout) {
    notFound();
  }

  const addedToPlan = isInPlan(workout.id);
  const savedForLater = isSaved(workout.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-fit-muted hover:text-fit-lime transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO WORKOUTS</span>
        </Link>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="lg:col-span-5 relative group">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-fit-card border border-fit-border shadow-2xl">
            <Image
              src={imgSrc}
              alt={workout.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              onError={() => setImgSrc(DEFAULT_WORKOUT_IMAGE)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fit-card via-transparent to-transparent opacity-80" />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
              {workout.muscleGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-md bg-fit-bg/90 backdrop-blur-md border border-fit-border text-xs font-mono font-bold uppercase tracking-wider text-fit-lime"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Title & Description */}
          <div className="space-y-3">
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
              {workout.name}
            </h1>
            <p className="text-fit-muted text-base sm:text-lg font-normal leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {/* Primary Action: Add to Today's Plan */}
            <button
              onClick={() => addToPlan(workout)}
              disabled={addedToPlan || isPlanFull}
              className={`flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-display font-bold text-base tracking-wider uppercase transition-all shadow-lg cursor-pointer ${
                addedToPlan
                  ? "bg-fit-lime/20 text-fit-lime border border-fit-lime/50 cursor-not-allowed"
                  : isPlanFull
                  ? "bg-fit-surface text-fit-muted border border-fit-border cursor-not-allowed opacity-75"
                  : "bg-fit-lime text-black hover:bg-fit-lime-hover hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {addedToPlan ? (
                <>
                  <Check className="w-5 h-5 text-fit-lime" />
                  <span>ADDED TO TODAY&apos;S PLAN</span>
                </>
              ) : isPlanFull ? (
                <>
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  <span>PLAN FULL (5/5 MAX)</span>
                </>
              ) : (
                <>
                  <Dumbbell className="w-5 h-5" />
                  <span>ADD TO TODAY&apos;S PLAN</span>
                </>
              )}
            </button>

            {/* Secondary Action: Save for Later */}
            <button
              onClick={() => saveWorkout(workout)}
              disabled={savedForLater}
              className={`inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-display font-bold text-base tracking-wider uppercase transition-all border cursor-pointer ${
                savedForLater
                  ? "bg-fit-surface text-fit-lime border-fit-lime/50 cursor-not-allowed"
                  : "bg-fit-card border-fit-border-light text-white hover:border-fit-lime hover:text-fit-lime hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {savedForLater ? (
                <>
                  <Check className="w-5 h-5 text-fit-lime" />
                  <span>SAVED FOR LATER</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" />
                  <span>SAVE FOR LATER</span>
                </>
              )}
            </button>
          </div>

          {/* Plan limit warning message if full and not added */}
          {isPlanFull && !addedToPlan && (
            <p className="text-xs font-mono text-orange-400/90 bg-orange-500/10 border border-orange-500/20 px-3 py-2 rounded-lg">
              Note: Today&apos;s plan is capped at 5 workouts. Remove a workout from your plan to add this one.
            </p>
          )}

          {/* Key Specs */}
          <SpecsPanel workout={workout} />

          {/* Instructions */}
          <InstructionList instructions={workout.instructions} />
        </div>
      </div>
    </div>
  );
}
