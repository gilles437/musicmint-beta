import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@/layouts/Main';
//= Components
import Navbar from '@/components/Navbar';
import Album from '@/components/album';
import Footer from '@/components/Footer';



const AlbumMain: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Albums</title>
      </Head>

      <MainLayout>
        <Navbar />
        <main>
          <Album />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default AlbumMain;
