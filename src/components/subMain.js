"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LuMilk } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

const plansData = [
  {
    id: 1,
    name: "The Starter",
    price: 1499,
    description:
      "Perfect for individuals or couples trying out our daily fresh milk service.",
    features: ["0.5 Liters Per Day", "Daily Morning Delivery", "Pause Anytime"],
    perfectFor: "A simple way to start your day with fresh milk.",
  },
  {
    id: 2,
    name: "The Daily Ritual",
    price: 2899,
    description:
      "Our standard plan for small families who need a reliable daily supply.",
    features: ["1 Liter Per Day", "Daily Morning Delivery", "Pause Anytime"],
    perfectFor: "Perfect for families that rely on milk daily.",
    popular: true,
  },
  {
    id: 3,
    name: "The Family Fix",
    price: 4199,
    description:
      "Ideal quantity for growing families. Most popular choice.",
    features: ["1.5 Liters Per Day", "Daily Morning Delivery", "Priority Support"],
    perfectFor: "For households that use plenty of milk daily.",
  },
];

export default function Subscriptionmain() {
  const defaultPlan = plansData.find((p) => p.popular) || plansData[0];
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan);
const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7] relative pb-32">

      {/* TOP NAV */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-4 flex items-center">
<button
  onClick={() => router.push("/Home")}
  className="flex items-center gap-1 text-gray-800 text-[17px]"
>
          <IoChevronBack className="w-5 h-5" />
         
        </button>
      </div>

      {/* TITLE */}
      <h2 className="text-3xl font-extrabold text-center mt-8 text-slate-900 tracking-tight">
        Choose a Plan
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        Monthly or yearly? It&apos;s your call.
      </p>

      {/* PLAN LIST */}
      <div className="max-w-xl mx-auto px-4 space-y-6">
        {plansData.map((plan) => {
          const isSelected = selectedPlan.id === plan.id;

          return (
            <motion.div
              key={plan.id}
              onClick={() => setSelectedPlan(plan)}
              layout
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`
                p-6 rounded-3xl border cursor-pointer transition-all
                ${isSelected ? "bg-[#FFF4DF] border-[#E7C88C] shadow" : "bg-white border-gray-200 shadow-sm"}
              `}
            >
              {/* HEADER */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[20px] font-semibold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 text-[14px] mt-1 leading-snug">
                    {plan.description}
                  </p>
                </div>

                {/* ❤️ HEART ICON */}
{/* HEART ICON */}
<div className="mt-1">
  {isSelected ? (
    <LuMilk className="text-[#DAA643] w-6 h-6" />
  ) : (
    <LuMilk className="text-gray-400 w-6 h-6" />
  )}
</div>


              </div>

              {/* PRICE */}
              <div className="mt-4">
                <span className="text-[34px] font-bold text-gray-900 leading-none">
                  ₹{plan.price}
                </span>
                <span className="text-gray-500 ml-1 text-[14px]">/month</span>
              </div>

              {/* MOST POPULAR */}
              {plan.popular && (
                <div className="mt-3 inline-block bg-[#DAA643] text-white text-[11px] font-semibold px-3 py-[6px] rounded-full tracking-wide">
                  MOST POPULAR
                </div>
              )}

              {/* EXPANDED SECTION */}
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: isSelected ? "220px" : "0px" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isSelected ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4"
                >
                  <h4 className="font-semibold text-[16px] text-gray-900 mb-3">
                    This plan includes:
                  </h4>

                  <ul className="space-y-2 text-gray-700">
                    {plan.features.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-[15px]">
                        <span className="w-[8px] h-[8px] bg-[#DAA643] rounded-full"></span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 border border-gray-200 rounded-xl p-4 bg-white text-gray-700 text-[14px] leading-snug shadow-sm">
                    {plan.perfectFor}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER BUTTON */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-4 px-5 shadow-lg">
      <button
  onClick={() => router.push("/loginonly")}
  className="w-full bg-yellow-400 text-white font-semibold py-4 rounded-2xl text-lg shadow-md active:scale-95 transition"
>
  Continue
</button>

      </div>
    </div>
  );
}
