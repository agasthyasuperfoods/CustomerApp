'use client';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

/* ========= Site Palette ========= */
const COLORS = {
  bg: '#FFFFFF',     // Primary Background
  text: '#212121',   // Primary Text
  accent: '#FBBF24', // CTA / Accent
  muted: '#F3F4F6'   // Section Background
};

/* ========= Milk-only Catalog (all use /Milk.png) ========= */
const MILK_IMG = '/Milk.png'; // put this in /public
const CATALOG = [
  { id: 'a2-cow-1l',     name: 'A2 Cow Milk 1L',     price: 85, image: MILK_IMG, slug: 'a2-cow-milk-1l',     tags: ['milk','a2','cow'] },
  { id: 'a2-buffalo-1l', name: 'A2 Buffalo Milk 1L', price: 95, image: MILK_IMG, slug: 'a2-buffalo-milk-1l', tags: ['milk','a2','buffalo'] },
  { id: 'full-cream-1l', name: 'Full Cream Milk 1L', price: 68, image: MILK_IMG, slug: 'full-cream-milk-1l', tags: ['milk'] },
  { id: 'toned-1l',      name: 'Toned Milk 1L',      price: 58, image: MILK_IMG, slug: 'toned-milk-1l',      tags: ['milk'] },
];

function toCurrency(n) {
  try { return `₹${Number(n).toLocaleString('en-IN')}`; } catch { return `₹${n}`; }
}

/* ========= Recent.js (Recommendations Only, 2 items) ========= */
export default function Recent() {
  const router = useRouter();

  // Pick A2 products if available, otherwise fallback to first two
  const recommended = useMemo(() => {
    const a2 = CATALOG.filter(p => (p.tags || []).includes('a2'));
    return (a2.length >= 2 ? a2.slice(0, 2) : [...a2, ...CATALOG].slice(0, 2));
  }, []);

  // Prefetch routes
  useEffect(() => {
    recommended.forEach(p => p.slug && router.prefetch(`/product/${p.slug}`).catch(() => {}));
  }, [router, recommended]);

  return (
    <section className="w-full" style={{ backgroundColor: COLORS.muted }}>
      <div className="mx-auto max-w-md px-4 py-6">
        <div className="mb-3 flex items-baseline justify-between">
          <div>
            <h3 className="text-base font-extrabold" style={{ color: COLORS.text }}>Recommended For You</h3>
            <p className="text-xs mt-0.5" style={{ color: '#6B7280' }}>Because you liked A2 Milk</p>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full font-semibold"
                style={{ backgroundColor: COLORS.accent, color: COLORS.text }}>
            Personalized
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {recommended.map(p => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========= Product Card (FIXED) ========= */
function ProductCard({ p }) {
  const href = p?.slug ? `/product/${p.slug}` : '#';
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl"
      style={{ backgroundColor: COLORS.bg, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
    >
      <div className="relative w-full aspect-square"
           style={{ backgroundColor: COLORS.muted }}>
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          style={{ objectFit: 'contain', padding: '0.75rem' }}
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-3">
        <div className="text-xs font-semibold line-clamp-2" style={{ color: COLORS.text }}>
          {p.name}
        </div>
        <div className="mt-1 text-sm font-extrabold" style={{ color: COLORS.text }}>
          {toCurrency(p.price)}
        </div>
        <button
          className="mt-2 w-full rounded-xl py-2 text-xs font-bold"
          style={{ backgroundColor: COLORS.accent, color: COLORS.text }}
          onClick={(e) => { e.preventDefault(); /* hook add-to-cart here */ }}
        >
          Add
        </button>
      </div>
    </Link>
  );
}