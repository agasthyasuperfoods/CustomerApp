// 'use client';
// import React, { useMemo, useState } from 'react';
// import {
//   PauseCircleIcon,
//   PlayCircleIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   CalendarDaysIcon,
//   ClockIcon,
//   MinusIcon,
//   PlusIcon,
//   MapPinIcon,
//   ShieldCheckIcon,
//   MagnifyingGlassIcon,
//   ExclamationTriangleIcon,
//   ArrowPathIcon,
// } from '@heroicons/react/24/solid';

// // Brand Tokens
// const COLORS = {
//   bg: '#FFFFFF',
//   text: '#212121',
//   accent: '#FBBF24',
//   muted: '#F3F4F6',
//   sub: '#6B7280',
//   success: '#16A34A',
//   danger: '#DC2626',
//   border: 'rgba(0,0,0,0.08)'
// };

// // Date Utilities
// const WEEKDAYS = ['S','M','T','W','T','F','S'];
// const startOfMonth = d => new Date(d.getFullYear(), d.getMonth(), 1);
// const endOfMonth   = d => new Date(d.getFullYear(), d.getMonth() + 1, 0);
// const addMonths    = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
// const toKey        = d => d.toISOString().slice(0,10);
// const isSameDay    = (a,b) => a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();

// // Section Header
// function SectionHeader({ icon: Icon, title, hint }) {
//   return (
//     <div className="flex items-center justify-between mb-2">
//       <div className="flex items-center gap-2">
//         {Icon && <Icon className="w-5 h-5" style={{ color: COLORS.accent }} />}
//         <div className="text-sm font-bold" style={{ color: COLORS.text }}>{title}</div>
//       </div>
//       {hint && <div className="text-xs" style={{ color: COLORS.sub }}>{hint}</div>}
//     </div>
//   );
// }

// // Hero Header (replaces old StatusBanner)
// function HeroHeader({ paused, setPaused, selectedCount }) {
//   return (
//     <section
//       className="mb-4 rounded-3xl border overflow-hidden"
//       style={{
//         background: 'linear-gradient(180deg, #FFF7D6 0%, #FFFFFF 65%)',
//         borderColor: COLORS.border,
//       }}
//     >
//       <div className="p-4">
//         <div className="flex items-start justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-extrabold leading-tight" style={{ color: COLORS.text }}>Milk Subscription</h1>
//             <p className="text-sm mt-1" style={{ color: COLORS.sub }}>
//               Configure delivery days, quantity, and service area. Designed for fast, low‑effort edits.
//             </p>
//             <div className="mt-3 flex flex-wrap gap-2">
//               <span className="text-xs font-semibold px-2.5 py-1.5 rounded-full border" style={{ backgroundColor: COLORS.bg, color: COLORS.text, borderColor: COLORS.border }}>
//                 {selectedCount} day{selectedCount === 1 ? '' : 's'} this month
//               </span>
//               <span className="text-xs font-semibold px-2.5 py-1.5 rounded-full border" style={{ backgroundColor: COLORS.bg, color: COLORS.text, borderColor: COLORS.border }}>
//                 Status: {paused ? 'Paused' : 'Active'}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={() => setPaused(!paused)}
//             className="flex items-center gap-2 rounded-xl px-3 py-2 font-bold text-sm shrink-0"
//             style={{ backgroundColor: COLORS.accent, color: COLORS.text }}
//           >
//             {paused ? 'Resume' : 'Pause'}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// // Quick Presets
// function Presets({ onSelect }) {
//   const items = [
//     { k: 'EVERYDAY', label: 'Everyday' },
//     { k: 'WEEKDAYS', label: 'Weekdays (Mon–Fri)' },
//     { k: 'WEEKENDS', label: 'Weekends (Sat–Sun)' },
//     { k: 'ALT',      label: 'Alternate Days (Even Dates)' },
//     { k: 'CLEAR',    label: 'Clear Selection', danger: true },
//   ];
//   return (
//     <section className="mb-3">
//       <SectionHeader title="Quick Select" hint="Tap a preset or pick specific dates below" />
//       <div className="grid grid-cols-2 gap-2">
//         {items.map(p => (
//           <button
//             key={p.k}
//             onClick={() => onSelect(p.k)}
//             className={`rounded-xl px-3 py-2 text-sm font-semibold border ${p.danger ? 'border-red-200' : ''}`}
//             style={{ backgroundColor: COLORS.bg, color: p.danger ? COLORS.danger : COLORS.text, borderColor: COLORS.border }}
//           >
//             {p.label}
//           </button>
//         ))}
//       </div>
//     </section>
//   );
// }

