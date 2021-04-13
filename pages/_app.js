/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import '../styles/custom.scss';
import '../styles/globals.scss';

import { AnimatePresence } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

const MyApp = ({ Component, pageProps, router }) => (
  <AnimatePresence exitBeforeEnter>
    <Component {...pageProps} key={router.route} />
  </AnimatePresence>
);

export default appWithTranslation(MyApp);
