"use client";

import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div className="relative w-8 h-8 rounded bg-fit-lime/10 border border-fit-lime/30 flex items-center justify-center p-1 group-hover:border-fit-lime transition-colors">
        <Image
          src="/assets/logo.png"
          alt="FitLog Logo"
          width={28}
          height={28}
          className="object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
        <svg
          className="w-5 h-5 text-fit-lime hidden group-hover:scale-110 transition-transform"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 6.29 3.43 4.86 2 3.43 3.43 2 4.86 3.43 6.29 2 7.71 3.43 9.14 2 10.57 3.43 12 7 15.57 15.57 7 12 3.43 10.57 2 9.14z" />
        </svg>
      </div>
      <span className="font-display tracking-wider text-xl font-bold text-white group-hover:text-fit-lime transition-colors">
        FIT<span className="text-fit-lime">LOG</span>
      </span>
    </Link>
  );
}
