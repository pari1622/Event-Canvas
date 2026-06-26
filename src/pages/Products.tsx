import { useState } from "react";
import Navbar from "../components/Navbar";
import CategoryCard from "../components/CategoryCard";
import { categories } from "../data/categories";

export default function Products() {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen overflow-hidden pt-32 pb-24 px-6 lg:px-16 bg-[#090807]">
        {/* Luxury Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#221A16] via-[#110D0B] to-[#060505]" />

        {/* Brown Grid */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="
              h-full
              w-full
              bg-[linear-gradient(rgba(66,54,47,.18)_1px,transparent_1px),
              linear-gradient(90deg,rgba(66,54,47,.18)_1px,transparent_1px)]
              bg-[size:60px_60px]
            "
          />
        </div>

        {/* Ambient Glow */}
        <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-[#5A4A40]/20 blur-[170px]" />

        <div className="absolute bottom-0 right-0 h-[450px] w-[450px] rounded-full bg-[#8C7461]/10 blur-[180px]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Heading */}

          <div className="text-center max-w-4xl mx-auto">
            <p
              className="uppercase tracking-[0.35em] text-sm font-semibold"
              style={{
                color: "#8C7461",
              }}
            >
              EVENTCANVAS
            </p>

            <h1 className="mt-4 text-5xl md:text-7xl font-bold">
              Explore Our Services
            </h1>

            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              Browse our complete collection of printing, branding, merchandise,
              gifting and event management solutions. Expand a category to view
              every service we provide.
            </p>
          </div>

          {/* Cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 mt-20">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                image={category.image}
                description={category.description}
                slug={category.slug}
                products={category.products}
                expanded={openCategory === category.id}
                onToggle={() =>
                  setOpenCategory(
                    openCategory === category.id ? null : category.id,
                  )
                }
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
