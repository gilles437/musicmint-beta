import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect } from 'react';
// Constants
import Routes from '@/constants/routes';
//= Sections
import { MyNFTs } from '@/sections/Token';

const MyTokensPage: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - My NFTs</title>
      </Head>

      <main>
        <section className="projects section-padding style-12">
          <div className="container">
            {/* <div className="mb-3">
              <Link
                href={Routes.ALBUM_ROOT}
                className="d-flex"
                style={{ justifyContent: 'flex-end' }}
              >
                <h4>Back to All Albums</h4>
              </Link>
            </div> */}
            <MyNFTs />
          </div>
        </section>
      </main>
    </>
  );
};

export default MyTokensPage;
