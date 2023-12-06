import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
//= Sections
import { CreateAlbum } from "@/sections/Album";

const CreateAlbumMain: NextPage = () => {
  useEffect(() => {
    document.body.classList.add("home-style-12");
    return () => document.body.classList.remove("home-style-12");
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Create Album</title>
      </Head>

      <main>
        <CreateAlbum />
      </main>
    </>
  );
};

export default CreateAlbumMain;
