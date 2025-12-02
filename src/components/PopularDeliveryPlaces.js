"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const PLACES = [
  { name: "Manikonda", img: "/manikonda.jpg" },
  { name: "Narsingi", img: "/narsingi.jpg" },
  { name: "Chitrapuri", img: "/chitrapuri.jpg" },
  { name: "Jubilee Hills", img: "/Jubilee_hills.jpg" },
  { name: "OU Colony", img: "/ou.jpg" },
];

export default function PopularDeliveryPlaces() {
  const scrollContainerRef = useRef(null);

  const [loadedImages, setLoadedImages] = useState({});

  // NEW sizes
  const IMG = 90;        // increased from 62 → 90
  const CARD = 110;      // min-width for card
  const GAP = 16;        // bigger spacing

  // Scroll exactly 1 new sized item
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: CARD + GAP,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="
        mt-5 mb-5 mx-2
        rounded-2xl bg-white shadow-lg 
        p-4 flex flex-col gap-3
      "
      style={{ boxShadow: "0 4px 12px rgba(55,70,101,.08)" }}
    >
      <div className="flex items-center justify-between px-1">
        <span className="text-lg font-bold text-gray-900">We Deliver Here</span>

        <button
          className="text-amber-600 p-1 rounded-full transition duration-150"
          onClick={scrollRight}
        >
          <ChevronRight size={22} strokeWidth={2.5} />
        </button>
      </div>

      {/* Scroll row */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto no-scrollbar pt-1 pb-2"
      >
        {PLACES.map((p, index) => (
          <div
            key={p.name}
            className="flex flex-col items-center"
            style={{ minWidth: CARD }}
          >
            {/* Image container */}
            <div
              className="overflow-hidden shadow-sm bg-slate-100 relative"
              style={{
                width: IMG,
                height: IMG,
                borderRadius: "22px",
              }}
            >
              {/* Skeleton */}
              {!loadedImages[index] && (
                <Skeleton
                  variant="rounded"
                  width={IMG}
                  height={IMG}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "22px",
                  }}
                />
              )}

              <Image
                src={p.img}
                alt={p.name}
                width={IMG}
                height={IMG}
           
                className="object-cover rounded-[22px]"
              />
            </div>

            {/* Text skeleton */}
            {!loadedImages[index] ? (
              <Skeleton
                variant="text"
                width={70}
                height={22}
                sx={{ mt: 1 }}
              />
            ) : (
              <span className="mt-2 text-sm font-semibold text-gray-800 text-center">
                {p.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
