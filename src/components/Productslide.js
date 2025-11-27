"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // FULL FEATURE LIST
  const FEATURE_TEXT = [
    "RAW A2 BUFFALO MILK",
    "CHILLED AT 4°C",
    "NO ADULTERATION",
    "NO PRESERVATIVES",
    "NO HORMONES",
    "HIGH FAT 7.5%",
    "GRASS-FED BUFFALOES",
    "LAB TESTED DAILY",
    "FARM TO HOME FRESH",
    "100% PURE MILK",
  ];

  const items = [
    {
      id: 1,
      title: "A2 Buffalo Milk - 1 Litre",
      price: 88,
      mrp: 105,
      image: "/Milk.png",
      tag: "Fresh Daily",
      bg: "bg-gradient-to-b from-blue-50 to-blue-100",
      features: FEATURE_TEXT,
    },
    {
      id: 2,
      title: "Farm Fresh Eggs (6 pcs)",
      price: 60,
      mrp: 75,
      image: "/eggs.png",
      tag: "Organic",
      bg: "bg-gradient-to-b from-orange-50 to-orange-100",
      features: ["FARM FRESH", "ORGANIC EGGS", "NO CHEMICAL FEED", "DAILY COLLECTED"],
    },
    {
      id: 3,
      title: "A2 Buffalo Milk - 500ml",
      price: 45,
      mrp: 55,
      image: "/half.png",
      tag: "Best Seller",
      bg: "bg-gradient-to-b from-blue-50 to-blue-100",
      features: FEATURE_TEXT,
    },
  ];

  let scrollTimeout;

  const handleScroll = () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      const container = scrollRef.current;
      const cards = Array.from(container.children);
      const center = container.scrollLeft + container.offsetWidth / 2;

      let closest = 0;
      let minDist = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = index;
        }
      });

      setActiveIndex(closest);
    }, 120);
  };

  return (
    <div className="w-full mt-6 px-3">
      <div className="mt-2">
        <span className="bg-yellow-200 text-yellow-700 text-[10px] px-2 py-1 rounded-full font-medium tracking-wide">
          Early Morning Delivery
        </span>

        <h2 className="text-[22px] font-bold text-gray-900 mt-1 leading-tight">
          Get your order by <span className="text-yellow-600">7 AM tomorrow</span>
        </h2>
      </div>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto mt-4 pb-3 no-scrollbar snap-x snap-mandatory px-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, index) => (
          <AnimatedCard
            key={item.id}
            item={item}
            active={activeIndex === index}
            features={item.features}
          />
        ))}
      </div>
    </div>
  );
}

/* --------------------------------------------------
   PREMIMUM ANIMATED CARD WITH TEXT WALL BACKGROUND
--------------------------------------------------- */
function AnimatedCard({ item, active, features }) {
  return (
    <motion.div
      animate={{ scale: active ? 1.05 : 1, opacity: active ? 1 : 0.95 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`relative min-w-[260px] snap-center rounded-3xl p-5 shadow-md overflow-hidden ${item.bg}`}
    >
      {/* 🔵 BACKGROUND FEATURE TEXT WALL */}
      <div
        className="absolute left-0 w-full pointer-events-none select-none flex flex-col items-center text-center px-3"
        style={{
          top: "5%",        // starts higher
          height: "60%",    // covers top area
          justifyContent: "flex-start",
        }}
      >
        {features.slice(0, 8).map((t, i) => (
          <p
            key={i}
            className="text-[14px] font-extrabold uppercase tracking-wide opacity-[0.07] text-gray-900 leading-5"
          >
            {t}
          </p>
        ))}
      </div>

      {/* IMAGE */}
      <div className="w-full h-40 rounded-2xl overflow-hidden flex justify-center items-center relative z-20">
        <Image
          src={item.image}
          alt={item.title}
          width={300}
          height={300}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* TAG */}
      <span className="text-[12px] mt-3 inline-block bg-white/80 px-3 py-1 rounded-full shadow relative z-20">
        {item.tag}
      </span>

      {/* PRICE */}
      <div className="mt-3 flex items-center gap-3 relative z-20">
        <p className="text-[18px] font-bold text-gray-900">₹{item.price}</p>
        <p className="text-[13px] text-gray-500 line-through">₹{item.mrp}</p>
        <p className="text-[13px] text-green-600 font-semibold">
          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
        </p>
      </div>

      {/* TITLE */}
      <p className="text-[14px] text-gray-700 mt-1 font-medium relative z-20">
        {item.title}
      </p>

      {/* BUTTON */}
      <button className="mt-5 w-full py-2.5 rounded-xl bg-yellow-400 text-gray-900 text-[14px] font-bold shadow hover:bg-yellow-300 active:scale-95 transition relative z-20">
        Buy Now
      </button>
    </motion.div>
  );
}
