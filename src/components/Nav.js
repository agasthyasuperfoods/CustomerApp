import React, { useState } from 'react';
import Link from 'next/link'; // Import Link
import Image from 'next/image'; // Import Image
import { LuWallet } from "react-icons/lu";

// --- SVG Icon Components ---
const CartIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" /></svg>);
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>);

const Header = () => {
  const [cartCount, setCartCount] = useState(3);
  const [query, setQuery] = useState('');

  return (
    // MODIFIED: Added sticky classes and a subtle shadow
    <header className="sticky top-0 z-50 bg-white p-4 shadow-sm">
      
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        
        {/* Top section: Logo and Icons */}
        <div className="flex items-center justify-between">
          
          {/* FIXED: Replaced <a> with <Link> and <img> with <Image> */}
          <Link href="/">
            <Image 
              src="/logo.jpeg" 
              alt="Agasthya Logo" 
              width={100} // Added required width
              height={48} 
               priority
              style={{ height: "auto" }} // Added required height
              className="h-12 w-auto"
            />
          </Link>
          
          <div className="flex items-center space-x-5">
            <button className="text-slate-600 hover:text-amber-500 transition-colors">
<LuWallet />

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

        {/* Bottom section: Search Bar */}
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Buffalo milk, A2 Cow milk..."
            className="w-full rounded-xl bg-slate-100 py-3 pl-14 pr-4 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 border border-transparent"
          />
        </div>
        
      </div>
    </header>
  );
};

export default Header;