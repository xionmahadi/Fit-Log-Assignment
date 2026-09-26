import { RawWorkout, Workout } from "./types";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export const DEFAULT_WORKOUT_IMAGE = "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop";

export function normalizeWorkout(raw: Partial<RawWorkout> & { id: number | string }): Workout {
  const id = typeof raw.id === "string" ? parseInt(raw.id, 10) : raw.id;
  
  return {
    id: isNaN(id) ? 0 : id,
    name: raw.name || "Unnamed Workout",
    image: raw.image && raw.image.trim() !== "" ? raw.image : DEFAULT_WORKOUT_IMAGE,
    muscleGroups: Array.isArray(raw.muscleGroups) ? raw.muscleGroups : [],
    equipment: raw.equipment || "None",
    difficulty: raw.difficulty || "General",
    duration: typeof raw.duration === "number" ? raw.duration : 0,
    caloriesBurned: typeof raw.caloriesBurned === "number" ? raw.caloriesBurned : 0,
    sets: typeof raw.sets === "number" ? raw.sets : 3,
    reps: raw.reps || "8-12",
    rating: typeof raw.rating === "number" ? raw.rating : 4.5,
    description: raw.description || "No description provided for this workout.",
    instructions: Array.isArray(raw.instructions) && raw.instructions.length > 0
      ? raw.instructions
      : ["Perform the exercise with proper form and control."],
  };
}

export async function fetchWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_BASE, {
      cache: "no-store", // Ensure fresh data or standard fetch
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.statusText}`);
    }
    const data: RawWorkout[] = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid API response format");
    }
    return data.map(normalizeWorkout);
  } catch (error) {
    console.error("Error in fetchWorkouts:", error);
    throw error;
  }
}

export async function fetchWorkoutById(id: number | string): Promise<Workout | null> {
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      cache: "no-store",
    });
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Failed to fetch workout ${id}: ${res.statusText}`);
    }
    const data: RawWorkout = await res.json();
    if (!data || typeof data.id === "undefined") {
      return null;
    }
    return normalizeWorkout(data);
  } catch (error) {
    console.error(`Error in fetchWorkoutById(${id}):`, error);
    return null;
  }
}
