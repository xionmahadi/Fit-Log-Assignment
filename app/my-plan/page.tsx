"use client";

import { useState } from "react";
import { useFitLog } from "@/lib/context";
import { PlanMetrics } from "@/components/PlanMetrics";
import { PlanTabs } from "@/components/PlanTabs";
import { PlanWorkoutCard } from "@/components/PlanWorkoutCard";
import { EmptyState } from "@/components/EmptyState";
import { Dumbbell } from "lucide-react";

export default function MyPlanPage() {
  const {
    state,
    removeFromPlan,
    removeFromSaved,
    toggleComplete,
    isCompleted,
    planCount,
    savedCount,
    isInitialized,
  } = useFitLog();

  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  if (!isInitialized) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-fit-lime border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-fit-muted font-mono text-sm">Loading workouts...</p>
      </div>
    );
  }

  const currentList = activeTab === "plan" ? state.plan : state.saved;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Title & Subtitle */}
      <div className="space-y-2 border-b border-fit-border pb-6">
        <div className="flex items-center gap-2 text-fit-lime text-xs font-mono font-bold tracking-wider uppercase">
          <Dumbbell className="w-4 h-4" />
          <span>DAILY LOG & BOOKMARKS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
          MY PLAN
        </h1>
        <p className="text-fit-muted text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (Calculated from Today's Plan) */}
      <PlanMetrics planWorkouts={state.plan} />

      {/* Tabs & Content */}
      <div className="space-y-6">
        <PlanTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          planCount={planCount}
          savedCount={savedCount}
        />

        {currentList.length === 0 ? (
          activeTab === "plan" ? (
            <EmptyState
              title="NOTHING HERE YET"
              description="Browse the library and add a lift to get today moving."
            />
          ) : (
            <EmptyState
              title="NO SAVED WORKOUTS"
              description="Bookmark lifts from the library to save them for later."
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
    </div>
  );
}
