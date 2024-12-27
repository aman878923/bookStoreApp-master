import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(() => {
    const savedUser = localStorage.getItem("Users");
    const token = localStorage.getItem("Token");
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = async (loginData) => {
    try {
      const response = await axios.post(
        'https://bookstoreapp-master.onrender.com/user/login', 
        loginData
      );
      
      const { token, user } = response.data;
      
      // Set token in axios headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Store in localStorage
      localStorage.setItem("Token", token);
      localStorage.setItem("Users", JSON.stringify(user));
      
      setAuthUser(user);
      return { success: true, user };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || "Login failed" 
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Users");
    delete axios.defaults.headers.common['Authorization'];
    setAuthUser(null);
  };

  const value = {
    authUser,
    setAuthUser,
    handleLogin,
    handleLogout,
    token: localStorage.getItem("Token")
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};