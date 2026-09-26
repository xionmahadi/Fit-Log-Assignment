export interface RawWorkout {
  id: number;
  name: string;
  image?: string;
  muscleGroups?: string[];
  equipment?: string;
  difficulty?: string;
  duration?: number;
  caloriesBurned?: number;
  sets?: number;
  reps?: string;
  rating?: number;
  description?: string;
  instructions?: string[];
}

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type SortOption = "duration" | "calories" | "rating";

export interface FitLogState {
  plan: Workout[];
  saved: Workout[];
  completed: number[]; // Store array of completed workout IDs
}

export type FitLogAction =
  | { type: "SET_STATE"; payload: FitLogState }
  | { type: "ADD_TO_PLAN"; payload: Workout }
  | { type: "REMOVE_FROM_PLAN"; payload: number }
  | { type: "SAVE_WORKOUT"; payload: Workout }
  | { type: "REMOVE_FROM_SAVED"; payload: number }
  | { type: "TOGGLE_COMPLETE"; payload: number };
