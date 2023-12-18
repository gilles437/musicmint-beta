import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useWallets } from '@/contexts/Wallets';

const UpdateProfile = dynamic(() => import('@/sections/Profile/UpdateProfile'), {
  ssr: false,
});

const ProfileUpdatePage: NextPage = () => {
  const { walletAddress } = useWallets();

  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Profile Page</title>
      </Head>

      <main>
        <section className="projects section-padding style-12">
          <div className="container">
            {!!walletAddress && (
              <UpdateProfile address={walletAddress} />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfileUpdatePage;
