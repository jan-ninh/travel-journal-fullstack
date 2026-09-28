// src\contexts\AuthContext.tsx
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  login as apiLogin,
  logout as apiLogout,
  me as apiMe,
  register as apiRegister,
} from "@/data";

type AuthUser = {
  _id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  roles: string[];
};

type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  refreshMe: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshMe = async () => {
    try {
      const data = await apiMe(); // expected: { message: string, user: ... }
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await refreshMe();
      setLoading(false);
    })();
  }, []);

  const login = async (payload: LoginPayload) => {
    await apiLogin(payload);
    await refreshMe();
  };

  const register = async (payload: RegisterPayload) => {
    await apiRegister(payload);
    await refreshMe();
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({ user, loading, refreshMe, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
