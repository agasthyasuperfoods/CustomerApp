

import React, { useState } from 'react';

// --- SVG Icon Components ---
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.16" />
  </svg>
);

const Header = () => {
  const [cartCount] = useState(3);

  return (
    <header className="sticky top-0 z-50 bg-white p-4 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src="/Logo.png" alt="Agasthya Logo" className="h-12 w-auto" />
        </a>

        {/* Icons */}
        <div className="flex items-center space-x-5">
          <button
            className="text-slate-600 hover:text-amber-500 transition-colors"
            aria-label="Wishlist"
          >
            <HeartIcon />
          </button>

          <button
            className="relative text-slate-600 hover:text-amber-500 transition-colors"
            aria-label="Cart"
          >
            <CartIcon />
            {cartCount > 0 && (
              <div className="absolute -top-1 -right-2 bg-amber-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {cartCount > 99 ? '99+' : cartCount}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
