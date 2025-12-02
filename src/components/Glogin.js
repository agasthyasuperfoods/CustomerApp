import React from 'react';
import Image from 'next/image';

function Glogin() {
  return (
    <div
      className="fixed inset-0 flex flex-col justify-center items-center px-5"
      style={{
        top: '64px',        // navbar height
        bottom: '64px',     // footer height
        left: 0,
        right: 0,
        zIndex: 30,
      }}
    >
      {/* Image wrapper to maintain aspect ratio safely */}
      <div className="relative w-40 h-40"> 
    <div className="relative w-40 h-40">
  <Image
    src="/Logo.png"
    alt="App Logo"
    fill
    sizes="(max-width: 768px) 120px, 160px"
    className="object-contain"
    priority
  />
</div>

      </div>

      <div className="mb-10 mt-6 text-lg text-center text-gray-700 font-medium">
        You are not logged in.<br />Please login to continue.
      </div>

      <button
        type="button"
        className="w-full max-w-xs bg-[#FFD600] text-black rounded-2xl font-bold text-[22px] py-3 px-4 shadow-none transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ minWidth: 220 }}
      >
        Login
      </button>
    </div>
  );
}

export default Glogin;
