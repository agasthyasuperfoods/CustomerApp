import React from 'react';
import { Thermometer, Milk, Droplet, Clock } from 'lucide-react';

export default function AgasthyaFeatures() {
    // Define the Amber color to match your buttons (Yellow/Gold)
    const ACCENT_COLOR_CLASS = "text-amber-500"; 
    
  return (
    <div className="mx-2 bg-white rounded-xl shadow-lg mb-6">
      
      {/* Header Section with Padding */}
      <div className="text-center mb-6 px-6 pt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          We are bringing <span className={ACCENT_COLOR_CLASS}>Raw & Creamy </span>Milk back
        </h2>
        <p className="text-gray-500 text-xs leading-relaxed max-w-sm mx-auto">
          Better health begins with real, unprocessed food. We ensure Agasthya Nutro Milk is delivered thick, sweet, and exactly as nature intended.
        </p>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-2">
        
        {/* Item 1: Top Left */}
        <div className="flex flex-col items-center text-center p-6 border-r border-b border-dashed border-gray-200">
          <div className="mb-3">
            <Milk size={32} strokeWidth={1.5} className={ACCENT_COLOR_CLASS} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Direct Farm to Home
          </h3>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            100% Pure A2 Buffalo milk sourced directly from our own animals. No middlemen.
          </p>
        </div>

        {/* Item 2: Top Right */}
        <div className="flex flex-col items-center text-center p-6 border-b border-dashed border-gray-200">
          <div className="mb-3">
            <Droplet size={32} strokeWidth={1.5} className={ACCENT_COLOR_CLASS} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Unmatched 7.5% Fat
          </h3>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            The thickest milk in the market! Experience natural creaminess you can&apos;t find elsewhere.
          </p>
        </div>

        {/* Item 3: Bottom Left */}
        <div className="flex flex-col items-center text-center p-6 border-r border-dashed border-gray-200">
          <div className="mb-3">
            <Thermometer size={32} strokeWidth={1.5} className={ACCENT_COLOR_CLASS} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Chilled (Raw) at 4°C
          </h3>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            No Pasteurization. We chill milk to 4°C immediately to preserve enzymes.
          </p>
        </div>

        {/* Item 4: Bottom Right */}
        <div className="flex flex-col items-center text-center p-6">
          <div className="mb-3">
            <Clock size={32} strokeWidth={1.5} className={ACCENT_COLOR_CLASS} />
          </div>
          <h3 className="text-sm font-bold text-gray-900 mb-2">
            Morning Delivery
          </h3>
          <p className="text-[11px] text-gray-500 leading-relaxed">
            Fresh, chilled A2 milk reaches your doorstep every morning. Start your day fresh.
          </p>
        </div>

      </div>
    </div>
  );
}