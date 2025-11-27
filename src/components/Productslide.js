"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturedProducts() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const items = [
    {
      id: 1,
      title: "A2 Buffalo Milk - 1 Litre",
      price: 88,
      mrp: 105,
      image: "/Milk.png",
      tag: "Fresh Daily",
      bg: "bg-gradient-to-b from-blue-50 to-blue-100",
    },
    {
      id: 2,
      title: "Farm Fresh Eggs (6 pcs)",
      price: 60,
      mrp: 75,
      image: "/eggs.png",
      tag: "Organic",
      bg: "bg-gradient-to-b from-orange-50 to-orange-100",
    },
    {
      id: 3,
      title: "A2 Buffalo Milk - 500ml",
      price: 45,
      mrp: 55,
      image: "/half.png",
      tag: "Best Seller",
      bg: "bg-gradient-to-b from-blue-50 to-blue-100",
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
    Get your order by{" "}
    <span className="text-yellow-600">7 AM tomorrow</span>
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
          />
        ))}
      </div>
    </div>
  );
}

function AnimatedCard({ item, active }) {
  return (
    <motion.div
      animate={{
        scale: active ? 1.05 : 1,
        opacity: active ? 1 : 0.95,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
      className={`min-w-[260px] snap-center rounded-3xl p-5 shadow-md ${item.bg}`}
    >
      <div className="w-full h-40 rounded-2xl overflow-hidden flex justify-center items-center">
        <Image
          src={item.image}
          alt={item.title}
          width={300}
          height={300}
          className="object-contain w-full h-full"
          priority
        />
      </div>

      <span className="text-[12px] mt-3 inline-block bg-white/80 px-3 py-1 rounded-full shadow">
        {item.tag}
      </span>

      <div className="mt-3 flex items-center gap-3">
        <p className="text-[18px] font-bold text-gray-900">₹{item.price}</p>
        <p className="text-[13px] text-gray-500 line-through">₹{item.mrp}</p>
        <p className="text-[13px] text-green-600 font-semibold">
          {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
        </p>
      </div>

      <p className="text-[14px] text-gray-700 mt-1 font-medium">
        {item.title}
      </p>

      <button className="mt-5 w-full py-2.5 rounded-xl bg-yellow-400 text-gray-900 text-[14px] font-bold shadow hover:bg-yellow-300 active:scale-95 transition">
        Buy Now
      </button>
    </motion.div>
  );
}
