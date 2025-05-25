import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate checking login status from async storage or backend
  useEffect(() => {
    const checkAuth = async () => {
      // Simulate loading time (you can replace this with real logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example: Check token from storage (here we assume unauthenticated)
      setIsAuthenticated(false);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
