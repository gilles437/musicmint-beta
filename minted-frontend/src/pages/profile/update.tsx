import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';

import dynamic from 'next/dynamic';
import { useWallets } from '@/contexts/Wallets';

const Profile = dynamic(() => import('@/sections/Profile'), {
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
        {!!walletAddress && (
          <Profile address={walletAddress} readonly={false} />
        )}
      </main>
    </>
  );
};

export default ProfileUpdatePage;