// // Calendar
// function Calendar({ monthDate, selectedDates, onToggleDate, onPrev, onNext }) {
//   const cells = useMemo(() => {
//     const first = startOfMonth(monthDate);
//     const last  = endOfMonth(monthDate);
//     const lead  = first.getDay();
//     const total = lead + last.getDate();
//     const rows  = Math.ceil(total / 7) * 7;

//     const out = [];
//     for (let i = 0; i < rows; i++) {
//       const n = i - lead + 1;
//       out.push(n < 1 || n > last.getDate() ? null : new Date(monthDate.getFullYear(), monthDate.getMonth(), n));
//     }
//     return out;
//   }, [monthDate]);

//   const today = new Date();
//   const title = monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });

//   return (
//     <div className="rounded-2xl p-4 border" style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}>
//       <div className="flex items-center justify-between mb-3">
//         <div className="flex items-center gap-2">
//           <CalendarDaysIcon className="w-5 h-5" style={{ color: COLORS.accent }} />
//           <h3 className="font-extrabold" style={{ color: COLORS.text }}>{title}</h3>
//         </div>
//         <div className="flex items-center gap-1.5">
//           <button onClick={onPrev} className="p-2 rounded-lg" style={{ backgroundColor: COLORS.muted }}>
//             <ChevronLeftIcon className="w-5 h-5" style={{ color: COLORS.text }} />
//           </button>
//           <button onClick={onNext} className="p-2 rounded-lg" style={{ backgroundColor: COLORS.muted }}>
//             <ChevronRightIcon className="w-5 h-5" style={{ color: COLORS.text }} />
//           </button>
//         </div>
//       </div>

//       <div className="grid grid-cols-7 text-center mb-2">
//         {WEEKDAYS.map(w => (
//           <div key={w} className="text-xs font-semibold" style={{ color: COLORS.sub }}>{w}</div>
//         ))}
//       </div>

//       <div className="grid grid-cols-7 gap-1">
//         {cells.map((d, i) => {
//           if (!d) return <div key={i} className="h-10" />;
//           const k = toKey(d);
//           const isSelected = selectedDates.has(k);
//           const isToday = isSameDay(d, today);
//           return (
//             <button
//               key={k}
//               onClick={() => onToggleDate(d)}
//               className={`h-10 rounded-lg text-sm font-semibold flex items-center justify-center border ${isSelected ? 'ring-2 ring-offset-1' : ''}`}
//               style={{
//                 backgroundColor: isSelected ? COLORS.accent : COLORS.muted,
//                 color: COLORS.text,
//                 borderColor: isToday ? COLORS.accent : 'transparent',
//               }}
//               aria-pressed={isSelected}
//               aria-label={`Toggle ${k}`}
//             >
//               {d.getDate()}
//             </button>
//           );
//         })}
//       </div>

//       <p className="text-xs mt-2" style={{ color: COLORS.sub }}>Tap any date to toggle delivery.</p>
//     </div>
//   );
// }

// // Area Chips
// function AreaChips({ areas, value, onChange }) {
//   const [query, setQuery] = useState('');
//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     if (!q) return areas;
//     return areas.filter(a => a.toLowerCase().includes(q));
//   }, [areas, query]);

//   return (
//     <div className="rounded-2xl p-4 border" style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}>
//       <div className="flex items-center justify-between mb-3">
//         <div className="text-sm font-bold" style={{ color: COLORS.text }}>Service Area</div>
//         {value && (
//           <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ backgroundColor: COLORS.muted, color: COLORS.text }}>
//             Selected: {value}
//           </span>
//         )}
//       </div>

//       <div className="flex items-center gap-2 mb-3 rounded-xl px-3 py-2" style={{ backgroundColor: COLORS.muted }}>
//         <MagnifyingGlassIcon className="w-4 h-4" style={{ color: COLORS.sub }} />
//         <input
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           placeholder="Search area (e.g., Jubilee Hills)"
//           className="bg-transparent outline-none w-full text-sm"
//           style={{ color: COLORS.text }}
//         />
//       </div>

//       <div className="flex flex-wrap gap-2">
//         {filtered.map(area => {
//           const active = value === area;
//           return (
//             <button
//               key={area}
//               onClick={() => onChange(active ? '' : area)}
//               className="px-3 py-2 rounded-xl text-sm font-semibold border"
//               style={{
//                 backgroundColor: active ? COLORS.accent : COLORS.muted,
//                 color: COLORS.text,
//                 borderColor: COLORS.border,
//               }}
//             >
//               {area}
//             </button>
//           );
//         })}
//       </div>

//       <p className="text-xs mt-3 flex items-start gap-1" style={{ color: COLORS.sub }}>
//         <ExclamationTriangleIcon className="w-4 h-4 mt-0.5" style={{ color: COLORS.accent }} />
//         We currently deliver in: Jubilee Hills, Manikonda, Narsingi, Chitrapuri, and OU Colony near Golconda.
//       </p>
//     </div>
//   );
// }

