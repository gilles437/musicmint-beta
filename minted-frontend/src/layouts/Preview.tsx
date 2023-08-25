//= React
import { useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Components
import PreLoader from "@components/PreLoader";
import ScrollToTop from "@components/ScrollToTop";
import Navbar from '@components/Navbars/PreviewNav';

const PreviewLayout = ({ children }) => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/lib/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/lib/all.min.css" />
        <link rel="stylesheet" href="/assets/css/lib/animate.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/landing-preview/css/preview-style.css" />
      </Head>

      <PreLoader />
      <Navbar navbarRef={navbarRef} />
      <main>
        {children}
      </main>
      <ScrollToTop />
      
      <Script strategy="beforeInteractive" src="/landing-preview/js/parallax.min.js"></Script>
    </>
  );
};

export default PreviewLayout;
