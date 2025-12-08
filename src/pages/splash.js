"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Splash() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    // ✅ Start zoom animation
    const timer1 = setTimeout(() => setZoom(true), 700);

    // ✅ After animation → Redirect based on Face ID localStorage login
    const timer2 = setTimeout(() => {
      setShowSplash(false);

      const isLoggedIn =
        typeof window !== "undefined" &&
        localStorage.getItem("agasthyaUser"); // ✅ your real key

      if (isLoggedIn) {
        router.replace("/Home");       // ✅ Auto login
      } else {
        router.replace("/login");      // ✅ Face ID login screen
        // OR → router.replace("/Guesthome");
      }
    }, 1500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  if (!showSplash) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-500 ${
        zoom ? "opacity-0" : "opacity-100"
      }`}
      style={{ overflow: "hidden" }}
    >
      {/* ✅ Animated Logo */}
      <div
        className={`transition-transform duration-900 ease-[cubic-bezier(.4,2,.6,1)] ${
          zoom ? "scale-[8] opacity-80" : "scale-100 opacity-100"
        }`}
        style={{
          willChange: "transform,opacity",
          width: 160,
          height: 110,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src="/logo.jpeg"
          alt="Agasthya Logo"
          width={160}
          height={110}
          priority
          style={{ height: "auto", width: "100%" }}
        />
      </div>
    </div>
  );
}
