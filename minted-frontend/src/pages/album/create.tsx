import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbar';
import CreateAlbum from '@components/album/create';
import Footer from '@components/Footer';



const CreateAlbumMain: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
      <title>MintedWave - Create Album</title>
      </Head>

      <MainLayout>
        <Navbar />
        <main>
          <CreateAlbum />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default CreateAlbumMain;