// // Quantity Picker
// function QuantityPicker({ qty, setQty }) {
//   return (
//     <div className="rounded-2xl p-4 border" style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}>
//       <SectionHeader title="Daily Quantity" hint="Liters per delivery" />
//       <div className="flex items-center justify-between">
//         <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 rounded-lg" style={{ backgroundColor: COLORS.muted }}>
//           <MinusIcon className="w-5 h-5" style={{ color: COLORS.text }} />
//         </button>
//         <div className="text-2xl font-extrabold" style={{ color: COLORS.text }}>{qty} L</div>
//         <button onClick={() => setQty(qty + 1)} className="p-2 rounded-lg" style={{ backgroundColor: COLORS.muted }}>
//           <PlusIcon className="w-5 h-5" style={{ color: COLORS.text }} />
//         </button>
//       </div>
//       <div className="mt-3 flex flex-wrap gap-2">
//         {[1,2,3,4].map(v => (
//           <button key={v} onClick={() => setQty(v)} className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ backgroundColor: qty===v ? COLORS.accent : COLORS.muted, color: COLORS.text }}>
//             {v} L
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Address Box
// function AddressBox({ address, setAddress, areaSelected }) {
//   return (
//     <div className="rounded-2xl p-4 border" style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}>
//       <SectionHeader title="Delivery Address" />
//       <div className="flex items-start gap-2">
//         <div className="rounded-lg p-2" style={{ backgroundColor: COLORS.muted }}>
//           <MapPinIcon className="w-5 h-5" style={{ color: COLORS.text }} />
//         </div>
//         <input
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="Flat / Street, Landmark"
//           className="flex-1 rounded-xl px-3 py-2 text-sm outline-none"
//           style={{ backgroundColor: COLORS.muted, color: COLORS.text }}
//         />
//       </div>
//       {!areaSelected && (
//         <p className="text-xs mt-2" style={{ color: COLORS.sub }}>
//           Select a <span className="font-semibold" style={{ color: COLORS.text }}>Service Area</span> above to confirm coverage.
//         </p>
//       )}
//     </div>
//   );
// }

// // Summary Card
// function SummaryCard({ paused, qty, area, address, selectedCount, onReset }) {
//   return (
//     <div className="rounded-2xl p-4 border" style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}>
//       <SectionHeader title="Review" hint="One-tap to save" />
//       <div className="grid grid-cols-2 gap-3 text-sm">
//         <div className="rounded-xl p-3" style={{ backgroundColor: COLORS.muted }}>
//           <div className="text-xs" style={{ color: COLORS.sub }}>Status</div>
//           <div className="font-bold" style={{ color: COLORS.text }}>{paused ? 'Paused' : 'Active'}</div>
//         </div>
//         <div className="rounded-xl p-3" style={{ backgroundColor: COLORS.muted }}>
//           <div className="text-xs" style={{ color: COLORS.sub }}>Days Selected</div>
//           <div className="font-bold" style={{ color: COLORS.text }}>{selectedCount}</div>
//         </div>
//         <div className="rounded-xl p-3" style={{ backgroundColor: COLORS.muted }}>
//           <div className="text-xs" style={{ color: COLORS.sub }}>Quantity</div>
//           <div className="font-bold" style={{ color: COLORS.text }}>{qty} L</div>
//         </div>
//       </div>

//       <div className="mt-3 rounded-xl p-3" style={{ backgroundColor: COLORS.muted }}>
//         <div className="text-xs" style={{ color: COLORS.sub }}>Service Area</div>
//         <div className="font-semibold" style={{ color: COLORS.text }}>{area || '—'}</div>
//         <div className="text-xs mt-2" style={{ color: COLORS.sub }}>Address</div>
//         <div className="font-semibold" style={{ color: COLORS.text }}>{address || '—'}</div>
//       </div>

//       <button onClick={onReset} className="mt-3 inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg border" style={{ color: COLORS.text, borderColor: COLORS.border }}>
//         <ArrowPathIcon className="w-4 h-4" /> Reset all selections
//       </button>
//     </div>
//   );
// }

// // Main Component
// export default function Subscription({ footerHeight = 80 }) {
//   // Core subscription state
//   const [paused, setPaused]       = useState(false);
//   const [monthDate, setMonthDate] = useState(startOfMonth(new Date()));
//   const [selectedDates, setDates] = useState(new Set());
//   const [qty, setQty]             = useState(1);
//   const [address, setAddress]     = useState('32-14 Agasthya Enclave, Kadapa');

//   // Service area state
//   const SERVICE_AREAS = [
//     'Jubilee Hills',
//     'Manikonda',
//     'Narsingi',
//     'Chitrapuri',
//     'OU Colony (near Golconda)',
//   ];
//   const [area, setArea] = useState('');

