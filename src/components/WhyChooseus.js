// 'use client';
// import React from 'react';
// import {
//   ShieldCheckIcon,
//   SparklesIcon,
//   BeakerIcon,
//   TruckIcon,
//   StarIcon,
// } from '@heroicons/react/24/solid';

// const COLORS = {
//   bg: '#FFFFFF',     // solid card
//   text: '#212121',
//   accent: '#FBBF24',
//   muted: '#F3F4F6',  // section background strip
// };

// export default function WhyChooseUs() {
//   return (
//     <>
//       {/* Full-bleed background strip so no dark/black shows behind this section */}
//       <section
//         style={{
//           width: '100vw',
//           marginLeft: 'calc(50% - 50vw)',
//           marginRight: 'calc(50% - 50vw)',
//           backgroundColor: COLORS.muted,
//           paddingTop: 12,
//           paddingBottom: 12,
//         }}
//       >
//         {/* Centered content container */}
//         <div className="mx-auto max-w-md px-4">
//           {/* Solid white card (no transparency/backdrop) */}
//           <div
//             className="relative overflow-hidden rounded-3xl p-5"
//             style={{
//               backgroundColor: COLORS.bg,
//               boxShadow: '0 24px 48px rgba(0,0,0,0.10)',
//             }}
//           >
//             {/* soft ambient accent */}
//             <div
//               aria-hidden
//               className="absolute -right-16 -top-16 w-44 h-44 rounded-full"
//               style={{ background: COLORS.accent, opacity: 0.10, filter: 'blur(24px)' }}
//             />

//             {/* badge */}
//             <div className="mb-2">
//               <span
//                 className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold"
//                 style={{ backgroundColor: COLORS.muted, color: COLORS.text }}
//               >
//                 <ShieldCheckIcon className="w-4 h-4" style={{ color: COLORS.accent }} />
//                 Why Choose Us
//               </span>
//             </div>

//             {/* heading & subcopy */}
//             <h2
//               className="font-extrabold"
//               style={{ color: COLORS.text, fontSize: 24, lineHeight: '1.2', marginBottom: 6 }}
//             >
//               Purity You Can Taste
//             </h2>
//             <p style={{ color: '#6B7280', fontSize: 12, lineHeight: '18px', marginBottom: 16 }}>
//               Zero water added, ever. Just rich, creamy milk that families crave.
//             </p>

//             {/* bullets */}
//             <ul className="mb-4" style={{ display: 'grid', rowGap: 12 }}>
//               {[
//                 { icon: SparklesIcon, text: 'Absolutely no dilution — pure milk only.' },
//                 { icon: BeakerIcon,   text: 'Every batch lab-tested for safety & consistency.' },
//                 { icon: TruckIcon,    text: 'Same-day farm-fresh delivery with cold-chain.' },
//               ].map(({ icon: Icon, text }, i) => (
//                 <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//                   <span
//                     style={{
//                       width: 36, height: 36, display: 'grid', placeItems: 'center',
//                       backgroundColor: COLORS.muted, borderRadius: 12,
//                       boxShadow: '0 1px 6px rgba(0,0,0,0.06)', flex: '0 0 36px'
//                     }}
//                   >
//                     <Icon className="w-4 h-4" style={{ color: COLORS.accent }} />
//                   </span>
//                   <p style={{ margin: 0, color: COLORS.text, fontSize: 13, lineHeight: '19px' }}>{text}</p>
//                 </li>
//               ))}
//             </ul>

//             {/* trust + cta */}
//             <div className="flex items-center gap-3 flex-wrap">
//               <TrustPill icon={StarIcon} label="Customer rating" value="4.8★" />
//               <TrustPill icon={ShieldCheckIcon} label="Quality checks" value="100%" />
//               <button
//                 className="ml-auto rounded-xl px-4 py-2 text-sm font-bold"
//                 style={{ backgroundColor: COLORS.accent, color: COLORS.text, boxShadow: '0 6px 16px rgba(0,0,0,0.10)' }}
//                 onClick={() => {}}
//               >
//                 Explore Our Milk
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// function TrustPill({ icon: Icon, label, value }) {
//   return (
//     <div
//       className="flex items-center rounded-xl px-3 py-2"
//       style={{ backgroundColor: COLORS.muted, gap: 8, height: 36, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}
//     >
//       <Icon className="w-4 h-4" style={{ color: COLORS.accent }} />
//       <span style={{ color: '#6B7280', fontSize: 11, lineHeight: '14px' }}>{label}</span>
//       <span style={{ color: '#212121', fontSize: 12, fontWeight: 600, lineHeight: '14px' }}>{value}</span>
//     </div>
//   );
// }



'use client';

import React from 'react';

// --- Reusable Icon Components (No changes needed) ---
const LeafIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66C7.23 18.05 9 13 17 12V8z" /><path d="M17 2c-4.42 0-8 3.58-8 8 0 1.45.39 2.81 1.06 4H17v-2.94c.67-1.19 1.06-2.55 1.06-4 0-4.42-3.58-8-8-8z" /></svg>);
const TruckIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm13.5-8.5l1.96 2.5H17V9.5h2.5zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" /></svg>);
const ShieldCheckIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M12 2L2 4v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V4l-10-2zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" /></svg>);

// --- Redesigned Feature Card ---
const FeatureCard = ({ icon: Icon, title, children }) => (
    <div className="relative bg-white rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
        <div className="absolute left-1/2 -translate-x-1/2 -top-10">
            <div className="w-20 h-20 rounded-full bg-amber-400 flex items-center justify-center ring-8 ring-amber-50 shadow-md">
                <Icon className="h-10 w-10 text-white" />
            </div>
        </div>
        <div className="pt-16 pb-8 px-8 text-center">
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{children}</p>
        </div>
    </div>
);

// --- Redesigned Main Component ---
export default function WhyChooseus() {
    return (
        <section className="bg-amber-50/70 py-24 sm:py-32">
            <div className="max-w-5xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                        The Agasthya Promise
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Quality and freshness you can trust, every single day.
                    </p>
                    <div className="mt-6 w-24 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-20">
                    <FeatureCard icon={LeafIcon} title="Naturally Pure">
                        {"Our free-range cows graze on natural pastures, producing milk that's rich in nutrients and free from additives."}
                    </FeatureCard>
                    <FeatureCard icon={TruckIcon} title="Sunrise Delivery">
                        We deliver your milk before 7 AM, ensuring you start your day with the freshest product possible.
                    </FeatureCard>
                    <FeatureCard icon={ShieldCheckIcon} title="Quality Assured">
                        Every batch undergoes rigorous testing to guarantee it meets the highest standards of purity and safety.
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
}