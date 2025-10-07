'use client';

import React from 'react';
// import your existing product components here, if any
// import ProductCard from '@/components/ProductCard'; // example

// Keep this IN SYNC with Footer.js height (FOOTER_PX = 80)
const FOOTER_PX = 80;

export default function ShopbyM() {
  return (
    <main
      className="min-h-screen"
      style={{
        backgroundColor: '#F3F4F6', // section bg per your palette
        color: '#212121'
      }}
    >
      <div className="mx-auto max-w-md px-4 pt-6">
        {/* ===== Your existing "Shop by Milk" content starts ===== */}
        {/* Replace the placeholder below with your real grid/cards/list */}
        <section className="mb-4">
          <h2 className="text-2xl font-extrabold">Shop by Milk</h2>
          <p className="text-sm mt-1" style={{ color: '#6B7280' }}>
            Explore our curated milk range
          </p>
        </section>

        {/* Example grid (delete if you already have your own) */}
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <article
              key={i}
              className="rounded-2xl overflow-hidden"
              style={{ background: '#FFFFFF', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
            >
              <div
                className="w-full aspect-square flex items-center justify-center"
                style={{ backgroundColor: '#F3F4F6' }}
              >
                <img
                  src="/Milk.png"
                  alt="Milk"
                  className="w-full h-full object-contain p-3"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-3">
                <div className="text-xs font-semibold">A2 Cow Milk 1L</div>
                <div className="mt-1 text-sm font-extrabold">₹85</div>
                <button
                  className="mt-2 w-full rounded-xl py-2 text-xs font-bold"
                  style={{ backgroundColor: '#FBBF24', color: '#212121' }}
                  onClick={() => {}}
                >
                  Add
                </button>
              </div>
            </article>
          ))}
        </div>
        {/* ===== Your existing "Shop by Milk" content ends ===== */}
      </div>

      {/* Spacer so content never hides beneath the (sticky/fixed) footer */}
      <div
        aria-hidden
        style={{
          height: `calc(${FOOTER_PX}px + env(safe-area-inset-bottom, 0px))`
        }}
      />
    </main>
  );
}
