// src/context/state.js
import { createContext, useContext } from 'react';
import useSWR from 'swr';

import checkLogin from '../lib/utils/checklogin';
import storage from '../lib/utils/storage';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const { data: currentUser } = useSWR('user', storage);
    const isLoggedIn = checkLogin(currentUser);
    const sharedState = {
        isLoggedIn,
        currentUser,
        updated: false,
        toggleUpdate: (e) => {
            sharedState.updated = e;
        },
    };

    return (
        <AppContext.Provider value={sharedState}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
