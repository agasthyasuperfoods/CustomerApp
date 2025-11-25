import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import gsap from "gsap";
import Image from 'next/image';
import { FiSearch, FiMapPin, FiShoppingCart, FiCreditCard } from 'react-icons/fi';

const AREA_OPTIONS = [
  { name: "Jubilee Hills",   img: "/jublee.png" },
  { name: "Manikonda",       img: "/manikonda.png" },
  { name: "Narsing",         img: "/narsingi.png" },
  { name: "Chitrapuri",      img: "/chitrapurihills.png" },
  { name: "OU Colony",       img: "/ou.png" },
];

const SEARCH_PRODUCTS = [
  "A2 Buffalo milk",
  "Dairy products",
  "Buffalo Curd",
  "Junnu Milk",
  "Ghee",
  "Paneer"
];

const Guestnav = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState(""); // Start empty for 'Select Area'
  const [showDropdown, setShowDropdown] = useState(false);

  // GSAP animated placeholder logic
  const [phIndex, setPhIndex] = useState(0);
  const wordsRef = useRef([]);
  const tl = useRef();

  useEffect(() => {
    if (query) return;
    tl.current = gsap.timeline({ repeat: -1, defaults: { duration: 0.7, ease: "power4.inOut" } });
    SEARCH_PRODUCTS.forEach((word, i) => {
      tl.current.fromTo(
        wordsRef.current[i],
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          onStart: () => setPhIndex(i),
        }
      );
      tl.current.to(wordsRef.current[i], { yPercent: -100, opacity: 0, delay: 1 }, "+=0");
    });
    return () => tl.current && tl.current.kill();
  }, [query]);

  const handleGoToWallet = () => {
    router.push('/Gwallet');
  };

  // Close modal if user clicks outside the panel
  const handleOverlayClick = (e) => {
    if (e.target.id === "area-dropdown-overlay") setShowDropdown(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white p-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="flex items-center gap-2 px-3 py-1 text-[15px] text-amber-600 font-semibold rounded-lg ring-1 ring-amber-100 bg-amber-50"
            >
              <FiMapPin size={22} style={{ color: "#f59e42" }} />
              <span className="truncate max-w-[120px]">
                {address ? address : "Select Area"}
              </span>
              <svg width="18" height="18" fill="none" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 9 12 12 9" />
              </svg>
            </button>
            {showDropdown && (
              <div
                id="area-dropdown-overlay"
                className="fixed inset-0 z-[120] flex items-center justify-center bg-black/15" // lighter overlay for mobile
                onClick={handleOverlayClick}
              >
                <div className="bg-white rounded-2xl p-6 max-w-xs w-full flex flex-col items-center">
                  <div className="text-xl font-semibold text-center mb-6 text-amber-700">
                    Select Your Area
                  </div>
                  <div className="grid grid-cols-2 gap-y-7 gap-x-7 w-full">
                    {AREA_OPTIONS.map((area) => (
                      <button
                        key={area.name}
                        onClick={() => { setAddress(area.name); setShowDropdown(false); }}
                        className="flex flex-col items-center justify-center hover:bg-amber-50 rounded-2xl transition py-2 active:scale-95"
                      >
                        <Image
                          src={area.img}
                          alt={area.name}
                          width={70}
                          height={70}
                          style={{
                            borderRadius: 14,
                            marginBottom: 10,
                            objectFit: 'contain',
                          }}
                        />
                        <span className="text-base font-semibold text-gray-700 text-center mt-1">{area.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-5">
            <button className="text-slate-600 hover:text-amber-500 transition-colors" onClick={handleGoToWallet}>
              <FiCreditCard size={28} />
            </button>
            <button className="text-slate-600 hover:text-amber-500 transition-colors" onClick={handleGoToWallet}>
              <FiShoppingCart size={28} />
            </button>
          </div>
        </div>
        {/* Search bar */}
        <div className="relative flex items-center h-[48px]">
          <div className="absolute left-4 flex items-center h-full text-slate-400 pointer-events-none">
            <FiSearch size={32} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder=" "
            className="w-full rounded-xl bg-slate-100 pl-14 pr-4 text-slate-800 text-lg font-semibold h-full outline-none placeholder-gray-700"
            style={{ border: "1px solid transparent", lineHeight: '1.2' }}
            autoComplete="off"
          />
          {query === "" && (
            <span
              className="absolute left-14 pointer-events-none text-slate-400 flex items-center whitespace-nowrap h-full"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1.15rem",
                height: "100%",
                lineHeight: "normal"
              }}
            >
              <span className="font-normal whitespace-nowrap">Search for&nbsp;</span>
              <span
                className="relative overflow-hidden whitespace-nowrap"
                style={{
                  display: "inline-grid",
                  minWidth: "6.5em"
                }}
              >
                {SEARCH_PRODUCTS.map((word, i) => (
                  <span
                    key={word}
                    ref={el => (wordsRef.current[i] = el)}
                    style={{
                      gridArea: "1/1/2/2",
                      position: "relative",
                      fontWeight: 450,
                      whiteSpace: "nowrap",
                      display: i === phIndex ? "inline" : "none"
                    }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Guestnav;
