"use client";

import React from "react";

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
      image: "/milk.png",
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
    <div className="w-full mt-5 px-3">
      <h2 className="text-[17px] font-semibold text-gray-900">
        Featured on Agasthya
      </h2>

      <div className="flex gap-3 overflow-x-auto mt-3 pb-2 no-scrollbar">
        {items.map((item) => {
          const discount = Math.round(((item.mrp - item.price) / item.mrp) * 100);

          return (
            <div
              key={item.id}
              className={`min-w-[165px] w-[165px] rounded-3xl p-3 shadow-sm ${item.bg}`}
            >
              {/* Image */}
              <div className="w-full h-24 rounded-xl overflow-hidden flex justify-center items-center">
                <img
                  src={item.image}
                  className="w-full h-full object-contain"
                  alt={item.title}
                />
              </div>

              {/* Tag */}
              <span className="text-[10px] mt-2 inline-block bg-white/90 px-2 py-1 rounded-full shadow-sm">
                {item.tag}
              </span>

              {/* Price Section */}
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-bold text-gray-900">
                    ₹{item.price}
                  </p>

                  <p className="text-[11px] text-gray-500 line-through">
                    ₹{item.mrp}
                  </p>

                  <p className="text-[11px] text-green-600 font-semibold">
                    {discount}% OFF
                  </p>
                </div>
              </div>

              {/* Title */}
              <p className="text-[12px] text-gray-600 leading-tight mt-1">
                {item.title}
              </p>

              {/* Buy Now button */}
              <button
                onClick={() => handleBuy(item)}
                className="mt-3 w-full py-1.5 rounded-xl bg-yellow-400 text-gray-900 text-[12px] font-bold shadow hover:bg-yellow-300 active:scale-95 transition"
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
