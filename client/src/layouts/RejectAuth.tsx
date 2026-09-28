// src\layouts\RejectAuth.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/contexts";

type LocationState = { returnTo?: string };

const RejectAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-4">Loading...</div>;

  if (user) {
    const state = location.state as LocationState | null;
    return <Navigate to={state?.returnTo ?? "/"} replace />;
  }

  return <Outlet />;
};

export default RejectAuth;
