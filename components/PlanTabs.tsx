"use client";

import { SortDropdown } from "./SortDropdown";
import { SortOption } from "@/lib/types";

interface PlanTabsProps {
  activeTab: "plan" | "saved";
  onTabChange: (tab: "plan" | "saved") => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function PlanTabs({
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
}: PlanTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Pill Tabs Container */}
      <div className="bg-[#15171e] p-1 rounded-xl border border-[#222530] inline-flex items-center self-start">
        <button
          onClick={() => onTabChange("plan")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "plan"
              ? "bg-[#242733] text-white shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Today&apos;s Plan
        </button>

        <button
          onClick={() => onTabChange("saved")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "saved"
              ? "bg-[#242733] text-white shadow-sm"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Saved
        </button>
      </div>

      {/* Sort Dropdown */}
      <SortDropdown value={sortBy} onChange={onSortChange} />
    </div>
  );
}
