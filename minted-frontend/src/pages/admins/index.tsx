import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@/layouts/Main';
//= Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import dynamic from 'next/dynamic'
const ContractAdmin = dynamic(() => import('@/components/Admins'), { ssr: false });

const Admins: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Admins Page</title>
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

export default Admins;
