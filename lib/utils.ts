import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Workout, SortOption } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortWorkouts(workouts: Workout[], sortBy: SortOption): Workout[] {
  const list = [...workouts];
  switch (sortBy) {
    case "duration":
      return list.sort((a, b) => a.duration - b.duration); // Duration ascending
    case "calories":
      return list.sort((a, b) => a.caloriesBurned - b.caloriesBurned); // Calories ascending
    case "rating":
      return list.sort((a, b) => b.rating - a.rating); // Rating descending
    default:
      return list;
  }
}
