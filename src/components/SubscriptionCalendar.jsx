"use client";

import React, { useEffect, useRef, useMemo } from "react";

/* ✅ BRAND ACCENT */
const ACCENT = "#FBBF24";

/* ✅ GENERATE SCROLLABLE MONTHS */
function generateScrollableMonths() {
  const today = new Date();
  const months = [];

  for (let m = -3; m <= 3; m++) {
    const date = new Date(today.getFullYear(), today.getMonth() + m, 1);
    const year = date.getFullYear();
    const month = date.getMonth();

    const end = new Date(year, month + 1, 0);
    const dates = [];

    for (let d = 1; d <= end.getDate(); d++) {
      const dateObj = new Date(year, month, d);
      dates.push({
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }),
        date: d,
        isToday:
          d === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear(),
      });
    }

    months.push({
      monthLabel: date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      dates,
    });
  }

  return months;
}

export default function SubscriptionCalendar() {
  const scrollRef = useRef(null);
  const months = useMemo(() => generateScrollableMonths(), []);

  /* ✅ AUTO CENTER TODAY */
  useEffect(() => {
    const todayEl = scrollRef.current?.querySelector(".today");
    if (todayEl) {
      const parent = scrollRef.current;
      const scrollLeft =
        todayEl.offsetLeft -
        parent.offsetWidth / 2 +
        todayEl.offsetWidth / 2;

      parent.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="w-full bg-[#f6f7fa] py-3">

      {/* ✅ TOP STATUS */}
      <div className="text-center text-sm font-semibold text-gray-600 mb-3">
        No Active Subscription
      </div>

      {/* ✅ SCROLLER */}
      <div
        ref={scrollRef}
        className="flex items-end gap-3 overflow-x-auto scroll-smooth px-4 no-scrollbar"
      >
        {months.map((month, mIndex) => (
          <div key={mIndex} className="flex items-end gap-3">

            {/* ✅ FIXED VERTICAL MONTH LABEL WITH BG */}
     {/* ✅ VERTICAL MONTH LABEL (FIXED HEIGHT) */}
<div className="flex items-center justify-center h-[52px] w-[20px]">
  <span
    className="text-[9px] font-semibold text-gray-600 whitespace-nowrap"
    style={{ transform: "rotate(-90deg)" }}
  >
    {month.monthLabel}
  </span>
</div>


            {/* ✅ DATES */}
            {month.dates.map((item, i) => (
              <div key={i} className="flex flex-col items-center min-w-[46px]">

                <span className="text-[11px] mb-1 font-medium text-gray-400">
                  {item.day}
                </span>

                {/* ✅ TODAY = RECTANGLE, OTHERS = WHITE */}
                <div
                  className={`w-10 h-9 flex items-center justify-center font-semibold text-sm ${
                    item.isToday ? "today" : ""
                  }`}
                  style={{
                    backgroundColor: item.isToday ? ACCENT : "#ffffff",
                    color: item.isToday ? "#000" : "#6b7280",
    borderRadius: "9999px", // ✅ FORCED PERFECT CIRCLE
                  }}
                >
                  {item.date}
                </div>

              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ✅ COLOR CODES */}
      <div className="flex flex-wrap justify-center gap-6 mt-4 text-xs text-gray-600">
        <Legend color="bg-green-500" label="Delivered" />
        <Legend color="bg-blue-400" label="Upcoming" />
  <Legend color="bg-purple-500" label="Vacation" />
        <Legend color="bg-red-500" label="On Hold" />
      </div>

      {/* ✅ HIDE SCROLLBAR */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

/* ✅ LEGEND */
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`w-5 h-[6px] rounded-full ${color}`} />
      {label}
    </div>
  );
}
