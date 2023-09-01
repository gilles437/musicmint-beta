import { useEffect, useRef } from 'react';
import Head from 'next/head';
//= Scripts
import navbarScrollEffect from "@common/navbarScrollEffect";
//= Layout
import MainLayout from '@layouts/Main';
//= Components
import Navbar from '@components/Navbar';
import BlogSlider from '@components/Blog/BlogSlider';
import AllNews from '@components/SinglePost/AllNews';
import PopularPosts from '@components/SinglePost/PopularPosts';
import Footer from '@components/Footer';


const PageSinglePost5 = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    navbarScrollEffect(navbarRef.current, true);
  }, [navbarRef]);

  return (
    <>
      <Head>
        <title>Iteck - Single Post 5</title>
      </Head>

      <MainLayout>
        <Navbar />
        <main className="blog-page style-5 color-5">
          <BlogSlider />
          <AllNews />
          <PopularPosts />
          <PopularPosts />
        </main>
        <Footer />
      </MainLayout>
    </>
  )
}

export default PageSinglePost5;