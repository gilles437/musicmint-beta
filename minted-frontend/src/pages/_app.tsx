import type { AppProps } from 'next/app';
import React from "react";
import Script from "next/script";
import Head from "next/head";
import "../styles/preloader.css";
import "../styles/globals.css";
import "../styles/navbar.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Iteck</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>

      <Component {...pageProps} />

      <Script strategy="beforeInteractive" src="/assets/js/lib/pace.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/bootstrap.bundle.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/mixitup.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/wow.min.js"></Script>
      <Script strategy="beforeInteractive" src="/assets/js/lib/html5shiv.min.js"></Script>
      <Script strategy="lazyOnload" src="/assets/js/main.js"></Script>
    </>
  );
}

export default MyApp;
