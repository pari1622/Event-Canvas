export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative py-32 px-6 lg:px-16 overflow-hidden"
    >
      {/* IMPORTANT:
          Starts with same color that HowItWorks ends with
      */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950" />

      {/* Grid */}
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
        <p className="text-blue-400 uppercase tracking-[0.3em] text-sm">
          Contact
        </p>

        <h2 className="text-5xl md:text-6xl font-bold mt-4">
          Let's Build Something Great
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl">
          Ready to start your project? Reach out and we'll prepare a customized
          quotation for your requirements.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-white/60 mt-4">hello@eventcanvas.com</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Phone</h3>
            <p className="text-white/60 mt-4">+91 98765 43210</p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8">
            <h3 className="text-xl font-semibold">Address</h3>
            <p className="text-white/60 mt-4">New Delhi, India</p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10">
          <p className="text-white/40 text-sm">
            © 2026 EventCanvas. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
