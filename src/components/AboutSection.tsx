export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 px-6 lg:px-16 overflow-hidden bg-slate-950"
    >
      {/* Same Background as Products Section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071326] via-[#020617] to-black" />

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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side */}
          <div>
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
              About EventCanvas
            </p>

            <h2 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
              Custom Printing,
              <br />
              Branding &
              <br />
              Packaging Solutions.
            </h2>

            <p className="text-white/70 mt-8 text-lg leading-relaxed">
              EventCanvas is a modern custom-ordering platform built for
              businesses, events, startups, organizations and brands that
              require high-quality printing, packaging, merchandise and branding
              services.
            </p>

            <p className="text-white/60 mt-6 leading-relaxed">
              Instead of fixed pricing, every order is reviewed individually.
              Customers simply select products, submit their requirements and
              receive a personalized quotation based on quantity, customization,
              materials and delivery needs.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="bg-blue-500 hover:bg-blue-600 transition px-8 py-4 rounded-xl font-semibold">
                Explore Services
              </button>

              <button className="border border-white/20 hover:border-blue-500 transition px-8 py-4 rounded-xl">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-5xl font-bold text-blue-400">500+</h3>
              <p className="mt-3 text-white/60">Orders Delivered</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-5xl font-bold text-blue-400">100+</h3>
              <p className="mt-3 text-white/60">Happy Clients</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-5xl font-bold text-blue-400">24/7</h3>
              <p className="mt-3 text-white/60">Customer Support</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <h3 className="text-5xl font-bold text-blue-400">Custom</h3>
              <p className="mt-3 text-white/60">Quote-Based Pricing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
