import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
};

const links = [
  { name: "Dashboard", path: "/admin" },
  { name: "Products", path: "/admin/products" },
  { name: "Categories", path: "/admin/categories" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Users", path: "/admin/users" },
];

export default function AdminLayout({ children }: Props) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#090807] text-white flex">
      {/* Sidebar */}
      <aside className="w-72 border-r border-[#42362F] bg-[#120F0D]">
        <div className="p-8 border-b border-[#42362F]">
          <h1 className="text-2xl font-bold text-[#B89D82]">EVENTCANVAS</h1>

          <p className="text-sm text-white/50 mt-2">Admin Panel</p>
        </div>

        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block rounded-xl px-5 py-3 transition ${
                location.pathname === link.path
                  ? "bg-[#42362F] text-white"
                  : "text-white/60 hover:bg-[#2A211D]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 overflow-y-auto">{children}</main>
    </div>
  );
}
