import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";

import dynamic from "next/dynamic";

const Profile = dynamic(() => import("@/sections/Profile"), {
  ssr: false,
});

const ProfilePage: NextPage = () => {
  useEffect(() => {
    document.body.classList.add("home-style-12");
    return () => document.body.classList.remove("home-style-12");
  }, []);

  return (
    <>
      <Head>
        <title>MintedWave - Profile Page</title>
      </Head>

      <main>
        <Profile />
      </main>
    </>
  );
};

export default ProfilePage;
