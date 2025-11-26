import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import React, { useRef } from 'react'; // Import React and useRef

const PLACES = [
  { name: "Manikonda",     img: "/manikonda.jpg" },
  { name: "Narsingi",       img: "/narsingi.jpg" },
  { name: "Chitrapuri",    img: "/chitrapuri.jpg" },
  { name: "Jubilee Hills", img: "/Jubilee_hills.jpg" },
  { name: "OU Colony",     img: "/ou.jpg" }
];

export default function PopularDeliveryPlaces() {
  // 1. Create a ref to target the scrollable div
  const scrollContainerRef = useRef(null);

  // 2. Function to handle the scroll action
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Calculate how far to scroll (e.g., scroll by 3 times the container's width)
      const scrollAmount = scrollContainerRef.current.clientWidth * 3;
      
      // Use scrollBy for a smooth, relative scroll
      scrollContainerRef.current.scrollBy({ 
        left: scrollAmount, 
        behavior: 'smooth' 
      });

      // Alternatively, to scroll all the way to the end in one go:
      // scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  };

  return (
    <section
      className="
        mt-4 mb-4 mx-2
        rounded-2xl bg-white shadow-lg 
        p-4
        flex flex-col gap-2
        "
      style={{
        boxShadow: '0 4px 12px 0 rgba(55,70,101,.08)',
      }}
    >
      <div className="flex items-center justify-between mb-1 px-1">
        <span className="text-lg font-bold text-gray-900">We Deliver Here</span>
        
        {/* Attach the onClick handler to the button */}
        <button 
          className="text-amber-600 p-1 rounded-full transition duration-150"
          onClick={scrollRight} // Call the scroll function on click
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>
      </div>
      
      {/* Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef} // 3. Attach the ref here
        className="flex gap-3 overflow-x-auto no-scrollbar pt-1 pb-2"
      >
        {PLACES.map((p) => (
          <div key={p.name} className="flex flex-col items-center min-w-[75px]">
            {/* Image Container */}
            <div
              className="overflow-hidden shadow-sm bg-slate-50"
              style={{
                width: 62,
                height: 62,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: "18px", 
              }}
            >
              <Image
                src={p.img}
                alt={p.name}
                width={62}
                height={62}
                style={{
                  objectFit: 'cover',
                  width: "62px",
                  height: "62px",
                  borderRadius: "18px"
                }}
              />
            </div>
            {/* Location Name */}
            <span className="mt-2 text-xs font-semibold text-gray-800 text-center">
              {p.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}