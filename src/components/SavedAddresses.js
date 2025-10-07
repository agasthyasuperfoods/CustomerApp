import React from "react";
import { useRouter } from 'next/router';

export default function SavedAddresses({
  addresses = [],
  onAdd = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onMakeDefault = () => {},
}) {
  const router = useRouter();
  const savedCount = addresses.length;
  const defaultCount = addresses.filter((a) => a.isDefault).length;

  // Reusable Address Card component for a cleaner look
  const AddressCard = ({ address }) => (
    <article className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-4 transition-transform duration-300 hover:scale-[1.02] hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        {/* Left side content */}
        <div className="flex items-start gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-amber-100/60 text-amber-600 flex items-center justify-center shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M3 9l9-6 9 6v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9z" />
              <path d="M9 22V12h6v10" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold text-gray-800">{address.label || "Address"}</span>
              {address.isDefault && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                  Default
                </span>
              )}
            </div>
            {address.name && <p className="mt-1 text-sm text-gray-600">{address.name}</p>}
            <p className="text-sm text-gray-600">
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}
            </p>
            <p className="text-sm text-gray-600">
              {address.city}, {address.state} {address.zip}
            </p>
            {address.phone && <p className="text-sm text-gray-500 mt-1.5 font-mono tracking-tighter">📞 {address.phone}</p>}
          </div>
        </div>

        {/* Right side action buttons */}
        <div className="flex flex-col items-end gap-2">
          {!address.isDefault && (
            <button onClick={() => onMakeDefault(address)} className="h-8 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors">
              Set Default
            </button>
          )}
          <div className="flex gap-2">
             <button onClick={() => onEdit(address)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
             <button onClick={() => onDelete(address)} className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- New Header --- */}
      <header className="bg-amber-400 pb-10">
        <div className="max-w-screen-md mx-auto px-4 pt-4">
          <div className="flex items-center justify-between">
            <button aria-label="Back" onClick={() => router.back()} className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:bg-black/10">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-white tracking-tight">Saved Addresses</h1>
            <span className="w-9" />
          </div>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto px-4 -mt-10">
        {/* --- New Stat Cards --- */}
        <section className="grid grid-cols-2 gap-3.5 mb-6">
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100/60 flex items-center justify-center text-amber-600 font-bold text-lg">{savedCount}</div>
            <div className="text-sm font-semibold text-gray-600">Saved</div>
          </div>
          <div className="rounded-xl bg-white shadow-sm ring-1 ring-black/5 p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100/60 flex items-center justify-center text-blue-600 font-bold text-lg">{defaultCount}</div>
            <div className="text-sm font-semibold text-gray-600">Default</div>
          </div>
        </section>

        {/* --- Main Content: Shows Addresses or Empty State --- */}
        {addresses.length > 0 ? (
          <section className="space-y-4">
             <button
                onClick={onAdd}
                className="w-full h-14 rounded-xl bg-amber-400 text-white shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2.5 hover:bg-amber-500 transition-all duration-300 transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span className="font-semibold text-base">Add New Address</span>
              </button>
            {addresses.map((a) => <AddressCard key={a.id} address={a} />)}
          </section>
        ) : (
          // --- New Empty State ---
          <section className="text-center rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-8 pt-10">
            <div className="flex justify-center mb-5">
               <div className="h-24 w-24 rounded-full bg-amber-100/60 flex items-center justify-center">
                 <svg className="text-amber-500" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
               </div>
            </div>
            <h2 className="text-lg font-bold text-gray-800">No saved addresses yet</h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xs mx-auto">Add an address for fast delivery of fresh dairy products right to your doorstep.</p>
            <button
              onClick={onAdd}
              className="mt-6 h-12 px-8 rounded-full bg-amber-400 text-white font-semibold shadow-lg shadow-amber-500/30 hover:bg-amber-500 transition-all duration-300 transform hover:scale-105"
            >
              Add Your First Address
            </button>
          </section>
        )}
      </main>
    </div>
  );
}