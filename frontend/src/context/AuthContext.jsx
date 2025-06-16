import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext({
    token: null,
    login: async () => { },
    register: async () => { },
    logout: () => { },
    isAuthenticated: false,
});
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    useEffect(() => {
        if (token)
            localStorage.setItem('token', token);
        else
            localStorage.removeItem('token');
    }, [token]);
    const login = async (email, password) => {
        const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        setToken(res.data.token);
    };
    const register = async (name, email, password) => {
        await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
        await login(email, password);
    };
    const logout = () => setToken(null);
    return (<AuthContext.Provider value={{ token, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>);
};
