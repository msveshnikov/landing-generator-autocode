import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await api.get('/user');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = useCallback(async (email, password) => {
        try {
            setError(null);
            const response = await api.post('/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            await fetchUser();
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response?.data?.error || 'An error occurred during login');
        }
    }, []);

    const register = useCallback(async (email, password) => {
        try {
            setError(null);
            await api.post('/register', { email, password });
            await login(email, password);
        } catch (error) {
            console.error('Registration error:', error);
            setError(error.response?.data?.error || 'An error occurred during registration');
        }
    }, [login]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
    }, []);

    const value = {
        user,
        login,
        logout,
        register,
        loading,
        error,
        isAuthenticated: !!user
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };