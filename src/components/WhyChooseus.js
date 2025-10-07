'use client';
import React from 'react';
import {
  ShieldCheckIcon,
  SparklesIcon,
  BeakerIcon,
  TruckIcon,
  StarIcon,
} from '@heroicons/react/24/solid';

const COLORS = {
  bg: '#FFFFFF',     // solid card
  text: '#212121',
  accent: '#FBBF24',
  muted: '#F3F4F6',  // section background strip
};

export default function WhyChooseUs() {
  return (
    <>
      {/* Full-bleed background strip so no dark/black shows behind this section */}
      <section
        style={{
          width: '100vw',
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          backgroundColor: COLORS.muted,
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {/* Centered content container */}
        <div className="mx-auto max-w-md px-4">
          {/* Solid white card (no transparency/backdrop) */}
          <div
            className="relative overflow-hidden rounded-3xl p-5"
            style={{
              backgroundColor: COLORS.bg,
              boxShadow: '0 24px 48px rgba(0,0,0,0.10)',
            }}
          >
            {/* soft ambient accent */}
            <div
              aria-hidden
              className="absolute -right-16 -top-16 w-44 h-44 rounded-full"
              style={{ background: COLORS.accent, opacity: 0.10, filter: 'blur(24px)' }}
            />

            {/* badge */}
            <div className="mb-2">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold"
                style={{ backgroundColor: COLORS.muted, color: COLORS.text }}
              >
                <ShieldCheckIcon className="w-4 h-4" style={{ color: COLORS.accent }} />
                Why Choose Us
              </span>
            </div>

            {/* heading & subcopy */}
            <h2
              className="font-extrabold"
              style={{ color: COLORS.text, fontSize: 24, lineHeight: '1.2', marginBottom: 6 }}
            >
              Purity You Can Taste
            </h2>
            <p style={{ color: '#6B7280', fontSize: 12, lineHeight: '18px', marginBottom: 16 }}>
              Zero water added, ever. Just rich, creamy milk that families crave.
            </p>

            {/* bullets */}
            <ul className="mb-4" style={{ display: 'grid', rowGap: 12 }}>
              {[
                { icon: SparklesIcon, text: 'Absolutely no dilution — pure milk only.' },
                { icon: BeakerIcon,   text: 'Every batch lab-tested for safety & consistency.' },
                { icon: TruckIcon,    text: 'Same-day farm-fresh delivery with cold-chain.' },
              ].map(({ icon: Icon, text }, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span
                    style={{
                      width: 36, height: 36, display: 'grid', placeItems: 'center',
                      backgroundColor: COLORS.muted, borderRadius: 12,
                      boxShadow: '0 1px 6px rgba(0,0,0,0.06)', flex: '0 0 36px'
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: COLORS.accent }} />
                  </span>
                  <p style={{ margin: 0, color: COLORS.text, fontSize: 13, lineHeight: '19px' }}>{text}</p>
                </li>
              ))}
            </ul>

            {/* trust + cta */}
            <div className="flex items-center gap-3 flex-wrap">
              <TrustPill icon={StarIcon} label="Customer rating" value="4.8★" />
              <TrustPill icon={ShieldCheckIcon} label="Quality checks" value="100%" />
              <button
                className="ml-auto rounded-xl px-4 py-2 text-sm font-bold"
                style={{ backgroundColor: COLORS.accent, color: COLORS.text, boxShadow: '0 6px 16px rgba(0,0,0,0.10)' }}
                onClick={() => {}}
              >
                Explore Our Milk
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function TrustPill({ icon: Icon, label, value }) {
  return (
    <div
      className="flex items-center rounded-xl px-3 py-2"
      style={{ backgroundColor: COLORS.muted, gap: 8, height: 36, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
    >
      <Icon className="w-4 h-4" style={{ color: COLORS.accent }} />
      <span style={{ color: '#6B7280', fontSize: 11, lineHeight: '14px' }}>{label}</span>
      <span style={{ color: '#212121', fontSize: 12, fontWeight: 600, lineHeight: '14px' }}>{value}</span>
    </div>
  );
}
