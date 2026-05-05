"use client";
import { useState } from "react";
import api from "@/utils/api";

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function register(email: string, password: string) {
    try {
      setLoading(true);
      setError("");
      await api.post("/auth/register", {
        email,
        password,
      });
      return true;
    } catch (error: any) {
      setError(error.response?.data?.message || "Register failed");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    try {
      setLoading(true);
      setError("");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      return true;
    } catch (error: any) {
      setError(error.response?.data?.message || "Register failed");
      return false;
    } finally {
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return { register, login, logout, loading, error };
}
