import { useEffect } from 'react';
import Head from 'next/head';
//= Layout
import PreviewLayout from '@layouts/Preview';
//= Components
import Header from '@components/Preview/Header';
import Features from '@components/Preview/Features';
import Demos from '@components/Preview/Demos';
import InnerPages from '@components/Preview/InnerPages';
import BuyNow from '@components/Preview/BuyNow';
import Portfolio from '@components/Preview/Portfolio';
import Codei from '@components/Preview/Codei';
import BestFeatures from '@components/Preview/BestFeatures';
import Responsive from '@components/Preview/Responsive';
import AllFeatures from '@components/Preview/AllFeatures';
import Testimonials from '@components/Preview/Testimonials';
import CallToAction from '@components/Preview/CallToAction';

const LandingPreview = () => {
  useEffect(() => {
    document.body.classList.add('index-main');
    return () => document.body.classList.remove('index-main');
  }, []);

  return (
    <>
      <Head>
        <title>Iteck - Preview</title>
      </Head>

      <PreviewLayout>
        <Header />
        <Features />
        <Demos />
        <InnerPages />
        <BuyNow />
        <Portfolio />
        <Codei />
        <BestFeatures />
        <Responsive />
        <AllFeatures />
        <Testimonials />
        <CallToAction />
      </PreviewLayout>
    </>
  )
}

export default LandingPreview;