import React from 'react';
import Image from 'next/image';

function Glogin() {
  return (
    <div className="w-full flex flex-col justify-center items-center px-5" style={{ minHeight: "calc(100vh - 64px - 64px)", marginTop: "76px" }}>
      {/* Logo image */}
      <div className="mb-6">
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
      </div>
      {/* Message */}
      <div className="mb-10 text-lg text-center text-gray-500 ">
        You are not logged in.<br />Please login to continue.
      </div>
      {/* Login Button */}
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

export default Glogin;
