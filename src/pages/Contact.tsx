import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 pb-24 px-6 lg:px-16 overflow-hidden bg-[#090807]">
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

        <div className="relative z-10 max-w-5xl mx-auto">
          <p
            className="uppercase tracking-[0.3em] text-sm font-semibold"
            style={{
              color: "#8C7461",
            }}
          >
            Contact
          </p>

          <h1 className="text-6xl font-bold mt-4 text-white">Get In Touch</h1>

          <p className="mt-6 text-lg text-white/60 max-w-2xl leading-relaxed">
            Tell us about your project and our team will get back to you with a
            personalized quotation and recommendations.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <input
              placeholder="Your Name"
              className="
                p-4
                rounded-2xl
                bg-white/[0.05]
                backdrop-blur-xl
                text-white
                placeholder:text-white/40
                outline-none
                transition
                focus:bg-white/[0.08]
              "
              style={{
                border: "1px solid #42362F",
              }}
            />

            <input
              placeholder="Email Address"
              className="
                p-4
                rounded-2xl
                bg-white/[0.05]
                backdrop-blur-xl
                text-white
                placeholder:text-white/40
                outline-none
                transition
                focus:bg-white/[0.08]
              "
              style={{
                border: "1px solid #42362F",
              }}
            />

            <textarea
              rows={7}
              placeholder="Tell us about your project..."
              className="
                md:col-span-2
                p-4
                rounded-2xl
                bg-white/[0.05]
                backdrop-blur-xl
                text-white
                placeholder:text-white/40
                outline-none
                resize-none
                transition
                focus:bg-white/[0.08]
              "
              style={{
                border: "1px solid #42362F",
              }}
            />
          </div>

          <button
            className="
              mt-10
              px-8
              py-4
              rounded-xl
              text-white
              font-semibold
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
            Send Message
          </button>
        </div>
      </section>
    </>
  );
}
