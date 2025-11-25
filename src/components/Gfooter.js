'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// Import icons from react-icons
import { FiHome, FiCalendar, FiUser } from 'react-icons/fi';

const COLORS = {
  accent: '#FBBF24',
  inactive: '#6B7280',
  textActive: '#212121',
  textInactive: '#6B7280',
};

const HomeIcon = ({ isActive }) => (
  <FiHome size={28} color={isActive ? COLORS.accent : COLORS.inactive} />
);

const SubscriptionIcon = ({ isActive }) => (
  <FiCalendar size={28} color={isActive ? COLORS.accent : COLORS.inactive} />
);

const AccountIcon = ({ isActive }) => (
  <FiUser size={28} color={isActive ? COLORS.accent : COLORS.inactive} />
);

export default function Gfooter() {
  const router = useRouter();
  const [activePath, setActivePath] = useState(router.asPath);

  useEffect(() => {
    const handleRouteChange = (url) => {
      setActivePath(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    setActivePath(router.asPath);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router]);

  const tabs = [
    { label: 'Home',          href: '/Guesthome',      Icon: HomeIcon },
    { label: 'Subscription',  href: '/Gsubscription',  Icon: SubscriptionIcon }, // now calendar!
    { label: 'Account',       href: '/Gaccount',       Icon: AccountIcon },
  ];

  return (
    <footer className="fixed inset-x-0 bottom-0 bg-white/95 backdrop-blur-lg z-50">
      <nav className="max-w-md mx-auto flex justify-around items-center h-20 border-t border-gray-200">
        {tabs.map(({ label, href, Icon }) => {
          const isActive =
            activePath === href ||
            activePath === `${href}/` ||
            (href !== '/' && activePath.startsWith(href));
          return (
            <Link
              key={label}
              href={href}
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
