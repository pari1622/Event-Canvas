import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { items } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="
          flex
          items-center
          justify-between
          px-8
          lg:px-16
          py-4
          backdrop-blur-md
          bg-black/30
          border-b
          border-white/10
        "
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="EventCanvas Logo"
            className="
              h-11
              w-11
              object-contain
              drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]
            "
          />

          <span className="text-xl font-semibold tracking-tight">
            <span className="text-white">EVENT</span>
            <span
              className="ml-1"
              style={{
                color: "#42362F",
              }}
            >
              CANVAS
            </span>
          </span>
        </Link>

        {/* Navigation */}

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition
            "
          >
            Home
          </Link>

          <Link
            to="/products"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition
            "
          >
            Products
          </Link>

          <Link
            to="/contact"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition
            "
          >
            Contact
          </Link>
        </nav>

        {/* Right Side */}

        <div className="flex items-center gap-3">
          <button
            className="
              transition
              px-5
              py-2
              rounded-lg
              font-medium
              text-white
              shadow-lg
            "
            style={{
              backgroundColor: "#42362F",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#5A4A40";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#42362F";
            }}
          >
            <Link
              to="/quotebag"
              className="
    relative
    px-6
    py-3
    rounded-xl
    font-semibold
    text-white
    transition
    hover:scale-105
  "
              style={{
                backgroundColor: "#42362F",
              }}
            >
              QuoteBag
              {items.length > 0 && (
                <span
                  className="
        absolute
        -top-2
        -right-2
        w-6
        h-6
        rounded-full
        flex
        items-center
        justify-center
        text-xs
        font-bold
      "
                  style={{
                    backgroundColor: "#B89D82",
                    color: "#110D0B",
                  }}
                >
                  {items.length}
                </span>
              )}
            </Link>
          </button>
        </div>
      </div>
    </header>
  );
}
