"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { FiUser, FiPhone, FiMapPin, FiLogOut, FiHelpCircle, FiCalendar } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

function Account() {
  const router = useRouter();

  // ✅ These will later come from Redis API
  const [user, setUser] = useState({
    name: "Guest User",
    phone: "XXXXXXXXXX",
    address: "Not added",
    wallet: 0,
  });

  // ✅ Later replace this with actual API call to Redis
  useEffect(() => {
    setUser({
      name: "Vishnu",
      phone: "9866531011",
      address: "Manikonda, Hyderabad",
      wallet: 120,
    });
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "#f6f7fa",
        paddingBottom: "90px",
      }}
    >
      {/* ✅ FIXED HEADER */}
      <Nav />

      {/* ✅ MAIN CONTENT */}
      <div className="max-w-[480px] mx-auto px-4 pt-[110px] space-y-5">

        {/* ✅ PROFILE CARD */}
        <div className="bg-white rounded-2xl p-5 shadow-sm flex gap-4 items-center">
          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xl">
            {user.name.charAt(0)}
          </div>

          <div>
            <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              <FiPhone size={14} /> {user.phone}
            </p>
          </div>
        </div>

        {/* ✅ WALLET */}
        <div
          onClick={() => router.push("/Gwallet")}
          className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <LuWallet size={22} className="text-yellow-500" />
            <p className="font-medium text-gray-800">Wallet</p>
          </div>
          <p className="font-semibold text-gray-900">₹ {user.wallet}</p>
        </div>

        {/* ✅ SUBSCRIPTION */}
        <div
          onClick={() => router.push("/Gsubscription")}
          className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <FiCalendar size={22} className="text-yellow-500" />
            <p className="font-medium text-gray-800">My Subscription</p>
          </div>
          <span className="text-gray-400">›</span>
        </div>

        {/* ✅ ADDRESS */}
        <div className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3">
          <FiMapPin size={22} className="text-yellow-500" />
          <div>
            <p className="font-medium text-gray-800">Delivery Address</p>
            <p className="text-sm text-gray-500">{user.address}</p>
          </div>
        </div>

        {/* ✅ QUICK LINKS (NO BORDERS NOW) */}
        <div className="space-y-3">

          <div
            onClick={() => router.push("/orders")}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <p className="font-medium text-gray-800">My Orders</p>
            <span className="text-gray-400">›</span>
          </div>

          <div
            onClick={() => router.push("/privacy")}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <p className="font-medium text-gray-800">Privacy Policy</p>
            <span className="text-gray-400">›</span>
          </div>

          <div
            onClick={() => router.push("/terms")}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <p className="font-medium text-gray-800">Terms & Conditions</p>
            <span className="text-gray-400">›</span>
          </div>

          <div
            onClick={() => router.push("/faq")}
            className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <FiHelpCircle />
              <p className="font-medium text-gray-800">FAQs</p>
            </div>
            <span className="text-gray-400">›</span>
          </div>

        </div>

        {/* ✅ LOGOUT */}
      <div
  onClick={() => {
    localStorage.clear();          // ✅ removes userToken or any auth data
    router.push("/login");         // ✅ redirect to login
  }}
  className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-3 cursor-pointer text-red-600"
>
          <FiLogOut size={22} />
          <p className="font-semibold">Logout</p>
        </div>

      </div>

      {/* ✅ FIXED FOOTER */}
      <Footer />
    </div>
  );
}

export default Account;
