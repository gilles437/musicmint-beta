import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
//=Constants
import Routes from '@/constants/routes';
//=Hooks
import { useQueryAlbum } from '@/hooks/useQueryAlbum';
//= Sections
import { EditAlbum } from '@/sections/Album';
import CreateSong from '@/sections/Song/CreateSong';
import AlbumSongs from '@/sections/Song/AlbumSongs';

const EditAlbumPage: NextPage = () => {
  const album = useQueryAlbum();

  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Edit Album</title>
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

            {!!album && (
              <>
                <EditAlbum album={album} />
                <CreateSong album={album} />
                <AlbumSongs album={album} editable />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default EditAlbumPage;
