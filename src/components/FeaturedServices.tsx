import { Link } from "react-router-dom";

const featuredServices = [
  {
    title: "Printing",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    description:
      "Brochures, flyers, posters, stickers and business stationery.",
  },

  {
    title: "Branding & Signages",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    description:
      "Signages, banners, standees, flex printing and branding solutions.",
  },

  {
    title: "Event Solutions",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865",
    description: "End-to-end event management and execution services.",
  },
];

export default function FeaturedServices() {
  return (
    <section
      id="services"
      className="relative py-32 px-6 lg:px-16 overflow-hidden"
    >
      {/* SAME BACKGROUND AS BEFORE */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950" />

      <div className="absolute inset-0 opacity-20">
        <div
          className="
            h-full w-full
            bg-[linear-gradient(rgba(59,130,246,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.15)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
          Services
        </p>

        <h2 className="text-5xl md:text-6xl font-bold mt-4">
          Featured Services
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl">
          Discover some of our most popular printing, branding and event
          solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {featuredServices.map((service) => (
            <div
              key={service.title}
              className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-blue-500/40 transition"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-semibold">{service.title}</h3>

                <p className="text-white/60 mt-4 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/products"
            className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-xl font-medium"
          >
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
