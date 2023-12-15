import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
//=Constants
import Routes from '@/constants/routes';
//=Hooks
import { useQueryAlbum } from '@/hooks/useQueryAlbum';
//= Sections
import AlbumDetailSection from '@/sections/Album/AlbumDetail';
import AlbumSongs from '@/sections/Song/AlbumSongs';
import { useFetchAllAlbums } from '@/hooks/useFetchAllAlbums';
import AboutArtist from '@/components/Admin/AboutArtist';

const AlbumDetailPage: NextPage = () => {
  const album = useQueryAlbum();
  useFetchAllAlbums();

  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Album</title>
      </Head>

      <main>
        <section className="projects section-padding style-12">
          <div className="container">
            {/* <div className="mb-3">
              <Link
                href={Routes.ALBUM_OWNED}
                className="d-flex"
                style={{ justifyContent: 'flex-end' }}
              >
                <h4>Back to All Albums</h4>
              </Link>
            </div> */}

            {!!album && (
              <>
                <AlbumDetailSection album={album} />
                
                <h1 style={{ marginTop: 20 }}>Songs</h1>
                <AlbumSongs album={album} />

                <h1 style={{ marginTop: 20 }}>About Artist</h1>
                <AboutArtist address={album.from} />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AlbumDetailPage;
