import { createContext, useContext, useEffect, useState, useRef } from "react";
import axios from "axios";

// 🔥 Base URL
const API = "http://localhost:5000/api/v1";

// 🔥 Axios instance
const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

// 🔁 Interceptor (auto refresh token)
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // ❌ skip refresh for these routes
    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh") &&
      !originalRequest.url.includes("/auth/me")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh");
        return api(originalRequest);
      } catch {
        window.location.href = "/login";
      }
    }

    return Promise.reject(err);
  },
);

// 🧠 Context
const AuthContext = createContext();

// 🧩 Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Check auth on app load
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // 🔐 Login
  const login = async (identifier, password) => {
    await api.post("/auth/login", { identifier, password });

    // get user after login
    const res = await api.get("/auth/me");
    setUser(res.data);
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.log("Logout error:", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🪝 Custom Hook
export const useAuth = () => {
  return useContext(AuthContext);
};
