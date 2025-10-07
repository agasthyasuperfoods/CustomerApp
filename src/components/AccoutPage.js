// pages/account.js
import React from 'react';
// import Link from 'next/link'; // Removed this line which was causing the error.

import {
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon,
  CreditCardIcon,
  ArrowRightOnRectangleIcon,
  ShoppingBagIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';

const COLORS = {
  bg: '#FFFFFF',
  text: '#212121',
  accent: '#FBBF24',
  muted: '#F3F4F6',
};

function InitialsBadge({ name = 'Jaswanth' }) {
  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div
      className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-xl shadow"
      style={{ backgroundColor: COLORS.accent, color: COLORS.text, border: `3px solid ${COLORS.bg}` }}
    >
      {initials}
    </div>
  );
}

function Row({ href = '#', icon: Icon, label, badge }) {
  // Replaced Next.js <Link> with a standard <a> tag to resolve the error.
  return (
    <a
      href={href}
      className="flex items-center justify-between w-full rounded-2xl px-5 py-4 bg-white shadow-sm hover:shadow transition-shadow"
      style={{ boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
    >
      <div className="flex items-center gap-4">
        <div className="rounded-full p-3" style={{ backgroundColor: COLORS.muted }}>
          <Icon className="w-6 h-6" style={{ color: COLORS.accent }} />
        </div>
        <span className="font-semibold" style={{ color: COLORS.text }}>{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {badge ? (
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ backgroundColor: COLORS.muted, color: COLORS.text }}
          >
            {badge}
          </span>
        ) : null}
        <ChevronRightIcon className="w-5 h-5" style={{ color: '#9CA3AF' }} />
      </div>
    </a>
  );
}

export default function AccountPage() {
  // local demo user (no API)
  const user = {
    name: 'Jaswanth',
    email: 'jaswanth@gmail.com',
    city: 'Hyderabad',
  };

  const menu = [
    { label: 'My Subscriptions', icon: CalendarDaysIcon, href: '/subscription' },
    { label: 'Order History',     icon: ShoppingBagIcon,  href: '/orderhis' },
    { label: 'Saved Addresses',   icon: MapPinIcon,       href: '/savedadd' },
    { label: 'Payment Methods',   icon: CreditCardIcon,   href: '/payments' },
    { label: 'Edit Profile',      icon: PencilSquareIcon, href: '/edit' },
  ];

  return (
    <div className="relative">
      {/* light canvas */}
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: COLORS.muted }} />

      <main className="min-h-screen w-full">
        <div className="mx-auto max-w-md px-4 pt-6 pb-28">
          {/* Header */}
          <section className="flex items-center gap-4 mb-6">
            <InitialsBadge name={user.name} />
            <div>
              <h1 className="text-xl font-extrabold leading-6" style={{ color: COLORS.text }}>{user.name}</h1>
              <p className="text-sm mt-1" style={{ color: '#6B7280' }}>{user.email}</p>
            </div>
          </section>

          {/* Next Delivery */}
          <section
            className="rounded-3xl p-5 mb-6"
            style={{ backgroundColor: COLORS.bg, boxShadow: '0 8px 24px rgba(0,0,0,0.10)' }}
          >
            <h2 className="text-sm font-bold mb-2" style={{ color: COLORS.text }}>Your Next Delivery</h2>
            <div className="flex items-start gap-3">
              <ClockIcon className="w-6 h-6 mt-0.5" style={{ color: COLORS.accent }} />
              <p className="font-semibold" style={{ color: COLORS.text }}>
                Tomorrow, 6 AM – 8 AM in {user.city}
              </p>
            </div>
          </section>

          {/* KPIs - Changed to grid-cols-3 and added Wallet */}
          <section className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Active',  value: '2' },
              { label: 'Coupons', value: '3' },
              { label: 'Wallet',  value: '₹1,250' },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl p-3 text-center"
                style={{ backgroundColor: COLORS.bg, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
              >
                <div className="text-lg font-extrabold" style={{ color: COLORS.text }}>{s.value}</div>
                <div className="text-xs mt-1" style={{ color: '#6B7280' }}>{s.label}</div>
              </div>
            ))}
          </section>

          {/* Menu */}
          <section className="space-y-3">
            {menu.map(item => (
              <Row key={item.label} href={item.href} icon={item.icon} label={item.label} />
            ))}
          </section>

          {/* Support */}
          <section className="mt-6">
            <div
              className="flex items-center gap-3 rounded-2xl p-4"
              style={{ backgroundColor: COLORS.bg, boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}
            >
              <UserCircleIcon className="w-8 h-8" style={{ color: COLORS.text }} />
              <div className="text-sm">
                <div className="font-semibold" style={{ color: COLORS.text }}>Need help?</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Visit Edit Profile to manage details</div>
              </div>
            </div>
          </section>

          {/* Logout */}
          <section className="mt-4">
            <button
              className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 font-bold transition-shadow"
              style={{ backgroundColor: COLORS.accent, color: COLORS.text, boxShadow: '0 6px 16px rgba(0,0,0,0.10)' }}
            >
              <ArrowRightOnRectangleIcon className="w-6 h-6" />
              Logout
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

