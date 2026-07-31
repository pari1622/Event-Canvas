import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 lg:px-16 py-4 backdrop-blur-md bg-black/30 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="EventCanvas Logo"
            className="h-11 w-11 object-contain"
          />

          <span className="text-xl font-semibold tracking-tight">
            <span className="text-white">EVENT</span>
            <span className="ml-1" style={{ color: "#42362F" }}>
              CANVAS
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition"
          >
            Products
          </Link>

          <Link
            to="/contact"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            to="/quotebag"
            className="px-5 py-2 rounded-lg font-medium text-white transition hover:scale-105"
            style={{ backgroundColor: "#42362F" }}
          >
            Quote Bag
          </Link>

          {!isAuthenticated ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg font-medium text-white transition hover:scale-105"
              style={{ backgroundColor: "#42362F" }}
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/profile"
                className="px-5 py-2 rounded-lg font-medium text-white transition hover:scale-105"
                style={{ backgroundColor: "#42362F" }}
              >
                Profile
              </Link>

              <button
                onClick={logout}
                className="px-5 py-2 rounded-lg font-medium transition hover:scale-105"
                style={{
                  backgroundColor: "#B89D82",
                  color: "#110D0B",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
