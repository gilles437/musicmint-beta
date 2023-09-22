import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbar';
import EditAlbum from '@components/album/edit';
import Footer from '@components/Footer';



const EditAlbumMain: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
      <title>MintedWave - Edit Album</title>
      </Head>

      <MainLayout>
        <Navbar />
        <main>
          <EditAlbum />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default EditAlbumMain;
