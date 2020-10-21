import React, { useContext, useState, useEffect } from "react";
import AuthService from "../services/authService";

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    AuthService.getCurrentUser().username
  );

  function signup(username, email, password) {
    return AuthService.register(username, email, password);
  }

  function login(username, password) {
    return AuthService.login(username, password);
  }

  function logout() {
    return AuthService.logout();
  }

  useEffect(() => {}, []);

  const value = {
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
