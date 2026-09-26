"use client";

import { ChevronDown, ArrowUpDown } from "lucide-react";
import { SortOption } from "@/lib/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-2 bg-fit-card border border-fit-border rounded-lg px-3.5 py-2 hover:border-fit-lime/50 transition-colors">
        <ArrowUpDown className="w-4 h-4 text-fit-lime" />
        <span className="text-xs font-mono font-semibold uppercase text-fit-muted">
          Sort By:
        </span>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as SortOption)}
            className="appearance-none bg-transparent text-white font-mono text-xs font-bold uppercase tracking-wider pr-6 focus:outline-none cursor-pointer"
            aria-label="Sort workouts"
          >
            <option value="duration" className="bg-fit-card text-white">
              Duration (Low to High)
            </option>
            <option value="calories" className="bg-fit-card text-white">
              Calories (Low to High)
            </option>
            <option value="rating" className="bg-fit-card text-white">
              Rating (High to Low)
            </option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-fit-lime absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
