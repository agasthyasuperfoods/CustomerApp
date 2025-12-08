"use client";

import React, { useEffect, useRef, useMemo } from "react";

/* ✅ BRAND COLORS */
const ACCENT = "#FBBF24";

const STATUS_COLORS = {
  Delivered: "#4CAF50",
  Upcoming: "#4F7DF3",
  Vacation: "#8B5CF6",
  "On Hold": "#EF4444",
};

/* ✅ GENERATE CURRENT WEEK CENTERED ON TODAY */
function generateWeek() {
  const today = new Date();
  const week = [];

  for (let i = -3; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    week.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
      isToday: i === 0,
    });
  }

  return week;
}

export default function SubscriptionCalendar() {
  const scrollRef = useRef(null);
  const dates = useMemo(() => generateWeek(), []);

  /* ✅ AUTO CENTER TODAY */
  useEffect(() => {
    const todayEl = scrollRef.current?.querySelector(".today");
    if (todayEl) {
      const parent = scrollRef.current;
      const scrollLeft =
        todayEl.offsetLeft -
        parent.offsetWidth / 2 +
        todayEl.offsetWidth / 2;

      parent.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="w-full px-3 mt-3">

      {/* ✅ MAIN CARD */}
      <div className="bg-white rounded-2xl px-4 py-4">

        {/* ✅ TITLE */}
        <h2 className="text-center font-semibold text-gray-700 mb-4">
          No Active Subscription
        </h2>

        {/* ✅ CALENDAR SCROLLER */}
        <div
          ref={scrollRef}
          className="flex justify-between overflow-x-auto no-scrollbar px-2"
        >
          {dates.map((item, i) => (
            <div key={i} className="flex flex-col items-center min-w-[55px]">

              {/* ✅ DAY */}
              <span className="text-xs mb-2 font-medium text-gray-400">
                {item.day}
              </span>

              {/* ✅ DATE */}
              <div
                className={`w-11 h-11 flex items-center justify-center font-semibold text-sm ${
                  item.isToday ? "today rounded-full" : "rounded-full"
                }`}
                style={{
                  backgroundColor: item.isToday ? ACCENT : "#ffffff",
                  color: item.isToday ? "#000" : "#6B7280",
                }}
              >
                {item.date}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ LEGEND (2 ROWS LIKE IMAGE) */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-6 text-sm text-gray-700">

          <Legend color={STATUS_COLORS.Delivered} label="Delivered" />
          <Legend color={STATUS_COLORS.Upcoming} label="Upcoming" />
          <Legend color={STATUS_COLORS.Vacation} label="Vacation" />
          <Legend color={STATUS_COLORS["On Hold"]} label="On Hold" />

        </div>
      </div>

      {/* ✅ SCROLLBAR HIDE */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}

/* ✅ LEGEND PILL */
function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1">
      <span
        className="w-3 h-[12px] rounded-full"
        style={{ backgroundColor: color }}
      />
      {label}
    </div>
  );
}
    