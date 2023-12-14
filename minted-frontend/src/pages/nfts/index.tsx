import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
//= Sections
import { AllAlbums } from "@/sections/Album";

const NFTHome: NextPage = () => {
  useEffect(() => {
    document.body.classList.add("home-style-12");
    return () => document.body.classList.remove("home-style-12");
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - NFTs</title>
      </Head>

      <main>
        <AllAlbums />
      </main>
    </>
  );
};

export default NFTHome;
