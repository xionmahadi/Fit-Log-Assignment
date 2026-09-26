"use client";

import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { toast } from "sonner";
import { FitLogState, FitLogAction, Workout } from "./types";

const STORAGE_KEY = "fitlog-state-v1";

const initialState: FitLogState = {
  plan: [],
  saved: [],
  completed: [],
};

function fitLogReducer(state: FitLogState, action: FitLogAction): FitLogState {
  switch (action.type) {
    case "SET_STATE":
      return action.payload;

    case "ADD_TO_PLAN": {
      if (state.plan.some((w) => w.id === action.payload.id)) {
        return state;
      }
      if (state.plan.length >= 5) {
        return state;
      }
      return {
        ...state,
        plan: [...state.plan, action.payload],
      };
    }

    case "REMOVE_FROM_PLAN":
      return {
        ...state,
        plan: state.plan.filter((w) => w.id !== action.payload),
        completed: state.completed.filter((id) => id !== action.payload),
      };

    case "SAVE_WORKOUT": {
      if (state.saved.some((w) => w.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        saved: [...state.saved, action.payload],
      };
    }

    case "REMOVE_FROM_SAVED":
      return {
        ...state,
        saved: state.saved.filter((w) => w.id !== action.payload),
      };

    case "TOGGLE_COMPLETE": {
      const exists = state.completed.includes(action.payload);
      return {
        ...state,
        completed: exists
          ? state.completed.filter((id) => id !== action.payload)
          : [...state.completed, action.payload],
      };
    }

    default:
      return state;
  }
}

interface FitLogContextType {
  state: FitLogState;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;
  toggleComplete: (workoutId: number) => void;
  isInPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
  isCompleted: (workoutId: number) => boolean;
  isPlanFull: boolean;
  planCount: number;
  savedCount: number;
  isInitialized: boolean;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fitLogReducer, initialState);
  const [isInitialized, setIsInitialized] = useState(false);

  // Read state from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (
          parsed &&
          Array.isArray(parsed.plan) &&
          Array.isArray(parsed.saved) &&
          Array.isArray(parsed.completed)
        ) {
          dispatch({ type: "SET_STATE", payload: parsed });
        }
      }
    } catch (e) {
      console.error("Failed to load fitlog state from localStorage:", e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save state to localStorage whenever it changes after initialization
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        console.error("Failed to save fitlog state to localStorage:", e);
      }
    }
  }, [state, isInitialized]);

  const isInPlan = (workoutId: number) => state.plan.some((w) => w.id === workoutId);
  const isSaved = (workoutId: number) => state.saved.some((w) => w.id === workoutId);
  const isCompleted = (workoutId: number) => state.completed.includes(workoutId);
  const isPlanFull = state.plan.length >= 5;

  const addToPlan = (workout: Workout): boolean => {
    if (isInPlan(workout.id)) {
      toast.warning("Already in your plan", {
        description: `${workout.name} is already added to your plan.`,
      });
      return false;
    }

    if (isPlanFull) {
      toast.error("Today's Plan limit reached!", {
        description: "You have capped out at 5 workouts. Remove one to add more.",
      });
      return false;
    }

    dispatch({ type: "ADD_TO_PLAN", payload: workout });
    toast.success("Added to today's plan", {
      description: `${workout.name} added to your workout list.`,
    });
    return true;
  };

  const removeFromPlan = (workoutId: number) => {
    const target = state.plan.find((w) => w.id === workoutId);
    dispatch({ type: "REMOVE_FROM_PLAN", payload: workoutId });
    toast.info("Removed from today's plan", {
      description: target ? `${target.name} removed.` : undefined,
    });
  };

  const saveWorkout = (workout: Workout): boolean => {
    if (isSaved(workout.id)) {
      toast.warning("Already in saved workouts", {
        description: `${workout.name} is already in your saved list.`,
      });
      return false;
    }

    dispatch({ type: "SAVE_WORKOUT", payload: workout });
    toast.success("Saved for later", {
      description: `${workout.name} saved to your bookmarks.`,
    });
    return true;
  };

  const removeFromSaved = (workoutId: number) => {
    const target = state.saved.find((w) => w.id === workoutId);
    dispatch({ type: "REMOVE_FROM_SAVED", payload: workoutId });
    toast.info("Removed from saved", {
      description: target ? `${target.name} removed.` : undefined,
    });
  };

  const toggleComplete = (workoutId: number) => {
    const willComplete = !isCompleted(workoutId);
    dispatch({ type: "TOGGLE_COMPLETE", payload: workoutId });
    if (willComplete) {
      toast.success("Workout marked as done", {
        description: "Great work completing this set!",
      });
    } else {
      toast.info("Workout marked as pending");
    }
  };

  return (
    <FitLogContext.Provider
      value={{
        state,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeFromSaved,
        toggleComplete,
        isInPlan,
        isSaved,
        isCompleted,
        isPlanFull,
        planCount: state.plan.length,
        savedCount: state.saved.length,
        isInitialized,
      }}
    >
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return context;
}
