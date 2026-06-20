import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { items } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between px-8 lg:px-16 py-5 backdrop-blur-md bg-black/20 border-b border-white/10">
        {/* Logo */}
        <div className="text-xl font-semibold tracking-tight">
          EVENT
          <span className="text-blue-500">CANVAS</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/products"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            Products
          </Link>
          <a
            href="#services"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            Services
          </a>

          <a
            href="#how-it-works"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            How It Works
          </a>

          <a
            href="#about"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            About
          </a>

          <a
            href="#contact"
            className="text-sm uppercase tracking-widest text-white/60 hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-lg font-medium">
            QuoteBag ({items.length})
          </button>

          <button className="hidden md:block bg-white/10 hover:bg-white/20 transition px-5 py-2 rounded-lg">
            Get Quote
          </button>
        </div>
      </div>
    </header>
  );
}
