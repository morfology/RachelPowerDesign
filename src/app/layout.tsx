// Globally used layout.tsx
import React from 'react';

import SearchModal from "@/components/SearchModal";
import TwSizeIndicator from "@/helpers/TwSizeIndicator"; // debug indicator
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";
import Script from 'next/script';
import "@/styles/main.css";
import { defaultMetadata } from '@/lib/pageMeta';
import config from "@/config/config.json";

export const metadata = defaultMetadata;

export default function RootLayout({children}: {children: React.ReactNode}) {

  // import google font css
  // const pf = theme.fonts.font_family.primary;
  // const sf = theme.fonts.font_family.secondary;

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* responsive meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />

        {/* google font css */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* <link
          href={`https://fonts.googleapis.com/css2?family=${pf}${
            sf ? "&family=" + sf : ""
          }&display=swap`}
          rel="stylesheet"
        /> */}

        {/* @MP Bauen - googlefonts tbd */}
        <link
          href={`https://fonts.googleapis.com/css?family=Open%20Sans|Oswald:300,400,800`}
          rel="stylesheet"
        />
        <link href='https://fonts.googleapis.com/css?family=Didact Gothic' rel='stylesheet'></link>

      </head>

      <body suppressHydrationWarning={true}>
        <TwSizeIndicator />
        <Providers>
          <Header />
          <SearchModal />
          <main>{children}</main>
          <Footer />
        </Providers>

        {/* Google Analytics. Using nextjs script loading we can load in <body>*/}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-TQ9WZXP0X9"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: 
            `window.dataLayer = window.dataLayer || [];` +
            `function gtag(){dataLayer.push(arguments);}` +
            `gtag('js', new Date());` +
            `gtag('config', 'G-TQ9WZXP0X9');`,
          }}
        />

      </body>
    </html>
  );
}
