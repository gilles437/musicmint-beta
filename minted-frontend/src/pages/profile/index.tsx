import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import ProfileTab from '@/sections/Profile/ProfileTab';
import AlbumReleases from '@/sections/Profile/AlbumReleases';

const AboutArtist = dynamic(() => import('@/sections/Profile/AboutArtist'), {
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
        <section className="projects section-padding style-12">
          <div className="container">
            {!!address && (
              <ProfileTab
                aboutTab={<AboutArtist address={address} readonly={true} />}
                releaseTab={<AlbumReleases address={address} />}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
