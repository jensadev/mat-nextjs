// import Head from 'next/head';

// import React from 'react';
// import useSWR from 'swr';
// import styles from '../styles/Home.module.css';

// import fetcher from '../lib/utils/fetcher';

// export default function Home () {
//   const { data: fetchedArticles } = useSWR(
//     `${process.env.apiUrl}/meals`,
//     fetcher,
//     {
//       initialArticles,
//     },
//   );
//   // const { data: fetchedTags } = useSWR(`${SERVER_BASE_URL}/tags`, fetcher, {
//   //   initialTags,
//   // });

//   const { articles, articlesCount } = fetchedArticles || initialArticles;
//   // const { tags } = fetchedTags || initialTags;

//   return (
//     <div className="home-page">
//       <Banner />

//       <div className="container page">
//         <div className="row">
//           <MainView articles={articles} articlesCount={articlesCount} />
//           <div className="col-md-3">
//             <div className="sidebar">
//               <p>Popular Tags</p>
//               <Tags tags={tags} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// Home.getInitialProps = async () => {
//   const articles = await fetcher(`${SERVER_BASE_URL}/articles`);
//   const tags = await fetcher(`${SERVER_BASE_URL}/tags`);
//   return { articles, tags };
// };

// export default Home;

// export default function Home() {
//   return (
//     <div className={styles.container}>
//       <Head>
//         <title>Create Next App</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className={styles.main}>
//         <h1 className={styles.title}>
//           Welcome to
//           {' '}
//           <a href="https://nextjs.org">Next.js!</a>
//         </h1>

//         <p className={styles.description}>
//           Get started by editing
//           {' '}
//           <code className={styles.code}>pages/index.js</code>
//         </p>

//         <div className={styles.grid}>
//           <a href="https://nextjs.org/docs" className={styles.card}>
//             <h3>Documentation &rarr;</h3>
//             <p>Find in-depth information about Next.js features and API.</p>
//           </a>

//           <a href="https://nextjs.org/learn" className={styles.card}>
//             <h3>Learn &rarr;</h3>
//             <p>Learn about Next.js in an interactive course with quizzes!</p>
//           </a>

//           <a
//             href="https://github.com/vercel/next.js/tree/master/examples"
//             className={styles.card}
//           >
//             <h3>Examples &rarr;</h3>
//             <p>Discover and deploy boilerplate example Next.js projects.</p>
//           </a>

//           <a
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//             className={styles.card}
//           >
//             <h3>Deploy &rarr;</h3>
//             <p>
//               Instantly deploy your Next.js site to a public URL with Vercel.
//             </p>
//           </a>
//         </div>
//       </main>

//       <footer className={styles.footer}>
//         <a
//           href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Powered by
//           {' '}
//           <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
//         </a>
//       </footer>
//     </div>
//   );
// }

import Head from 'next/head';
// import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Layout, { siteTitle } from '../components/layout';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...await serverSideTranslations(locale, ['common', 'navbar']),
    },
  };
}

export default function Home() {
  const { t } = useTranslation('common');
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <h1>{t('meal')}</h1>
      </section>
    </Layout>
  );
}
