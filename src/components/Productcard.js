import React from 'react';
import Image from 'next/image';
import { FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { LiaLeafSolid } from 'react-icons/lia';

const Productcard = () => {
  return (
    <div className="bg-gray-100 p-4 font-sans">
      {/* Main Card */}
      <div className="bg-stone-50 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-4xl mx-auto">
        
        {/* Left Side Content (Visually appears second on mobile) */}
        <div className="flex flex-col space-y-4 items-start w-full order-2 md:order-1">
          <p className="text-sm text-gray-500 font-medium">Farm to Door • Same-morning</p>
          <h1 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Fresh Milk Delivered
          </h1>
          <p className="text-lg text-gray-600">
            Pure, organic milk every morning
          </p>
          
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg shadow-md hover:bg-yellow-500 transition-colors">
              Start Subscription
            </button>
            <button className="bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <FiCalendar className="text-gray-600" />
              <span>Choose Slot</span>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <span className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
              ISO & HACCP Compliant
            </span>
            <span className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
              Farm Fresh
            </span>
            <span className="bg-white border border-gray-200 text-gray-600 text-sm font-medium px-4 py-1.5 rounded-full">
              No Adulteration
            </span>
          </div>
        </div>
        
        {/* Right Side Image (Visually appears first on mobile) */}
   <div style={{ width: 220, height: 220, position: "relative", margin: "0 auto" }}>
  <Image
    src="/Milk.png"
    alt="Aagathya A2 Buffalo Milk Packet"
    fill
    sizes="(max-width: 768px) 70vw, 220px"
    style={{ objectFit: "contain" }}
    priority
  />
</div>


      </div>
      
      {/* Bottom Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 w-full max-w-4xl mx-auto">
      </div>
    </div>
  );
};

export default Productcard;