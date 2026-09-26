"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Bookmark, Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { Workout } from "@/lib/types";
import { fetchWorkoutById, DEFAULT_WORKOUT_IMAGE } from "@/lib/api";
import { useFitLog } from "@/lib/context";
import { SpecsPanel } from "@/components/SpecsPanel";
import { InstructionList } from "@/components/InstructionList";

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
        <div className="h-6 w-32 bg-[#111319] rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 h-[450px] bg-[#111319] rounded-2xl animate-pulse" />
          <div className="lg:col-span-6 space-y-4">
            <div className="h-10 w-2/3 bg-[#111319] rounded animate-pulse" />
            <div className="h-16 w-full bg-[#111319] rounded animate-pulse" />
            <div className="h-48 w-full bg-[#111319] rounded animate-pulse" />
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
          className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-gray-400 hover:text-[#CCFF00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO WORKOUTS</span>
        </Link>
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Image */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full rounded-2xl overflow-hidden bg-[#111319] border border-[#1e2029] shadow-2xl">
            <Image
              src={imgSrc}
              alt={workout.name}
              fill
              priority
              className="object-cover"
              onError={() => setImgSrc(DEFAULT_WORKOUT_IMAGE)}
            />
          </div>
        </div>

        {/* Right Column: Information & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Title & Subtitle */}
          <div className="space-y-2">
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
              {workout.name}
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Category Pill Badges */}
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group, idx) => (
              <span
                key={idx}
                className="px-4 py-1.5 rounded-full bg-[#CCFF00] text-black font-bold text-xs"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Key Specs Panel */}
          <SpecsPanel workout={workout} />

          {/* Instructions */}
          <InstructionList instructions={workout.instructions} />

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            {/* Primary Action: Add to Today's Plan */}
            <button
              onClick={() => addToPlan(workout)}
              className={`flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all cursor-pointer ${
                addedToPlan
                  ? "bg-[#CCFF00]/20 text-[#CCFF00] border border-[#CCFF00]/50"
                  : isPlanFull
                  ? "bg-[#111319] text-gray-500 border border-[#1e2029]"
                  : "bg-[#CCFF00] text-black hover:bg-[#b8e600]"
              }`}
            >
              {addedToPlan ? (
                <>
                  <Check className="w-4 h-4 text-[#CCFF00]" />
                  <span>Added to today&apos;s plan</span>
                </>
              ) : isPlanFull ? (
                <>
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span>Plan Full (5/5)</span>
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4" />
                  <span>Add to today&apos;s plan</span>
                </>
              )}
            </button>

            {/* Secondary Action: Save for Later */}
            <button
              onClick={() => saveWorkout(workout)}
              className={`inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all border cursor-pointer ${
                savedForLater
                  ? "bg-[#111319] text-[#CCFF00] border-[#CCFF00]/50"
                  : "bg-[#111319] border-[#2a2d3d] hover:border-[#CCFF00] text-white"
              }`}
            >
              {savedForLater ? (
                <>
                  <Check className="w-4 h-4 text-[#CCFF00]" />
                  <span>Saved for later</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Save for later</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
