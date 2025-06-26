// src/hooks/useAuthContext.js
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
// import { AuthContext } from '../context/AuthContext.jsx'; // <-- FIX: Added .jsx extension

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider');
    }
    return context;
};