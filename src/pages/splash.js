import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Splash() {
  const router = useRouter();
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setZoomIn(true), 1000);
    const timer2 = setTimeout(() => {
      const isLoggedIn = localStorage.getItem('userToken');
      router.push(isLoggedIn ? '/home' : '/login');
    }, 1850);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [router]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-opacity duration-500 ${
        zoomIn ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        overflow: 'hidden',
        backgroundColor: '#FFF8E1'
      }}
    >
      {/* Animated Logo */}
      <div
        className={`transition-transform duration-800 ease-in-out ${
          zoomIn ? 'scale-[13] opacity-90' : 'scale-100 opacity-100'
        }`}
        style={{
          willChange: 'transform,opacity',
          width: '160px',
          height: '110px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image
          src="/logo.png"
          alt="Agasthya Logo"
          width={160}
          height={110}
          priority
          style={{ height: 'auto' }}
        />
      </div>
    </div>
  );
}
