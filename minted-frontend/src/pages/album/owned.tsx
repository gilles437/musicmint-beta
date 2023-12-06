import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
//= Sections
import { MyAlbums } from "@/sections/Album";

const AlbumMain: NextPage = () => {
  useEffect(() => {
    document.body.classList.add("home-style-12");
    return () => document.body.classList.remove("home-style-12");
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - My Albums</title>
      </Head>

      <main>
        <MyAlbums />
      </main>
    </>
  );
};

export default AlbumMain;
