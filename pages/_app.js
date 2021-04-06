/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import '../styles/custom.scss';
import '../styles/globals.css';

import { appWithTranslation } from 'next-i18next';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default appWithTranslation(MyApp);
