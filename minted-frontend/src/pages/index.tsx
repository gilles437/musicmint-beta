import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbars/NFTMarketplaceNav';
import Header from '@components/NFTMarketplace/Header';
import Projects from '@components/NFTMarketplace/Projects';
import Features from '@components/NFTMarketplace/Features';
import Process from '@components/NFTMarketplace/Process';
import Collections from '@components/NFTMarketplace/Collections';
import Community from '@components/NFTMarketplace/Community';
import Footer from '@components/NFTMarketplace/Footer';



const Home: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - NFT Marketplace</title>
      </Head>

      <MainLayout>
        <Navbar />
        <Header />
        <main>
          <Projects />
          <Features />
          <Process />
          <Collections />
          <Community />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default Home;
