import { motion } from 'framer-motion';
import Head from 'next/head';

// import { useEffect, useState } from 'react';
import Footer from './footer';
import Navbar from './navbar';
// import useWindowDimensions from './wd';

export const siteTitle = 'Mat';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  // const { height, width } = useWindowDimensions();

  const rand = (items) => (items[items.length * Math.random() || 0]);

  const colors = ['#FF9F50', '#FF4D3C', '#EF8187', '#C392FF', '#956FDE', '#40B5E0', '#44D19D', '#7292F7', '#77D7DB', '#FEDA3C'];
  const spring = {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  };

  return (
    // <motion.div
    //   className="d-flex h-100 flex-column"
    //   initial={{ x: '20%', opacity: 0 }}
    //   animate={{
    //     x: 0, opacity: 1, backgroundColor: '#fee4d1',
    //   }}
    //   exit={{ x: '20%', opacity: 0 }}
    //   transition={spring} // {{ ease: 'easeOut', duration: 0.2 }}
    // >
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Måltider"
        />
        <meta name="og:title" content={siteTitle} />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://use.typekit.net/yis5dme.css" />
      </Head>
      <Navbar />
      {children}
      <Footer />
      {/* </motion.div> */}
    </>
  );
}
