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
  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>Substrate Wallet Aggregator</title>
  //       <meta name='description' content='A wallet aggregator to select accounts from your different wallets' />
  //       <link rel='icon' href='/favicon.ico' />
  //     </Head>

  //     <main className={styles.main}>
  //       <h1 className={styles.title}>Substrate Wallets</h1>
  //       <p className={styles.description}>Get started by connecting to your favorite wallets</p>
  //       <ConnectContainer />
  //     </main>
  //   </div>
  // );
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>Iteck - NFT Marketplace</title>
      </Head>

      <MainLayout>
        {/* <Navbar /> */}
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
