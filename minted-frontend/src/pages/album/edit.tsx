import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
//=Hooks
import { useFindAlbumById } from '@/hooks/useFindAlbumById';
//= Sections
import { EditAlbum } from '@/sections/Album';
import CreateSong from '@/sections/Song/CreateSong';
import AlbumSongs from '@/sections/Song/AlbumSongs';

const EditAlbumMain: NextPage = () => {
  const { query } = useRouter();
  const [albumId, setAlbumId] = useState<string>('');
  const album = useFindAlbumById(albumId);

  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  useEffect(() => {
    if (query?.id) {
      setAlbumId(query?.id as string);
    }
  }, [query?.id]);

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
                href="/album/owned"
                className="d-flex"
                style={{ justifyContent: 'flex-end' }}
              >
                <h4>Back to My Album</h4>
              </Link>
            </div>

            {!!album && (
              <>
                <EditAlbum album={album} />
                <CreateSong album={album} />
                <AlbumSongs album={album}  />
              </>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default EditAlbumMain;
