import React, { useEffect, useRef, useState } from "react";
import { useRouter } from 'next/router';
import Image from 'next/image';
import { FiSearch, FiMapPin, FiShoppingCart, FiCreditCard } from 'react-icons/fi';
import gsap from "gsap";

const AREA_OPTIONS = [
  { name: "Narsing",       img: "/narsingi.png" },
  { name: "Manikonda",     img: "/manikonda.png" },
  { name: "Jubilee Hills", img: "/jublee.png" },
  { name: "OU Colony",     img: "/ou.png" },
  { name: "Chitrapuri",    img: "/chitrapurihills.png" },
];

const SEARCH_PRODUCTS = [
  "A2 Buffalo milk",
  "Dairy products",
  "Buffalo Curd",
  "Junnu Milk",
  "Ghee",
  "Paneer"
];

function AreaButton({ area, setAddress, setShowDropdown, width = 120, height = 120, labelSize = 15, bold = 600 }) {
  return (
    <button
      key={area.name}
      onClick={() => { setAddress(area.name); setShowDropdown(false); }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 0,
        padding: 0,
        minWidth: "50px",
        background: 'none'
      }}
      className="active:scale-95"
    >
      <Image
        src={area.img}
        alt={area.name}
        width={width}
        height={height}
        style={{
          borderRadius: 0,
          marginBottom: 2,
          objectFit: 'contain',
          background: "transparent",
          boxShadow: 'none',
          height: `${height}px`,
          width: `${width}px`,
          display: "block"
        }}
      />
      <span style={{ fontSize: `${labelSize}px`, fontWeight: bold, marginTop: 2 }}>
        {area.name}
      </span>
    </button>
  );
}

const Guestnav = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // GSAP animated placeholder logic
  const [phIndex, setPhIndex] = useState(0);
  const wordsRef = useRef([]);
  const tl = useRef();

  useEffect(() => {
    if (query) return;
    tl.current = gsap.timeline({ repeat: -1, defaults: { duration: 0.6, ease: "power4.inOut" } });
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
      tl.current.to(wordsRef.current[i], { yPercent: -80, opacity: 0, delay: 0.7 }, "+=0");
    });
    return () => tl.current && tl.current.kill();
  }, [query]);

  const handleGoToWallet = () => {
    router.push('/Gwallet');
  };

  const handleOverlayClick = (e) => {
    if (e.target.id === "area-dropdown-overlay") setShowDropdown(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white p-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowDropdown((v) => !v)}
              className="flex items-center gap-2 px-3 py-1 text-[15px] text-amber-600 font-semibold rounded-lg ring-1 ring-amber-100 bg-amber-50"
            >
              <FiMapPin size={22} style={{ color: "#f59e42" }} />
              <span className="truncate max-w-[120px]">{address ? address : "Select Area"}</span>
              <svg width="18" height="18" fill="none" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 9 12 12 9" />
              </svg>
            </button>
            {showDropdown && (
              <div
                id="area-dropdown-overlay"
                className="fixed inset-0 z-[120] flex items-center justify-center bg-black/10"
                onClick={handleOverlayClick}
              >
                <div
                  className="bg-white rounded-2xl"
                  style={{
                    width: "92vw",
                    minHeight: "440px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: 0
                  }}
                  onClick={e => e.stopPropagation()}
                >
                  <div className="text-lg font-semibold text-center mb-6 text-amber-700" style={{ marginTop: 18 }}>
                    Select Your Area
                  </div>
                  {/* 2x2 grid for first four */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: "36px 0",
                    width: '100%',
                    marginTop: 12,
                    marginBottom: 8,
                  }}>
                    <AreaButton area={AREA_OPTIONS[0]} setAddress={setAddress} setShowDropdown={setShowDropdown} />
                    <AreaButton area={AREA_OPTIONS[1]} setAddress={setAddress} setShowDropdown={setShowDropdown} />
                    <AreaButton area={AREA_OPTIONS[2]} setAddress={setAddress} setShowDropdown={setShowDropdown} />
                    <AreaButton area={AREA_OPTIONS[3]} setAddress={setAddress} setShowDropdown={setShowDropdown} />
                  </div>
                  {/* Chitrapuri - fixed width/height wrapper to prevent shrink on load and with extra margin */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: "110px",
                      width: '100%',
                      marginBottom: 24,      // <-- bottom margin here
                      marginTop: 12          // <-- top margin here
                    }}
                  >
                    <button
                      onClick={() => { setAddress(AREA_OPTIONS[4].name); setShowDropdown(false); }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 0,
                        padding: 0,
                        minWidth: "50px",
                        background: 'none'
                      }}
                      className="active:scale-95"
                    >
                      <div style={{
                        width: "150px",
                        height: "90px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}>
                        <Image
                          src={AREA_OPTIONS[4].img}
                          alt={AREA_OPTIONS[4].name}
                          width={150}
                          height={90}
                          style={{
                            borderRadius: 0,
                            objectFit: "contain",
                            background: "transparent",
                            boxShadow: "none",
                            display: "block",
                            width: "150px",
                            height: "90px"
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "15px", fontWeight: 600, marginTop: 2 }}>
                        {AREA_OPTIONS[4].name}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-slate-600 hover:text-amber-500 transition-colors" onClick={handleGoToWallet}>
              <FiCreditCard size={23} />
            </button>
            <button className="text-slate-600 hover:text-amber-500 transition-colors" onClick={handleGoToWallet}>
              <FiShoppingCart size={23} />
            </button>
          </div>
        </div>
        {/* Search bar */}
        <div className="relative flex items-center h-[38px]">
          <div className="absolute left-4 flex items-center h-full text-slate-400 pointer-events-none">
            <FiSearch size={24} />
          </div>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder=" "
            className="w-full rounded-xl bg-slate-100 pl-14 pr-4 text-slate-800 text-base font-medium h-full outline-none placeholder-gray-700"
            style={{ border: "1px solid transparent", lineHeight: '1.05' }}
            autoComplete="off"
          />
          {query === "" && (
            <span
              className="absolute left-14 pointer-events-none text-slate-400 flex items-center whitespace-nowrap h-full"
              style={{
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "1rem",
                height: "100%",
                lineHeight: "normal"
              }}
            >
              <span className="font-normal whitespace-nowrap">Search for&nbsp;</span>
              <span
                className="relative overflow-hidden whitespace-nowrap"
                style={{
                  display: "inline-grid",
                  minWidth: "6em"
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
