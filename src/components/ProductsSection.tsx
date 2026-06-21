import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { categories } from "../data/categories";

export default function ProductsSection() {
  return (
    <section
      id="services"
      className="relative py-24 px-6 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950" />

      <div className="absolute inset-0 opacity-20">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(rgba(59,130,246,.15)_1px,transparent_1px),
            linear-gradient(90deg,rgba(59,130,246,.15)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <p className="text-blue-400 uppercase tracking-[0.25em] text-sm">
          Services
        </p>

        <h2 className="text-5xl font-bold mt-4">Featured Services</h2>

        <p className="text-white/60 mt-4 max-w-2xl">
          Explore our most popular printing, branding and event solutions.
          Submit a quote request and receive custom pricing based on your
          requirements.
        </p>

        {/* Show only first 3 categories on homepage */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {categories.slice(0, 3).map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              description={category.description}
              slug={category.slug}
            />
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/products"
            className="
              bg-blue-500
              hover:bg-blue-600
              transition
              px-8
              py-4
              rounded-xl
              font-semibold
            "
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
