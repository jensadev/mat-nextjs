// src/context/state.js
import { createContext, useContext } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
    const sharedState = {
        edit: {},
        toggleEdit: (meal) => {
            console.log('toggle');
            sharedState.edit = meal;
            console.log(sharedState.edit);
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
