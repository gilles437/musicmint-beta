import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbar';
import FileUploader from '@components/FileUploader/FileUploader';
import Footer from '@components/Footer';



const FileUpload: NextPage = () => {
  useEffect(() => {
    document.body.classList.add('home-style-12');
    return () => document.body.classList.remove('home-style-12');
  }, []);

  return (
    <>
      <Head>
        <title>File Upload</title>
      </Head>

      <MainLayout>
        <Navbar />
        <main>
          <FileUploader />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
};

export default FileUpload;
