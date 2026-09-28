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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-pill${isActive ? " nav-pill-active" : ""}`;

  return (
    <header className="app-header">
      <nav className="app-navbar" aria-label="Main navigation">
        <Link to="/" className="brand" aria-label="Travel Journal home">
          <span className="brand-mark" aria-hidden="true">
            TJ
          </span>
          <span className="brand-copy">
            <span className="brand-title">Travel Journal</span>
            <span className="brand-subtitle">Stories worth remembering</span>
          </span>
        </Link>

        <div className="nav-right">
          {user && (
            <div className="welcome-copy">
              <span className="welcome-label">Welcome back</span>
              <strong>{fullName || user.email}</strong>
            </div>
          )}

          <div className="nav-actions">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>

            {user && (
              <NavLink to="/create" className={navLinkClass}>
                Create post
              </NavLink>
            )}

            {!user && (
              <>
                <NavLink to="/register" className={navLinkClass}>
                  Register
                </NavLink>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
              </>
            )}

            {user && (
              <button
                type="button"
                className="nav-pill nav-pill-logout"
                onClick={handleLogout}
              >
                Log out
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
