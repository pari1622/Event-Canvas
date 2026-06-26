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
      className="relative py-32 px-6 lg:px-16 overflow-hidden bg-[#090807]"
    >
      {/* Luxury Background */}
      <div className="[#060505] to-absolute inset-0 bg-gradient-to-b from-[#221A16] via-[#110D0B] " />

      {/* Brown Grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="
            h-full
            w-full
            bg-[linear-gradient(rgba(66,54,47,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(66,54,47,.18)_1px,transparent_1px)]
            bg-[size:60px_60px]
          "
        />
      </div>

      {/* Brown Ambient Glow */}
      <div className="absolute -top-44 -left-40 h-[450px] w-[450px] rounded-full bg-[#5A4A40]/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#8C7461]/10 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <p
          className="uppercase tracking-[0.3em] text-sm font-semibold"
          style={{ color: "#8C7461" }}
        >
          Services
        </p>

        <h2 className="text-5xl md:text-6xl font-bold mt-4">
          Featured Services
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl leading-relaxed">
          Discover some of our most popular printing, branding and event
          solutions.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {featuredServices.map((service) => (
            <div
              key={service.title}
              className="
                bg-white/5
                backdrop-blur-xl
                rounded-3xl
                overflow-hidden
                transition-all
                duration-300
                hover:bg-white/10
              "
              style={{
                border: "1px solid #42362F",
              }}
            >
              <div className="overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-56 object-cover transition duration-500 hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3
                  className="text-2xl font-semibold"
                  style={{
                    color: "#B89D82",
                  }}
                >
                  {service.title}
                </h3>

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
            className="
              inline-flex
              items-center
              justify-center
              px-8
              py-4
              rounded-xl
              font-semibold
              text-white
              transition-all
              duration-300
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
            Explore All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
