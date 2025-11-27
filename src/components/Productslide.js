"use client";

import React from "react";
import Image from "next/image";

export default function FeaturedProducts() {
  const items = [
    {
      id: 1,
      title: "A2 Buffalo Milk - 500ml",
      price: 45,
      mrp: 55,
      image: "/half.png",
      tag: "Best Seller",
      bg: "bg-gradient-to-b from-blue-50 to-blue-100",
    },
    {
      id: 2,
      title: "A2 Buffalo Milk - 1 Litre",
      price: 88,
      mrp: 105,
      image: "/Milk.png",
      tag: "Fresh Daily",
      bg: "bg-gradient-to-b from-blue-50 to-blue-100",
    },
    {
      id: 3,
      title: "Farm Fresh Eggs (6 pcs)",
      price: 60,
      mrp: 75,
      image: "/eggs.png",
      tag: "Organic",
      bg: "bg-gradient-to-b from-orange-50 to-orange-100",
    },
  ];

  const handleBuy = (item) => {
    alert(`Buying: ${item.title}`);
  };

  return (
    <div className="w-full mt-6 px-3">
      <h2 className="text-[18px] font-semibold text-gray-900">
        Order now and receive it by tomorrow morning 7 AM!
      </h2>

      <div className="flex gap-5 overflow-x-auto mt-4 pb-3 no-scrollbar">
        {items.map((item) => {
          const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

          return (
            <div
              key={item.id}
              className={`min-w-[260px] w-[260px] rounded-3xl p-5 shadow-md ${item.bg}`}
            >
              {/* Image */}
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

              {/* Tag */}
              <span className="text-[12px] mt-3 inline-block bg-white/80 px-3 py-1 rounded-full shadow">
                {item.tag}
              </span>

              {/* Price Section */}
              <div className="mt-3">
                <div className="flex items-center gap-3">
                  <p className="text-[18px] font-bold text-gray-900">₹{item.price}</p>

                  <p className="text-[13px] text-gray-500 line-through">₹{item.mrp}</p>

                  <p className="text-[13px] text-green-600 font-semibold">
                    {discount}% OFF
                  </p>
                </div>
              </div>

              {/* Title */}
              <p className="text-[14px] text-gray-700 leading-tight mt-1 font-medium">
                {item.title}
              </p>

              {/* Buy Now button */}
              <button
                onClick={() => handleBuy(item)}
                className="mt-5 w-full py-2.5 rounded-xl bg-yellow-400 text-gray-900 text-[14px] font-bold shadow hover:bg-yellow-300 active:scale-95 transition"
              >
                Buy Now
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
