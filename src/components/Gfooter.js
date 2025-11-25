'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
    { label: 'Subscription',  href: '/Gsubscription',  Icon: SubscriptionIcon },
    { label: 'Account',       href: '/Gaccount',       Icon: AccountIcon },
  ];

  return (
    <footer
      className="
        fixed inset-x-0 bottom-0 z-50
        bg-white shadow-lg
        flex justify-center
        rounded-tl-[50px] rounded-tr-[50px]
        transition-all
      "
      style={{
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        // No border, just shadow, overrides any tailwind border
        border: 'none',
      }}
    >
      <nav className="max-w-md mx-auto w-full flex justify-around items-center h-20">
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
              className="
                flex flex-col items-center justify-center w-full
                py-1
                transition-all
              "
              style={{
                textDecoration: 'none',
                border: 'none', // remove bottom border
              }}
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
