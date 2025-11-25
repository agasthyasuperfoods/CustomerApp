import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// --- SVG Icons (unchanged) ---
const WalletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="4" />
    <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    <circle cx="16" cy="14" r="2" />
  </svg>
);
const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" />
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="15" cy="15" r="10" />
    <line x1="28" y1="28" x2="21.65" y2="21.65" />
  </svg>
);
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="8" r="4"/>
    <path d="M9 2v2M9 14v2M2 9h2m10 0h2"/>
  </svg>
);

const ADDRESS_OPTIONS = [
  "Madhapur, Hyderabad",
  "Gachibowli, Hyderabad",
  "Kondapur, Hyderabad",
  "Enter address...",
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
  const [cartCount] = useState(5);
  const [query, setQuery] = useState('');
  const [address, setAddress] = useState(ADDRESS_OPTIONS[0]);
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
          onStart: () => setPhIndex(i)
        }
      );
      tl.current.to(wordsRef.current[i], { yPercent: -100, opacity: 0, delay: 1 }, "+=0");
    });
    return () => tl.current && tl.current.kill();
    // eslint-disable-next-line
  }, [query]);

  return (
   <header className="fixed top-0 left-0 w-full z-50 bg-white p-3 shadow-sm">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {/* Top section: Address dropdown + icons */}
        <div className="flex items-center justify-between">
          {/* Address dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(v => !v)}
              className="flex items-center gap-1 px-3 py-1 text-[15px] text-amber-600 font-semibold rounded-lg ring-1 ring-amber-100 bg-amber-50"
            >
              <LocationIcon />
              <span className="truncate max-w-[110px]">{address}</span>
              <svg width="18" height="18" fill="none" stroke="#f59e42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 9 12 12 9"/>
              </svg>
            </button>
            {showDropdown && (
              <div className="absolute left-0 mt-2 bg-white rounded-xl shadow border border-amber-100 w-56 z-50">
                {ADDRESS_OPTIONS.map((addr) => (
                  <button
                    key={addr}
                    onClick={() => { setAddress(addr); setShowDropdown(false); }}
                    className="block w-full text-left px-4 py-2 text-slate-700 hover:bg-amber-50"
                  >
                    {addr}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Icons */}
          <div className="flex items-center space-x-5">
            <button className="text-slate-600 hover:text-amber-500 transition-colors">
              <WalletIcon />
            </button>
            <button className="relative text-slate-600 hover:text-amber-500 transition-colors">
              <CartIcon />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-2 bg-amber-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                  {cartCount}
                </div>
              )}
            </button>
          </div>
        </div>
        {/* Search bar, all items aligned in a single row */}
        <div className="relative flex items-center h-[48px]">
          <div className="absolute left-4 flex items-center h-full text-slate-400 pointer-events-none">
            <SearchIcon />
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
