/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import '../styles/custom.scss';
import '../styles/globals.scss';

import { AnimatePresence } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import Modal from 'react-modal';
import { ToastProvider } from 'react-toast-notifications';

import CustomToast from '../components/custom-toast';
import { AppWrapper } from '../context/app-context';
// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />;
// }

Modal.setAppElement('#__next');

const MyApp = ({ Component, pageProps, router }) => (
    <AnimatePresence>
        <ToastProvider
            key="toast"
            components={{ Toast: CustomToast }}
            placement="bottom-right"
            autoDismiss
            autoDismissTimeout={4000}>
            <AppWrapper>
                <Component {...pageProps} key={router.route} />
            </AppWrapper>
        </ToastProvider>
    </AnimatePresence>
);

export default appWithTranslation(MyApp);
