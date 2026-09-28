// src\layouts\RequireAuth.tsx
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/contexts";

type LocationState = { returnTo?: string };

const RequireAuth = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-4">Loading...</div>;

  if (!user) {
    const returnTo = location.pathname + location.search;
    return (
      <Navigate
        to="/login"
        replace
        state={{ returnTo } satisfies LocationState}
      />
    );
  }

  return <Outlet />;
};

export default RequireAuth;
