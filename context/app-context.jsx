// src/context/state.js
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const sharedState = {
        updated: false,
        toggleUpdate: (e) => {
            sharedState.updated = e;
        }
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
