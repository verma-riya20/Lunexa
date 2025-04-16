import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    user: null,
    token: null,
    isLoading: true
  });

  useEffect(() => {
    const initializeAuth = () => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      
      setAuth({
        user: user ? JSON.parse(user) : null,
        token: token || null,
        isLoading: false
      });
    };

    initializeAuth();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setAuth({
      user: userData,
      token,
      isLoading: false
    });
    return { success: true }; // Return instead of navigating
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuth({
      user: null,
      token: null,
      isLoading: false
    });
    return { success: true }; // Return instead of navigating
  };

  return (
    <AuthContext.Provider value={{
      ...auth,
      isAuthenticated: !!auth.user,
      login,
      logout
    }}>
      {!auth.isLoading && children}
    </AuthContext.Provider>
  );
}