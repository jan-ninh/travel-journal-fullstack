// src\data\auth.ts
const AUTH_URL = import.meta.env.VITE_APP_AUTH_SERVER_URL as string | undefined;
if (!AUTH_URL) throw new Error("VITE_APP_AUTH_SERVER_URL missing");

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export async function register(payload: RegisterPayload): Promise<void> {
  const res = await fetch(`${AUTH_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Register failed");
  }
}

export async function login(payload: LoginPayload): Promise<void> {
  const res = await fetch(`${AUTH_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Login failed");
  }
}

export async function me(): Promise<any> {
  const res = await fetch(`${AUTH_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Not logged in");
  }

  return res.json();
}

export async function logout(): Promise<void> {
  const res = await fetch(`${AUTH_URL}/auth/logout`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? "Logout failed");
  }
}
