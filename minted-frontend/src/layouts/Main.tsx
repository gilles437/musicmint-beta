//= React
import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//= Components
import { Providers } from '@/lib/providers'
import PreLoader from "@/components/PreLoader";
import ScrollToTop from "@/components/ScrollToTop";
//= Scripts
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type Props = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      {/* <Head>
        <link rel="stylesheet" href="/assets/css/lib/bootstrap-icons.css" />
        <link rel="stylesheet" href="/assets/css/lib/all.min.css" />
        <link rel="stylesheet" href="/assets/css/lib/animate.css" />
        <link rel="stylesheet" href="/assets/css/lib/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />

      </Head> */}

      {/* <PreLoader /> */}

      <Providers>
          <Navbar />
          {children}
          <Footer />
      </Providers>

      <ToastContainer
        position="top-right"
        newestOnTop={true}
        autoClose={5000}
        pauseOnHover
        pauseOnFocusLoss
        draggable
      />

      <ScrollToTop />
    </>
  );
};

export default MainLayout;
