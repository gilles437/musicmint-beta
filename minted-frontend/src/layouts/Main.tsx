//= React
import { useEffect } from 'react';
import Head from "next/head";
import Script from 'next/script';
//= Components
import PreLoader from "@components/PreLoader";
import ScrollToTop from "@components/ScrollToTop";
//= Scripts
import fixStylesheetsOrder from "@common/fixStylesheetsOrder";
type Props = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  // useEffect(() => {
  //   fixStylesheetsOrder(isRTL);
  // }, [isRTL]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/lib/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/css/lib/all.min.css" />
        <link rel="stylesheet" href="/assets/css/lib/animate.css" />
        {/* {
          isRTL ? 
          <link rel="stylesheet" href="/assets/css/lib/bootstrap.rtl.min.css" />
          : 
          <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
        } */}
          <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />

        <link rel="stylesheet" href="/assets/css/style.css" />
        {/* {
          isRTL ? <link rel="stylesheet" href="/assets/css/rtl_style.css" /> : null
        } */}
      </Head>

      <PreLoader />
      { children }
      <ScrollToTop />
    </>
  );
};

export default MainLayout;
