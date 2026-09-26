import { Workout } from "@/lib/types";
import { Dumbbell, ShieldAlert, Repeat, Layers, Clock, Flame, Star } from "lucide-react";

interface SpecsPanelProps {
  workout: Workout;
}

export function SpecsPanel({ workout }: SpecsPanelProps) {
  const specs = [
    {
      label: "EQUIPMENT",
      value: workout.equipment,
      icon: Dumbbell,
    },
    {
      label: "DIFFICULTY",
      value: workout.difficulty,
      icon: ShieldAlert,
    },
    {
      label: "SETS",
      value: `${workout.sets} sets`,
      icon: Layers,
    },
    {
      label: "REPS",
      value: workout.reps,
      icon: Repeat,
    },
    {
      label: "DURATION",
      value: `${workout.duration} min`,
      icon: Clock,
    },
    {
      label: "CALORIES",
      value: `${workout.caloriesBurned} kcal`,
      icon: Flame,
    },
    {
      label: "RATING",
      value: `${workout.rating.toFixed(1)} / 5.0`,
      icon: Star,
    },
  ];

  return (
    <div className="rounded-xl bg-fit-card border border-fit-border p-5 space-y-4">
      <h3 className="font-display text-sm font-bold uppercase text-white tracking-wider pb-3 border-b border-fit-border/60">
        KEY SPECS
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-fit-surface/60 rounded-lg p-3 border border-fit-border/40">
              <div className="flex items-center gap-1.5 text-fit-muted text-[10px] font-mono font-semibold uppercase">
                <Icon className="w-3.5 h-3.5 text-fit-lime" />
                <span>{item.label}</span>
              </div>
              <div className="font-mono text-sm font-bold text-white mt-1 capitalize">
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
