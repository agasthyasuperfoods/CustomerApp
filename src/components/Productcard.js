"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MilkBanner() {
  const router = useRouter();

  return (
    <div className="w-full px-4 py-4">
      <div
        className="relative w-full rounded-2xl p-6 overflow-hidden shadow-md"
        style={{ backgroundColor: "#F9D66A" }}
      >
        {/* Decorative Splashes */}
        <div className="absolute left-0 top-0 w-24 h-24 bg-white/40 rounded-br-[80%]"></div>
        <div className="absolute bottom-0 right-0 w-28 h-20 bg-white/30 rounded-tl-[90%]"></div>

        {/* HEADING */}
        <h1 className="text-3xl font-extrabold text-gray-900 relative z-10">
          A2 Buffalo Milk
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-800 font-semibold text-sm relative z-10 mt-2">
          100% Raw · Natural · Pure
        </p>

        {/* BULLETS + IMAGE SECTION */}
        <div className="flex items-start justify-between relative z-10 mt-3">

          {/* BULLETS */}
          <div className="flex flex-col gap-1 text-sm text-gray-900 font-medium min-w-[180px]">
            {["Raw Buffalo Milk", "No Preservatives", "No Adulteration", "Farm-Fresh Daily"].map(
              (item, i) => (
                <p key={i} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  {item}
                </p>
              )
            )}
          </div>

          {/* IMAGE + DOODLES */}
          <div className="relative w-[150px] h-[180px] sm:w-[200px] sm:h-[220px] flex-shrink-0 overflow-visible">

            {/* DOODLE 1 */}
            <svg
              className="absolute -top-4 -left-6 w-12 h-12 text-[#c47b0a] opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M2 10 Q20 -2 38 10" />
            </svg>

            {/* DOODLE 2 */}
            <svg
              className="absolute top-2 -right-3 w-7 h-7 text-[#c47b0a] opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2 L12 22 M2 12 L22 12" />
            </svg>

            {/* DOODLE 3 */}
            <svg
              className="absolute bottom-4 -left-5 w-10 h-10 text-[#c47b0a] opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 10 Q14 4 26 12" />
            </svg>

            {/* DOODLE 4 */}
            <svg
              className="absolute bottom-10 -right-4 w-10 h-10 text-[#c47b0a] opacity-90"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="6" />
            </svg>

            {/* DOODLE 5 */}
            <svg
              className="absolute top-10 -right-10 w-12 h-12 text-[#c47b0a] opacity-80"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="2" />
              <circle cx="12" cy="6" r="2" />
              <circle cx="8" cy="12" r="2" />
              <circle cx="16" cy="14" r="2" />
            </svg>

            {/* STATIC IMAGE */}
            <Image
              src="/Milk.png"
              alt="A2 Buffalo Milk"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
        </div>
      </div>

      {/* FULL WIDTH BUTTON */}
      <button
        onClick={() => router.push("/Gsubscription")}
        className="mt-4 w-full bg-yellow-400 text-white font-semibold px-5 py-3 rounded-xl shadow-md transition"
      >
        Subscribe Now
      </button>
    </div>
  );
}