//   const onPrev = () => setMonthDate(addMonths(monthDate, -1));
//   const onNext = () => setMonthDate(addMonths(monthDate, 1));
//   const onToggleDate = d => {
//     const k = toKey(d);
//     const next = new Set(selectedDates);
//     next.has(k) ? next.delete(k) : next.add(k);
//     setDates(next);
//   };

//   const selectPreset = type => {
//     if (type === 'CLEAR') { setDates(new Set()); return; }
//     const first = startOfMonth(monthDate);
//     const last  = endOfMonth(monthDate);
//     const next  = new Set();
//     for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
//       const dow = d.getDay();
//       if (type === 'EVERYDAY') next.add(toKey(d));
//       if (type === 'WEEKDAYS' && dow >= 1 && dow <= 5) next.add(toKey(d));
//       if (type === 'WEEKENDS' && (dow === 0 || dow === 6)) next.add(toKey(d));
//       if (type === 'ALT' && d.getDate() % 2 === 0) next.add(toKey(d));
//     }
//     setDates(next);
//   };

//   // Save gating: must have area selected + (dates OR paused)
//   const selectedCount = selectedDates.size;
//   const canSave = area && (paused || selectedCount > 0);

//   const handleSave = () => {
//     alert(`Saved!
// Area: ${area || 'N/A'}
// Qty: ${qty}L
// Days: ${selectedCount}
// Status: ${paused ? 'Paused' : 'Active'}`);
//   };

//   const handleReset = () => {
//     setPaused(false);
//     setDates(new Set());
//     setQty(1);
//     setArea('');
//     setAddress('');
//   };

//   return (
//     <main className="mx-auto max-w-md" style={{ backgroundColor: COLORS.muted, minHeight: `calc(100vh - ${footerHeight}px)`, padding: '12px 16px' }}>
//       <HeroHeader paused={paused} setPaused={setPaused} selectedCount={selectedCount} />

//       <Presets onSelect={selectPreset} />

//       <section className="mb-3">
//         <Calendar monthDate={monthDate} selectedDates={selectedDates} onToggleDate={onToggleDate} onPrev={onPrev} onNext={onNext} />
//       </section>

//       <section className="mb-3">
//         <QuantityPicker qty={qty} setQty={setQty} />
//       </section>

//       <section className="mb-3">
//         <AreaChips areas={SERVICE_AREAS} value={area} onChange={(a) => setArea(a)} />
//       </section>

//       <section className="mb-3">
//         <AddressBox address={address} setAddress={setAddress} areaSelected={!!area} />
//       </section>

//       <section className="mb-4">
//         <SummaryCard paused={paused} qty={qty} area={area} address={address} selectedCount={selectedCount} onReset={handleReset} />
//       </section>

//       <section className="mb-3">
//         <button
//           disabled={!canSave}
//           className="w-full rounded-2xl py-3 font-bold disabled:opacity-60"
//           style={{ backgroundColor: COLORS.accent, color: COLORS.text, boxShadow: '0 6px 16px rgba(0,0,0,0.10)' }}
//           onClick={handleSave}
//         >
//           {paused ? 'Save & Keep Paused' : 'Save Subscription'}
//         </button>
//         {!area && (
//           <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: COLORS.sub }}>
//             <ShieldCheckIcon className="w-4 h-4" style={{ color: COLORS.accent }} />
//             Please select a service area to enable saving.
//           </div>
//         )}
//       </section>

//       <div aria-hidden style={{ height: footerHeight }} />
//     </main>
//   );
// }

