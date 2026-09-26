"use client";

import { useState } from "react";
import { useFitLog } from "@/lib/context";
import { PlanMetrics } from "@/components/PlanMetrics";
import { PlanTabs } from "@/components/PlanTabs";
import { PlanWorkoutCard } from "@/components/PlanWorkoutCard";
import { EmptyState } from "@/components/EmptyState";
import { SortOption } from "@/lib/types";
import { sortWorkouts } from "@/lib/utils";

export default function MyPlanPage() {
  const {
    state,
    removeFromPlan,
    removeFromSaved,
    toggleComplete,
    isCompleted,
    isInitialized,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  if (!isInitialized) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-[#CCFF00] border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 font-mono text-xs">Loading workouts...</p>
      </div>
    );
  }

  const rawList = activeTab === "plan" ? state.plan : state.saved;
  const currentList = sortWorkouts(rawList, sortBy);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Title & Subtitle */}
      <div className="space-y-1.5">
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm font-medium">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <PlanMetrics planWorkouts={state.plan} />

      {/* Tabs & Sort Controls */}
      <PlanTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Workout List or Empty State */}
      {currentList.length === 0 ? (
        activeTab === "plan" ? (
          <EmptyState
            title="NOTHING HERE YET"
            description="Browse the library and add a lift to get today moving."
          />
        ) : (
          <EmptyState
            title="NO SAVED WORKOUTS"
            description="Browse the library and add a lift to get today moving."
          />
        )
      ) : (
        <div className="space-y-4">
          {currentList.map((workout) => (
            <PlanWorkoutCard
              key={workout.id}
              workout={workout}
              isCompleted={isCompleted(workout.id)}
              onToggleComplete={
                activeTab === "plan"
                  ? () => toggleComplete(workout.id)
                  : undefined
              }
              onRemove={
                activeTab === "plan"
                  ? () => removeFromPlan(workout.id)
                  : () => removeFromSaved(workout.id)
              }
              isSavedTab={activeTab === "saved"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
