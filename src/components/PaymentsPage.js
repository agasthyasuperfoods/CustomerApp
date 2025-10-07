// pages/payments/index.js
'use client';

import React, { useState } from 'react';
// Removed 'next/router' as it was causing an error. Using standard web navigation instead.
import { ArrowLeftIcon, PlusIcon, EllipsisVerticalIcon, BanknotesIcon } from '@heroicons/react/24/outline';

// --- SVG Icons for Payment Brands ---
const VisaIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" fill="none">
    <path d="M25.8 0.600098H33.3L26.1 23.4001H18.6L25.8 0.600098Z" fill="#26368E" />
    <path d="M13.2 0.600098L6 23.4001H13.8L15.3 18.2001H22.9L24 23.4001H32L24.6 0.600098H13.2ZM19.2 6.8001L21.7 13.9001H16.6L19.2 6.8001Z" fill="#4B69E2" />
    <path d="M12.9 0.600098L7.6 15.3001L6.7 11.1001C6 8.3001 3.8 6.4001 1.2 5.5001L0.8 5.3001L1.1 0.600098H6.5C8.8 0.600098 11.2 2.3001 12.1 4.7001L12.9 0.600098Z" fill="#4B69E2" />
  </svg>
);

const MasterCardIcon = () => (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#EA001B"/>
    <circle cx="26" cy="12" r="12" fill="#F79E1B" fillOpacity="0.8"/>
  </svg>
);

const UpiIcon = () => (
    <svg width="38" height="24" viewBox="0 0 62 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.163 0.509766H2.62695V15.5818H10.163V0.509766Z" fill="#E47129"/>
        <path d="M10.6359 15.5818H2.15527V22.943H10.6359V15.5818Z" fill="#2367B1"/>
        <path d="M10.6359 0.509766H2.15527V7.87095H10.6359V0.509766Z" fill="#40A552"/>
        <path d="M21.2188 0.509766V15.5818H28.438C32.181 15.5818 35.191 12.8397 35.191 9.04576C35.191 5.25181 32.181 2.50977 28.438 2.50977H23.1538V0.509766H21.2188ZM28.2882 13.5818H23.1538V4.50977H28.2882C31.0662 4.50977 33.2562 6.51379 33.2562 9.04576C33.2562 11.5777 31.0662 13.5818 28.2882 13.5818Z" fill="#676767"/>
        <path d="M52.3486 0.509766L47.5146 15.5818H54.4986L59.3326 0.509766H52.3486ZM42.2746 0.509766V15.5818H44.2096V0.509766H42.2746Z" fill="#676767"/>
        <path d="M59.9043 0.509766L56.7003 9.77777L53.4963 0.509766H52.4163L56.1243 11.0558L55.5723 12.5818L54.4983 15.5818H55.8603L62.7363 0.509766H59.9043Z" fill="#E47129"/>
    </svg>
);


export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', type: 'card', brand: 'visa', last4: '4242', expiry: '08/26', isDefault: true },
    { id: '2', type: 'card', brand: 'mastercard', last4: '5555', expiry: '11/25', isDefault: false },
    { id: '3', type: 'upi', vpa: 'jane.doe@okhdfcbank', isDefault: false },
  ]);

  const setDefault = (id) => {
    setPaymentMethods(
      paymentMethods.map(pm => ({ ...pm, isDefault: pm.id === id }))
    );
  };

  const removeMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  const getBrandIcon = (brand) => {
    if (brand === 'visa') return <VisaIcon />;
    if (brand === 'mastercard') return <MasterCardIcon />;
    return null;
  };
  
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* --- Header --- */}
      <div className="bg-amber-400 h-28">
         <div className="mx-auto max-w-lg px-4 pt-6 flex items-start">
          <a href="/account" className="p-2 -ml-2 text-gray-800 hover:bg-black/10 rounded-full">
            <ArrowLeftIcon className="h-6 w-6" />
            <span className="sr-only">Back</span>
          </a>
          <h1 className="text-xl font-bold text-gray-900 ml-3 mt-1">
            Payment Methods
          </h1>
        </div>
      </div>

      <main className="mx-auto max-w-lg p-4 -mt-12">
        {/* --- Wallet Card --- */}
        <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-500">Wallet Balance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹1,250.00</p>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-amber-100/60 px-4 py-2.5 text-sm font-bold text-amber-900 shadow-sm hover:bg-amber-200/70">
                <BanknotesIcon className="h-5 w-5"/>
                Top Up
            </button>
        </div>

        {/* --- Saved Methods Section --- */}
        <div className="mt-8">
          <h2 className="text-base font-bold text-gray-800 px-1">Saved Methods</h2>
          <div className="mt-4 space-y-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center">
                <div className="flex-shrink-0">
                  {method.type === 'card' ? getBrandIcon(method.brand) : <UpiIcon />}
                </div>
                <div className="ml-4 flex-grow">
                    {method.type === 'card' ? (
                        <>
                            <p className="font-semibold text-gray-900">•••• {method.last4}</p>
                            <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                        </>
                    ) : (
                        <p className="font-semibold text-gray-900">{method.vpa}</p>
                    )}
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                  {/* Simple Dropdown Menu Placeholder */}
                   <div className="relative">
                      <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                       {/* You can build a full dropdown menu here that calls setDefault(method.id) and removeMethod(method.id) */}
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Add New Method Button --- */}
        <div className="mt-8">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-4 text-base font-bold text-gray-700 hover:border-amber-400 hover:text-amber-600">
                <PlusIcon className="h-5 w-5"/>
                Add New Card or UPI
            </button>
        </div>
      </main>
    </div>
  );
}
