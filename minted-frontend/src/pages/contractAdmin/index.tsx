import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbar';
// import ContractAdmin from '@components/ContractAdmin';
import Footer from '@components/Footer';

import dynamic from 'next/dynamic'
const ContractAdmin = dynamic(() => import('@components/ContractAdmin'), { ssr: false });

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
          <ContractAdmin />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default Discover;
