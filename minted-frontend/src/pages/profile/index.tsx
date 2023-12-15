import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Profile = dynamic(() => import('@/sections/Profile'), {
  ssr: false,
});

const ProfilePage: NextPage = () => {
  const { query } = useRouter();

  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  const address = useMemo(() => {
    if (query?.address) {
      return query.address as string;
    }
    return null;
  }, [query?.address]);

  return (
    <>
      <Head>
        <title>MintedWave - Profile Page</title>
      </Head>

      <main>
        {!!address && <Profile address={address} readonly={true} />}
      </main>
    </>
  );
};

export default ProfilePage;
