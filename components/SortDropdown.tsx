"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { SortOption } from "@/lib/types";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const sortOptions: { key: SortOption; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "calories", label: "Calories" },
  { key: "rating", label: "Rating" },
];

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find((opt) => opt.key === value) || sortOptions[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-3 relative" ref={dropdownRef}>
      <span className="text-xs font-semibold text-gray-400">Sort By</span>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#111319] border border-[#262936] hover:border-[#383d50] text-white text-xs font-semibold rounded-lg px-4 py-2 flex items-center justify-between gap-4 min-w-[120px] transition-colors cursor-pointer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption.label}</span>
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-40 bg-[#111319] border border-[#262936] rounded-xl p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100"
          role="listbox"
        >
          {sortOptions.map((opt) => {
            const isSelected = opt.key === value;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  onChange(opt.key);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? "text-white bg-[#1b1e28]"
                    : "text-gray-300 hover:text-white hover:bg-[#181b24]"
                }`}
                role="option"
                aria-selected={isSelected}
              >
                <div className="w-4 flex items-center justify-center shrink-0">
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
