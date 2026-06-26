export default function ContactSection() {
  return (
    <section
      id="contact"
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

      {/* Ambient Glow */}
      <div className="absolute -bottom-32 left-0 h-[500px] w-[500px] rounded-full bg-[#5A4A40]/20 blur-[160px]" />

      <div className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full bg-[#8C7461]/10 blur-[180px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <p
          className="uppercase tracking-[0.3em] text-sm font-semibold"
          style={{
            color: "#8C7461",
          }}
        >
          Contact
        </p>

        <h2 className="text-5xl md:text-6xl font-bold mt-4">
          Let's Build Something Great
        </h2>

        <p className="text-white/60 mt-6 max-w-2xl leading-relaxed">
          Ready to start your project? Reach out and we'll prepare a customized
          quotation for your requirements.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {/* Email */}

          <div
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-8
              transition-all
              duration-300
              hover:bg-white/10
            "
            style={{
              border: "1px solid #42362F",
            }}
          >
            <h3
              className="text-xl font-semibold"
              style={{
                color: "#B89D82",
              }}
            >
              Email
            </h3>

            <p className="text-white/60 mt-4">hello@eventcanvas.com</p>
          </div>

          {/* Phone */}

          <div
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-8
              transition-all
              duration-300
              hover:bg-white/10
            "
            style={{
              border: "1px solid #42362F",
            }}
          >
            <h3
              className="text-xl font-semibold"
              style={{
                color: "#B89D82",
              }}
            >
              Phone
            </h3>

            <p className="text-white/60 mt-4">+91 98765 43210</p>
          </div>

          {/* Address */}

          <div
            className="
              bg-white/5
              backdrop-blur-xl
              rounded-3xl
              p-8
              transition-all
              duration-300
              hover:bg-white/10
            "
            style={{
              border: "1px solid #42362F",
            }}
          >
            <h3
              className="text-xl font-semibold"
              style={{
                color: "#B89D82",
              }}
            >
              Address
            </h3>

            <p className="text-white/60 mt-4">New Delhi, India</p>
          </div>
        </div>

        {/* Footer */}

        <div
          className="mt-20 pt-10"
          style={{
            borderTop: "1px solid #42362F",
          }}
        >
          <p className="text-white/40 text-sm">
            © 2026 EventCanvas. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
