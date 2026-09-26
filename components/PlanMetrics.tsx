import { Workout } from "@/lib/types";

interface PlanMetricsProps {
  planWorkouts: Workout[];
}

export function PlanMetrics({ planWorkouts }: PlanMetricsProps) {
  const totalExercises = planWorkouts.length;
  const totalMinutes = planWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = planWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

  return (
    <div className="bg-[#111319] border border-[#1e2029] rounded-2xl p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-[#1e2029]">
      {/* Exercises */}
      <div className="sm:pr-6 space-y-2">
        <span className="text-xs font-semibold text-gray-400 block">Exercises</span>
        <div className="font-display text-4xl sm:text-5xl font-extrabold text-[#CCFF00]">
          {totalExercises}
        </div>
      </div>

      {/* Minutes */}
      <div className="pt-4 sm:pt-0 sm:px-6 space-y-2">
        <span className="text-xs font-semibold text-gray-400 block">Minutes</span>
        <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">
          {totalMinutes}
        </div>
      </div>

      {/* Calories */}
      <div className="pt-4 sm:pt-0 sm:pl-6 space-y-2">
        <span className="text-xs font-semibold text-gray-400 block">Calories</span>
        <div className="font-display text-4xl sm:text-5xl font-extrabold text-white">
          {totalCalories}
        </div>
      </div>
    </div>
  );
}
