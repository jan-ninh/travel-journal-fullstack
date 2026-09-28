import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import { Navbar } from "@/components";
import "react-toastify/dist/ReactToastify.css";

const RootLayout = () => {
  return (
    <div className="app-shell">
      <ToastContainer position="bottom-left" autoClose={1500} theme="dark" />
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer" aria-label="Copyright">
        <span>© 2026 Jan Ninh</span>
      </footer>
    </div>
  );
};

export default RootLayout;
