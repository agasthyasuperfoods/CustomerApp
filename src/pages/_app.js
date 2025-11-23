import '@/styles/globals.css';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // Add this useEffect to register the service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }
  }, []);

  return <Component {...pageProps} />;
}
