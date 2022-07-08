import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const value = useAuthProvider();
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    } 
    return context
};

const token = sessionStorage.getItem('accessToken');

const useAuthProvider = () => {
    const [loggedIn, setLoggedIn] = useState(token ? true : false);

    return { loggedIn, setLoggedIn }
}

export default useAuthContext;