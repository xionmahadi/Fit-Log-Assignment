"use client";

import { Dumbbell, Bookmark } from "lucide-react";

interface PlanTabsProps {
  activeTab: "plan" | "saved";
  onTabChange: (tab: "plan" | "saved") => void;
  planCount: number;
  savedCount: number;
}

export function PlanTabs({
  activeTab,
  onTabChange,
  planCount,
  savedCount,
}: PlanTabsProps) {
  return (
    <div className="flex border-b border-fit-border">
      <button
        onClick={() => onTabChange("plan")}
        className={`flex items-center gap-2.5 px-6 py-3.5 font-display font-bold text-sm tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
          activeTab === "plan"
            ? "border-fit-lime text-fit-lime bg-fit-lime/5"
            : "border-transparent text-fit-muted hover:text-white hover:bg-fit-surface/40"
        }`}
      >
        <Dumbbell className="w-4 h-4" />
        <span>Today&apos;s Plan</span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
            activeTab === "plan"
              ? "bg-fit-lime text-black"
              : "bg-fit-surface text-fit-muted"
          }`}
        >
          {planCount}
        </span>
      </button>

      <button
        onClick={() => onTabChange("saved")}
        className={`flex items-center gap-2.5 px-6 py-3.5 font-display font-bold text-sm tracking-wider uppercase border-b-2 transition-all cursor-pointer ${
          activeTab === "saved"
            ? "border-fit-lime text-fit-lime bg-fit-lime/5"
            : "border-transparent text-fit-muted hover:text-white hover:bg-fit-surface/40"
        }`}
      >
        <Bookmark className="w-4 h-4" />
        <span>Saved</span>
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${
            activeTab === "saved"
              ? "bg-fit-lime text-black"
              : "bg-fit-surface text-fit-muted"
          }`}
        >
          {savedCount}
        </span>
      </button>
    </div>
  );
}
