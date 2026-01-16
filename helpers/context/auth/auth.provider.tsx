"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./auth.context";
import api from "@/helpers/api/api";
import { User } from "@/helpers/generated/prisma/client";
import { UserLoginRequest } from "@/helpers/type/user.type";
import { AuthContextType } from "@/helpers/type/auth.type";
import { UserRequest } from "@/helpers/request/user.request";
import { Response } from "@/helpers/type/response.type";

const ACCESS_TOKEN_STORAGE_KEY = "accessToken";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (payload: UserLoginRequest) => {
    setLoading(true);
    try {
      const res: Response = await UserRequest.LOGIN(payload);
      const accessToken = res.data.result.item.accessToken;
      const userData = res.data.result.item.user;

      Cookies.set(ACCESS_TOKEN_STORAGE_KEY, accessToken);
      setUser(userData);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post("/logout");
    } catch {
    } finally {
      Cookies.remove(ACCESS_TOKEN_STORAGE_KEY);
      setUser(null);
      setLoading(false);
      window.location.href = "/login";
    }
  };

  const refreshUser = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.result.item);
    } catch {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
