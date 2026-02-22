"use client";

import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if logged in already (has token)
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      toast.success("Logged in successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      toast.success("Registered successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    toast.success("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
