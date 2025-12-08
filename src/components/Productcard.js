"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MilkBanner() {
  const router = useRouter();

  return (
    <div className="w-full py-4 overflow-x-hidden">
      <div
        className="relative w-full rounded-2xl p-5 overflow-hidden shadow-md"
        style={{ backgroundColor: "#F9D66A" }}
      >
        {/* Decorative Splashes */}
        <div className="absolute left-0 top-0 w-24 h-24 bg-white/40 rounded-br-[80%]"></div>
        <div className="absolute bottom-0 right-0 w-28 h-20 bg-white/30 rounded-tl-[90%]"></div>

        {/* HEADING */}
        <h1 className="text-[26px] font-extrabold text-gray-900 relative z-10 leading-tight">
          A2 Buffalo Milk
        </h1>

        {/* SUBTITLE */}
        <p className="text-gray-800 font-semibold text-sm relative z-10 mt-2">
          100% Raw · Natural · Pure
        </p>

        {/* ✅ GRID LAYOUT FIX (ANDROID SAFE) */}
        <div className="grid grid-cols-2 gap-3 items-start relative z-10 mt-4">

          {/* ✅ BULLETS */}
          <div className="flex flex-col gap-2 text-sm text-gray-900 font-medium leading-snug">
            {[
              "Raw Buffalo Milk",
              "No Preservatives",
              "No Adulteration",
              "Farm-Fresh Daily",
            ].map((item, i) => (
              <p key={i} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full flex-shrink-0"></span>
                <span className="break-words">{item}</span>
              </p>
            ))}
          </div>

          {/* ✅ PRODUCT IMAGE BLOCK */}
          <div className="relative w-full h-[170px] sm:h-[200px]">

            {/* DOODLE LINE */}
            <svg
              className="absolute -top-3 -left-4 w-10 h-10 text-[#c47b0a] opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 10 Q20 -2 38 10" />
            </svg>

            <svg
              className="absolute top-2 -right-2 w-6 h-6 text-[#c47b0a] opacity-80"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2 L12 22 M2 12 L22 12" />
            </svg>

            {/* ✅ MILK IMAGE */}
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

      {/* ✅ FULL WIDTH BUTTON – ANDROID SAFE */}
      <button
        onClick={() => router.push("/Gsubscription")}
        className="mt-4 w-full bg-yellow-400 text-white font-semibold px-5 py-3 rounded-xl shadow-md active:scale-[0.98] transition"
      >
        Subscribe Now
      </button>
    </div>
  );
}
