import { Dumbbell, Clock, Flame } from "lucide-react";
import { Workout } from "@/lib/types";

interface PlanMetricsProps {
  planWorkouts: Workout[];
}

export function PlanMetrics({ planWorkouts }: PlanMetricsProps) {
  const totalExercises = planWorkouts.length;
  const totalMinutes = planWorkouts.reduce((sum, w) => sum + (w.duration || 0), 0);
  const totalCalories = planWorkouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);

  const metrics = [
    {
      title: "Exercises",
      value: totalExercises,
      unit: "Lifts",
      icon: Dumbbell,
      color: "text-fit-lime",
    },
    {
      title: "Minutes",
      value: totalMinutes,
      unit: "Min",
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Calories",
      value: totalCalories,
      unit: "Kcal",
      icon: Flame,
      color: "text-orange-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="bg-fit-card border border-fit-border rounded-xl p-5 flex items-center justify-between shadow-lg"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase text-fit-muted">
                {m.title}
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-extrabold text-white">
                  {m.value}
                </span>
                <span className="text-xs font-mono text-fit-muted uppercase">{m.unit}</span>
              </div>
            </div>

            <div className={`p-3 rounded-lg bg-fit-surface border border-fit-border/60 ${m.color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
