import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Fetch user
  const fetchUser = async (showLoader = true) => {
    if (showLoader) setLoading(true);

    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log(err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // ✅ INIT AUTH (🔥 MOST IMPORTANT FIX)
  useEffect(() => {
    const initAuth = async () => {
      try {
        await api.post("/auth/refresh-token"); // first try refresh
      } catch (e) {
        console.log(e);
        // ignore if no refresh token
      }

      await fetchUser(false); // then fetch user (no loader flicker)
      setLoading(false);
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
