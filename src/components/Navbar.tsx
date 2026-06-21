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
          py-5
          backdrop-blur-md
          bg-black/30
          border-b
          border-white/10
        "
      >
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-tight">
          EVENT
          <span className="text-blue-500"> CANVAS</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/products"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            Products
          </Link>

          <Link
            to="/services"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            Services
          </Link>

          <Link
            to="/how-it-works"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            How It Works
          </Link>

          <Link
            to="/about"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            About
          </Link>

          <Link
            to="/contact"
            className="
              text-sm
              uppercase
              tracking-widest
              text-white/60
              hover:text-white
              transition-colors
            "
          >
            Contact
          </Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="
              bg-blue-500
              hover:bg-blue-600
              transition
              px-5
              py-2
              rounded-lg
              font-medium
            "
          >
            QuoteBag ({items.length})
          </Link>

          <Link
            to="/contact"
            className="
              hidden
              md:block
              bg-white/10
              hover:bg-white/20
              transition
              px-5
              py-2
              rounded-lg
            "
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
