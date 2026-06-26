export default function AboutSection() {
  const stats = [
    ["500+", "Orders Delivered"],
    ["100+", "Happy Clients"],
    ["24/7", "Customer Support"],
    ["Custom", "Quote-Based Pricing"],
  ];

  return (
    <section
      id="about"
      className="relative py-32 px-6 lg:px-16 overflow-hidden bg-[#090807]"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#221A16] via-[#110D0B] to-[#060505]" />

      {/* Grid */}
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
      <div className="absolute -top-52 -left-44 h-[500px] w-[500px] rounded-full bg-[#5A4A40]/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#8C7461]/10 blur-[160px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_520px] gap-20 items-center">
          {/* LEFT */}

          <div>
            <p
              className="uppercase tracking-[0.3em] text-sm font-semibold"
              style={{ color: "#8C7461" }}
            >
              About EventCanvas
            </p>

            <h2 className="text-5xl md:text-6xl font-bold mt-5 leading-tight">
              Custom Printing,
              <br />
              Branding &
              <br />
              Packaging Solutions.
            </h2>

            <p className="text-white/75 mt-8 text-lg leading-relaxed max-w-2xl">
              EventCanvas is a modern custom-ordering platform built for
              businesses, events, startups, organizations and brands that
              require high-quality printing, packaging, merchandise and branding
              services.
            </p>

            <p className="text-white/60 mt-6 leading-relaxed max-w-2xl">
              Instead of fixed pricing, every order is reviewed individually.
              Customers simply select products, submit their requirements and
              receive a personalized quotation based on quantity, customization,
              materials and delivery needs.
            </p>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-6">
            {stats.map(([number, label]) => (
              <div
                key={number}
                className="
                  rounded-3xl
                  bg-white/[0.05]
                  backdrop-blur-xl
                  p-7
                  transition-all
                  duration-300
                  hover:bg-white/[0.08]
                "
                style={{
                  border: "1px solid #42362F",
                }}
              >
                <h3
                  className="text-4xl lg:text-5xl font-bold"
                  style={{
                    color: "#B89D82",
                  }}
                >
                  {number}
                </h3>

                <p className="mt-4 text-white/60 text-lg leading-relaxed">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
