import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Add these lines for PWA support */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FBBF24" />
        {/* You can also add an Apple touch icon for iOS home screens */}
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
