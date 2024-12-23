import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : undefined
  );

  const handleLogin = async (loginData) => {
    const response = await axios.post('https://bookstoreapp-master.onrender.com/user/login', loginData);
    const { token, user } = response.data;
    localStorage.setItem("Token", token);
    localStorage.setItem("Users", JSON.stringify(user));
    setAuthUser(user);
  };

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, handleLogin]}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);