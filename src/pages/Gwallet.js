import React from 'react';
import Image from 'next/image';
import Guestnav from '@/components/Guestnav';
import Gfooter from '@/components/Gfooter';

function Glogin() {
  return (
    // Centered fixed login area, with nav and footer height considered
    <div
      className="fixed inset-0 flex flex-col justify-center items-center px-5"
      style={{
        top: '64px',        // Height of your nav (adjust as needed)
        bottom: '64px',     // Height of your footer (adjust as needed)
        left: 0,
        right: 0,
        zIndex: 30
      }}
    >
      <Image
        src="/logo.png"
        alt="App Logo"
        width={160}
        height={160}
        style={{
          objectFit: "contain",
          background: "transparent",
          display: "block"
        }}
        priority
      />
      <div className="mb-10 mt-6 text-lg text-center text-gray-700 font-medium">
        You are not logged in.<br />Please login to continue.
      </div>
      <button
        type="button"
        className="w-full max-w-xs bg-[#FFD600] text-white rounded-2xl font-bold text-[22px] py-5 px-4 shadow-none transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ minWidth: 220 }}
      >
        Login
      </button>
    </div>
  );
}

function Gwallet() {
  return (
    <div>
      {/* Fixed header */}
      <Guestnav />
      {/* Fixed+centered content */}
      <Glogin />
      {/* Fixed footer */}
      <Gfooter />
    </div>
  );
}

export default Gwallet;
