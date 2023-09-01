import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbar';
import Projects from '@components/Discover/Projects';
import Footer from '@components/Footer';



const Discover: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>Discover NFTs - NFT Marketplace</title>
      </Head>

      <MainLayout>
        <Navbar />
        <main>
          <Projects />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default Discover;
