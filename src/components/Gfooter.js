'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const COLORS = {
  accent: '#FBBF24',
  inactive: '#6B7280',
  textActive: '#212121',
  textInactive: '#6B7280',
};

const HomeIcon = ({ isActive }) => {
  const color = isActive ? COLORS.accent : COLORS.inactive;
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      fill={isActive ? color : 'none'} stroke={color}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  );
};

const SubscriptionIcon = ({ isActive }) => {
  const color = isActive ? COLORS.accent : COLORS.inactive;
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      fill="none" stroke={color}>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
      {isActive && <path d="m9 14 2 2 4-4" strokeWidth="2.5" stroke={color} />}
    </svg>
  );
};

const AccountIcon = ({ isActive }) => {
  const color = isActive ? COLORS.accent : COLORS.inactive;
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      fill="none" stroke={color}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
      {isActive && <circle cx="12" cy="7" r="4" fill={color}></circle>}
    </svg>
  );
};

export default function Gfooter() {
  const router = useRouter();
  const asPath = router?.asPath || '/';

  const tabs = [
    { label: 'Home',          href: '/Guesthome',            Icon: HomeIcon },
    { label: 'Subscription',  href: '/subscription',Icon: SubscriptionIcon },
    { label: 'Account',       href: '/account',     Icon: AccountIcon },
  ];

  return (
    <footer className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur-lg z-50">
      <nav className="max-w-md mx-auto flex justify-around items-center h-20 border-t border-gray-200">
        {tabs.map(({ label, href, Icon }) => {
          // active if exact match OR current path starts with href (handles nested routes & querystrings)
          const isActive =
            asPath === href ||
            asPath === `${href}/` ||
            (href !== '/' && asPath.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
              prefetch
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-col items-center justify-center w-full"
            >
              <Icon isActive={isActive} />
              <span
                className="text-xs font-semibold mt-1 transition-colors duration-200"
                style={{ color: isActive ? COLORS.textActive : COLORS.textInactive }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}