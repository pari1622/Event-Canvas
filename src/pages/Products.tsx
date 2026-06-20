import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import SectionBackground from "../components/SectionBackground";
import { categories } from "../data/categories";

export default function Products() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 pb-24 px-6 lg:px-16 overflow-hidden">
        {/* Shared Background */}
        <SectionBackground />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
              Services
            </p>

            <h1 className="text-5xl md:text-7xl font-bold mt-4">
              Explore Our Services
            </h1>

            <p className="text-white/60 mt-6 text-lg leading-relaxed">
              Browse our complete range of printing, branding, merchandise,
              gifting and event solutions. Select a category to view products,
              customization options and request a personalized quotation.
            </p>
          </div>

          {/* Categories Grid */}
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
    </>
  );
}
