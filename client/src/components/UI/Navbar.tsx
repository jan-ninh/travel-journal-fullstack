// src\components\UI\Navbar.tsx
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/", { replace: true });
    } catch (error: unknown) {
      const message =
        (error as { message?: string }).message ?? "Logout failed";
      toast.error(message);
    }
  };

  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Travel journal
          <span role="img" aria-labelledby="airplane">
            🛫
          </span>
          <span role="img" aria-labelledby="heart">
            ❤️
          </span>
        </Link>
      </div>

      <div className="flex-none items-center gap-3">
        {user && (
          <div className="hidden sm:block text-sm opacity-80">
            Welcome back {fullName || user.email}
          </div>
        )}

        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {user && (
            <li>
              <NavLink to="/create">Create post</NavLink>
            </li>
          )}

          {!user && (
            <>
              <li>
                <NavLink to="/register">Register</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}

          {user && (
            <li>
              <button type="button" onClick={handleLogout}>
                Log out
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
