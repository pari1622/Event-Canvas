import CategoryCard from "./CategoryCard";
import { categories } from "../data/categories";

export default function ProductsSection() {
  return (
    <section
      id="products"
      className="relative py-32 px-6 lg:px-16 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(rgba(59,130,246,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.12)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
            Categories
          </p>

          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Explore Our Services
          </h2>

          <p className="text-white/60 mt-6 max-w-3xl mx-auto">
            Browse our service categories and submit a custom quotation request.
            Every project is priced individually based on quantity,
            customization requirements, materials and delivery needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              description={category.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
