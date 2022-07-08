import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from '../context/authContext';

const AuthRoute = ({ children }) => {
    const { loggedIn } = useAuthContext();
    return loggedIn ? children : <Navigate to="/login" />
};

export default AuthRoute;
