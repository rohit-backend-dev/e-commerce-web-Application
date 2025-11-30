import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  });

  // ----------------- LOGIN -----------------
  const login = (data) => {
    if (!data?.token || !data?.email) return;

    const user = { email: data.email, name: data.name };
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(user));

    setCurrentUser(user);
    axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
  };

  // ----------------- LOGOUT -----------------
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    delete axios.defaults.headers.common["Authorization"];
    // optional: redirect to login page
    window.location.href = "/login";
  };

  // ----------------- Helper: decode JWT without extra library -----------------
  const decodeJWT = (token) => {
    try {
      const payload = token.split(".")[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  };

  const isTokenExpired = (token) => {
    const decoded = decodeJWT(token);
    if (!decoded || !decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  };

  // ----------------- INIT: restore user and auto logout on expiry -----------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      if (isTokenExpired(token)) {
        logout();
      } else {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setCurrentUser(JSON.parse(storedUser));

        // auto logout when token actually expires
        const decoded = decodeJWT(token);
        const timeLeft = decoded.exp * 1000 - Date.now();
        const timer = setTimeout(() => logout(), timeLeft);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