'use client';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import {
  ArrowLeftIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  XMarkIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';

// --- Date Utilities ---
const WEEKDAYS = ['S','M','T','W','T','F','S'];
const startOfMonth = d => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth   = d => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const addMonths    = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const toKey        = d => d.toISOString().slice(0,10);
const isSameDay    = (a,b) => a && b && a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate();
const formatDate   = d => d ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '';

const PRICE_PER_LITER = 100;
const SERVICE_AREAS = ['Kadapa', 'Jubilee Hills', 'Manikonda', 'Narsingi', 'OU Colony'];

// --- Helper function to compare Sets ---
const areSetsEqual = (set1, set2) => {
    if (!set1 || !set2 || set1.size !== set2.size) return false;
    for (const item of set1) {
        if (!set2.has(item)) return false;
    }
    return true;
};

// --- New Subscription Component ---
const NewSubscription = ({ onSubscribe }) => {
    const [qty, setQty] = useState(0.5);
    const [address, setAddress] = useState('32-14 Agasthya Enclave');
    const [area, setArea] = useState('Kadapa');
    const [pattern, setPattern] = useState('EVERYDAY');

    const estimatedDays = useMemo(() => {
        switch(pattern) {
            case 'EVERYDAY': return 30;
            case 'WEEKDAYS': return 22;
            case 'WEEKENDS': return 8;
            case 'ALTERNATE': return 15;
            default: return 0;
        }
    }, [pattern]);

    const estimatedBill = qty * estimatedDays * PRICE_PER_LITER;

    const handleStartSubscription = () => {
        if (!area || !address) {
             if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'Missing Details',
                    text: 'Please fill in your service area and address.',
                    confirmButtonColor: '#FBBF24',
                });
            }
            return;
        }
        onSubscribe(pattern);
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="bg-amber-400 h-28">
               <div className="mx-auto max-w-lg px-4 pt-6 flex items-start">
                <button onClick={() => window.history.back()} className="p-2 -ml-2 text-gray-800 hover:bg-black/10 rounded-full">
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900 ml-3 mt-1">
                  Start Your Subscription
                </h1>
              </div>
            </div>
            
            <main className="mx-auto max-w-lg p-4 -mt-16 pb-28">
                <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
                    <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <CalendarDaysIcon className="w-6 h-6 text-amber-500" />
                        Choose a Delivery Schedule
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        {['Everyday', 'Weekdays', 'Weekends', 'Alternate'].map(p => (
                            <button
                              key={p}
                              onClick={() => setPattern(p.toUpperCase())}
                              className={`rounded-lg py-3 text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${
                                pattern === p.toUpperCase() 
                                ? 'bg-amber-400 text-gray-900 shadow' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {pattern === p.toUpperCase() && <CheckCircleIcon className="w-5 h-5"/>}
                              {p}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-4 space-y-5 mb-6">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <MapPinIcon className="w-6 h-6 text-amber-500" />
                        Set Your Delivery Details
                    </h2>
                    <div>
                        <label className="text-sm font-medium text-gray-700">Quantity per delivery</label>
                        <div className="flex items-center justify-between mt-2">
                            <button onClick={() => setQty(Math.max(0.5, qty - 0.5))} className="p-3 rounded-lg bg-slate-100 hover:bg-slate-200"><MinusIcon className="w-5 h-5 text-gray-700" /></button>
                            <div className="text-2xl font-extrabold text-gray-900">{qty.toFixed(1)} L</div>
                            <button onClick={() => setQty(qty + 0.5)} className="p-3 rounded-lg bg-slate-100 hover:bg-slate-200"><PlusIcon className="w-5 h-5 text-gray-700" /></button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="area" className="text-sm font-medium text-gray-700">Service Area</label>
                        <select id="area" value={area} onChange={e => setArea(e.target.value)} className="mt-2 block w-full rounded-lg border-gray-200 bg-slate-50 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm">
                            <option value="">Select your area...</option>
                            {SERVICE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</label>
                         <input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g., Flat 101, Sunshine Apartments" className="mt-2 block w-full rounded-lg border-0 bg-slate-50 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm" />
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Est. Monthly Bill</p>
                        <p className="text-xl font-extrabold text-gray-900">
                            ₹{estimatedBill.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={handleStartSubscription}
                        className="w-full max-w-[200px] text-center rounded-xl bg-amber-400 px-4 py-3.5 text-base font-bold text-gray-900 shadow-sm hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start Subscription
                      </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

// --- Manage Subscription Component ---
const ManageSubscription = ({ initialPattern }) => {
  const [monthDate, setMonthDate] = useState(startOfMonth(new Date()));
  const [selectedDates, setDates] = useState(new Set());
  const [qty, setQty] = useState(0.5);
  const [address, setAddress] = useState('32-14 Agasthya Enclave');
  const [area, setArea] = useState('Kadapa');
  const [isPauseModalOpen, setPauseModalOpen] = useState(false);
  const [vacationPeriod, setVacationPeriod] = useState({ start: null, end: null });
  const [pristineState, setPristineState] = useState(null);

  const isSubscriptionPaused = !!vacationPeriod.start;

  const onToggleDate = d => {
    const k = toKey(d);
    const next = new Set(selectedDates);
    next.has(k) ? next.delete(k) : next.add(k);
    setDates(next);
  };

  const selectPreset = useCallback((type) => {
    if (type === 'CLEAR') { setDates(new Set()); return; }
    const first = startOfMonth(monthDate);
    const last  = endOfMonth(monthDate);
    const next  = new Set();
    for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
      const dow = d.getDay();
      if (type === 'EVERYDAY') next.add(toKey(d));
      if (type === 'WEEKDAYS' && dow >= 1 && dow <= 5) next.add(toKey(d));
      if (type === 'WEEKENDS' && (dow === 0 || dow === 6)) next.add(toKey(d));
    }
    setDates(next);
  }, [monthDate]);

  // FIXED: This useEffect no longer has missing dependencies.
  useEffect(() => {
    const first = startOfMonth(monthDate);
    const last = endOfMonth(monthDate);
    const initialDates = new Set();
    if (initialPattern) {
        for (let d = new Date(first); d <= last; d.setDate(d.getDate() + 1)) {
            const dow = d.getDay();
            if (initialPattern === 'EVERYDAY') initialDates.add(toKey(d));
            if (initialPattern === 'WEEKDAYS' && dow >= 1 && dow <= 5) initialDates.add(toKey(d));
            if (initialPattern === 'WEEKENDS' && (dow === 0 || dow === 6)) initialDates.add(toKey(d));
        }
    }
    setDates(initialDates);

    // Capture the complete initial state using the known default values
    setPristineState({
        dates: initialDates,
        qty: 0.5, 
        area: 'Kadapa',
        address: '32-14 Agasthya Enclave',
    });
  }, [initialPattern, monthDate]);

  const isDirty = useMemo(() => {
    if (!pristineState) return false;
    const hasDateChanged = !areSetsEqual(pristineState.dates, selectedDates);
    const hasQtyChanged = pristineState.qty !== qty;
    const hasAreaChanged = pristineState.area !== area;
    const hasAddressChanged = pristineState.address !== address;
    return hasDateChanged || hasQtyChanged || hasAreaChanged || hasAddressChanged;
  }, [pristineState, selectedDates, qty, area, address]);

  const handlePauseAction = () => {
      if (isSubscriptionPaused) {
          setVacationPeriod({ start: null, end: null });
      } else {
          setPauseModalOpen(true);
      }
  }
  
  const handleConfirmPause = (period) => {
      setVacationPeriod(period);
  }

  const activeSelectedDates = useMemo(() => {
    if (!isSubscriptionPaused) return selectedDates;
    const active = new Set();
    const start = vacationPeriod.start;
    const end = vacationPeriod.end;
    start.setHours(0,0,0,0);
    end.setHours(23,59,59,999);
    
    selectedDates.forEach(dateStr => {
      const d = new Date(dateStr);
      if (d < start || d > end) {
        active.add(dateStr);
      }
    });
    return active;
  }, [selectedDates, vacationPeriod, isSubscriptionPaused]);

  const selectedCount = activeSelectedDates.size;
  const estimatedBill = selectedCount * qty * PRICE_PER_LITER;
  const canSave = isDirty && area && (isSubscriptionPaused || selectedCount > 0);

  const handleSave = () => {
    let statusMessage = isSubscriptionPaused 
      ? `Paused from <b>${formatDate(vacationPeriod.start)}</b> to <b>${formatDate(vacationPeriod.end)}</b>`
      : 'Active';
      
    Swal.fire({
      title: 'Subscription Saved!',
      icon: 'success',
      html: `
        <div class="text-left p-4 space-y-2">
          <p><strong>Status:</strong> ${statusMessage}</p>
          <p><strong>Active delivery days this month:</strong> ${selectedCount}</p>
          <p><strong>Quantity:</strong> ${qty} L</p>
          <p><strong>Area:</strong> ${area}</p>
          <p><strong>Address:</strong> ${address}</p>
          <hr class="my-2"/>
          <p><strong>Estimated Bill:</strong> ₹${estimatedBill.toFixed(2)}</p>
        </div>
      `,
      confirmButtonText: 'Great!',
      confirmButtonColor: '#FBBF24',
    }).then(() => {
        setPristineState({
            dates: selectedDates,
            qty: qty,
            area: area,
            address: address,
        });
    });
  };

  const calendarCells = useMemo(() => {
    const first = startOfMonth(monthDate);
    const last  = endOfMonth(monthDate);
    const lead  = first.getDay();
    const total = lead + last.getDate();
    const rows  = Math.ceil(total / 7) * 7;
    const cells = [];
    for (let i = 0; i < rows; i++) {
      const n = i - lead + 1;
      cells.push(n < 1 || n > last.getDate() ? null : new Date(monthDate.getFullYear(), monthDate.getMonth(), n));
    }
    return cells;
  }, [monthDate]);

  return (
    <>
      <PauseSubscriptionModal 
        isOpen={isPauseModalOpen}
        onClose={() => setPauseModalOpen(false)}
        onConfirm={handleConfirmPause}
      />
      <div className="bg-slate-50 min-h-screen">
        <div className="bg-amber-400 h-28">
           <div className="mx-auto max-w-lg px-4 pt-6 flex items-start">
            <button onClick={() => window.history.back()} className="p-2 -ml-2 text-gray-800 hover:bg-black/10 rounded-full">
              <ArrowLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 ml-3 mt-1">
              My Subscription
            </h1>
          </div>
        </div>
        <main className="mx-auto max-w-lg p-4 -mt-16 pb-28">
          <div className="bg-white rounded-2xl shadow-md p-4 flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {isSubscriptionPaused ? <PauseCircleIcon className="h-8 w-8 text-red-500" /> : <PlayCircleIcon className="h-8 w-8 text-green-500" />}
              <div>
                <p className="font-bold text-gray-900">Subscription {isSubscriptionPaused ? 'Paused' : 'Active'}</p>
                 {isSubscriptionPaused ? (
                    <p className="text-xs text-red-600 font-medium">
                        Resumes after {formatDate(vacationPeriod.end)}
                    </p>
                 ) : (
                    <p className="text-xs text-gray-500">{selectedCount} active delivery day{selectedCount === 1 ? '' : 's'}</p>
                 )}
              </div>
            </div>
            <button
              onClick={handlePauseAction}
              className={`rounded-lg px-4 py-2 text-sm font-bold shadow-sm ${isSubscriptionPaused ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
            >
              {isSubscriptionPaused ? 'Resume' : 'Pause'}
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
            <h2 className="font-bold text-gray-900 mb-3">Set Your Delivery Days</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {['Everyday', 'Weekdays', 'Weekends', 'Clear'].map(p => (
                <button
                  key={p}
                  onClick={() => selectPreset(p.toUpperCase())}
                  className={`rounded-lg py-2 text-xs font-semibold transition-colors ${p === 'Clear' ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-amber-100/60 text-amber-900 hover:bg-amber-200/70'}`}
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-800">{monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h3>
              <div className="flex items-center gap-1">
                <button onClick={() => setMonthDate(addMonths(monthDate, -1))} className="p-2 rounded-lg hover:bg-gray-100"><ChevronLeftIcon className="w-5 h-5 text-gray-600" /></button>
                <button onClick={() => setMonthDate(addMonths(monthDate, 1))} className="p-2 rounded-lg hover:bg-gray-100"><ChevronRightIcon className="w-5 h-5 text-gray-600" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center mb-2">
              {WEEKDAYS.map((w, i) => <div key={`${w}-${i}`} className="text-xs font-semibold text-gray-400">{w}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((d, i) => {
                if (!d) return <div key={i} className="h-10" />;
                const k = toKey(d);
                const isSelected = selectedDates.has(k);
                const isToday = isSameDay(d, new Date());
                const isPausedDay = isSubscriptionPaused && d >= vacationPeriod.start && d <= vacationPeriod.end;

                return (
                  <button
                    key={k}
                    onClick={() => onToggleDate(d)}
                    className={`h-10 w-10 rounded-full text-sm font-semibold flex items-center justify-center transition-all duration-150 ease-in-out transform focus:outline-none relative
                      ${ isPausedDay 
                        ? 'bg-red-100 text-red-400 line-through'
                        : isSelected
                        ? 'bg-amber-400 text-gray-900 shadow-md scale-105'
                        : isToday
                        ? 'bg-amber-100 text-amber-900 ring-2 ring-amber-400'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                      }`}
                  >
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 space-y-5 mb-6">
              <h2 className="font-bold text-gray-900">Delivery Details</h2>
              <div>
                  <label className="text-sm font-medium text-gray-700">Quantity per delivery</label>
                  <div className="flex items-center justify-between mt-2">
                      <button onClick={() => setQty(Math.max(0.5, qty - 0.5))} className="p-3 rounded-lg bg-slate-100 hover:bg-slate-200"><MinusIcon className="w-5 h-5 text-gray-700" /></button>
                      <div className="text-2xl font-extrabold text-gray-900">{qty.toFixed(1)} L</div>
                      <button onClick={() => setQty(qty + 0.5)} className="p-3 rounded-lg bg-slate-100 hover:bg-slate-200"><PlusIcon className="w-5 h-5 text-gray-700" /></button>
                  </div>
              </div>
              <div>
                  <label htmlFor="area" className="text-sm font-medium text-gray-700">Service Area</label>
                  <select id="area" value={area} onChange={e => setArea(e.target.value)} className="mt-2 block w-full rounded-lg border-gray-200 bg-slate-50 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm">
                      <option value="">Select your area...</option>
                      {SERVICE_AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
              </div>
              <div>
                  <label htmlFor="address" className="text-sm font-medium text-gray-700">Street Address</label>
                   <input id="address" value={address} onChange={e => setAddress(e.target.value)} placeholder="e.g., Flat 101, Sunshine Apartments" className="mt-2 block w-full rounded-lg border-0 bg-slate-50 py-2.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm" />
              </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-600">Estimated Bill</p>
                  <p className="text-xl font-extrabold text-gray-900">
                      ₹{estimatedBill.toFixed(2)}
                  </p>
                </div>
                <button
                  disabled={!canSave}
                  onClick={handleSave}
                  className="w-full max-w-[200px] text-center rounded-xl bg-amber-400 px-4 py-3.5 text-base font-bold text-gray-900 shadow-sm hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Save Subscription
                </button>
              </div>
          </div>
        </main>
      </div>
    </>
  );
};


// --- Vacation/Pause Modal Component ---
const PauseSubscriptionModal = ({ isOpen, onClose, onConfirm }) => {
  const [monthDate, setMonthDate] = useState(startOfMonth(new Date()));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);

  const handleDateClick = (d) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(d);
      setEndDate(null);
    } else if (d < startDate) {
        setStartDate(d)
    } else {
      setEndDate(d);
    }
  };

  const handleConfirm = () => {
    if(startDate && endDate) {
      onConfirm({ start: startDate, end: endDate });
      onClose();
    }
  };
  
  const resetSelection = () => {
      setStartDate(null);
      setEndDate(null);
  }

  const calendarCells = useMemo(() => {
    const first = startOfMonth(monthDate);
    const last  = endOfMonth(monthDate);
    const lead  = first.getDay();
    const total = lead + last.getDate();
    const rows  = Math.ceil(total / 7) * 7;
    const cells = [];
    for (let i = 0; i < rows; i++) {
      const n = i - lead + 1;
      cells.push(n < 1 || n > last.getDate() ? null : new Date(monthDate.getFullYear(), monthDate.getMonth(), n));
    }
    return cells;
  }, [monthDate]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Pause Deliveries</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><XMarkIcon className="w-6 h-6 text-gray-600"/></button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Select a start and end date for your vacation. Deliveries will be paused during this period.
        </p>

        <div className="bg-gray-50 rounded-lg p-2 mb-4 text-center">
             <p className="text-sm font-semibold text-gray-800">
                {startDate && endDate ? `${formatDate(startDate)} - ${formatDate(endDate)}` : 'Select a date range'}
            </p>
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">{monthDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}</h3>
          <div className="flex items-center gap-1">
            <button onClick={() => setMonthDate(addMonths(monthDate, -1))} className="p-2 rounded-lg hover:bg-gray-100"><ChevronLeftIcon className="w-5 h-5 text-gray-600" /></button>
            <button onClick={() => setMonthDate(addMonths(monthDate, 1))} className="p-2 rounded-lg hover:bg-gray-100"><ChevronRightIcon className="w-5 h-5 text-gray-600" /></button>
          </div>
        </div>
        
        <div className="grid grid-cols-7 text-center mb-2">
            {WEEKDAYS.map((w, i) => <div key={`${w}-${i}`} className="text-xs font-semibold text-gray-400">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
            {calendarCells.map((d, i) => {
              if (!d) return <div key={i} className="h-10" />;
              
              const isStart = isSameDay(d, startDate);
              const isEnd = isSameDay(d, endDate);
              const inRange = startDate && d > startDate && d < (endDate || hoverDate);

              return (
                <button
                  key={toKey(d)}
                  onClick={() => handleDateClick(d)}
                  onMouseEnter={() => startDate && !endDate && setHoverDate(d)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={`h-10 w-10 text-sm font-semibold flex items-center justify-center transition-colors duration-150 ease-in-out
                    ${isStart || isEnd ? 'bg-amber-400 text-gray-900 rounded-full' : ''}
                    ${inRange ? 'bg-amber-100 text-amber-900 rounded-none' : ''}
                    ${!isStart && !isEnd && !inRange ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full' : ''}
                  `}
                >
                  {d.getDate()}
                </button>
              );
            })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
            <button onClick={resetSelection} className="w-full text-center rounded-lg bg-gray-200 px-4 py-3 text-sm font-bold text-gray-800 hover:bg-gray-300">
                Reset
            </button>
            <button 
              disabled={!startDate || !endDate}
              onClick={handleConfirm} 
              className="w-full text-center rounded-lg bg-amber-400 px-4 py-3 text-sm font-bold text-gray-900 shadow-sm hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed">
              Confirm Pause
            </button>
        </div>
      </div>
    </div>
  );
};


// --- Main Page Component (Controller) ---
export default function SubscriptionPage() {
  const [isSubscribed, setIsSubscribed] = useState(false); 
  const [initialPattern, setInitialPattern] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/sweetalert2@11';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubscribe = (pattern) => {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Welcome!',
          text: 'Your new milk subscription has started.',
          icon: 'success',
          confirmButtonText: 'Manage Subscription',
          confirmButtonColor: '#FBBF24',
        }).then(() => {
            setInitialPattern(pattern);
            setIsSubscribed(true);
        });
    } else {
        setInitialPattern(pattern);
        setIsSubscribed(true);
    }
  };

  if (isSubscribed) {
    return <ManageSubscription initialPattern={initialPattern} />;
  }

  return <NewSubscription onSubscribe={handleSubscribe} />;
}