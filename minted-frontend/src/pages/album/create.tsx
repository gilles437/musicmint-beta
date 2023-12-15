import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
//= Contants
import Routes from '@/constants/routes';
import { useFetchAllAlbums } from '@/hooks/useFetchAllAlbums';
//= Sections
import { CreateAlbum } from '@/sections/Album';

const CreateAlbumMain: NextPage = () => {
  useFetchAllAlbums();

  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Create Album</title>
      </Head>

      <main>
        <section className="projects section-padding style-12">
          <div className="container">
            <div className="mb-3">
              <Link
                href={Routes.ALBUM_OWNED}
                className="d-flex"
                style={{ justifyContent: 'flex-end' }}
              >
                <h4>Back To My Albums</h4>
              </Link>
            </div>
            <CreateAlbum />
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateAlbumMain;
