import { Workout } from "@/lib/types";

interface SpecsPanelProps {
  workout: Workout;
}

export function SpecsPanel({ workout }: SpecsPanelProps) {
  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets.toString() },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating.toFixed(1) },
  ];

  return (
    <div className="bg-[#111319] border border-[#1e2029] rounded-2xl divide-y divide-[#1e2029] overflow-hidden">
      {specs.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between px-6 py-3.5 text-xs font-semibold"
        >
          <span className="text-gray-400 uppercase font-mono tracking-wider">
            {item.label}
          </span>
          <span className="text-white capitalize font-mono">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}
