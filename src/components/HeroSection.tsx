import CursorReveal from "./CursorReveal";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden bg-black">
      <CursorReveal
        baseImage="/images/office-base.png"
        revealImage="/images/office-reveal.png"
      >
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 flex items-center">
            {/* LEFT CONTENT */}

            <div className="max-w-3xl">
              <h1 className="text-[clamp(3.5rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-white">
                EVENT
                <span
                  style={{
                    color: "#42362F",
                  }}
                >
                  {" "}
                  CANVAS
                </span>
              </h1>

              <p className="mt-5 text-2xl text-white/80">
                We implement packaging correctly.
              </p>

              <p className="mt-7 text-lg text-white/60 leading-relaxed max-w-xl">
                Browse products, submit custom requirements, and receive
                personalized quotations tailored to your branding and printing
                needs.
              </p>

              <div className="flex gap-5 mt-10">
                {/* Book a Call */}

                <button
                  className="
                    transition
                    px-8
                    py-4
                    rounded-xl
                    font-semibold
                    text-white
                    shadow-lg
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
                  Book a Call
                </button>

                {/* Our Work */}

                <button
                  className="
                    border
                    border-white/20
                    bg-white/5
                    backdrop-blur-md
                    hover:border-white/40
                    transition
                    px-8
                    py-4
                    rounded-xl
                    font-semibold
                    text-white
                  "
                >
                  Our Work
                </button>
              </div>

              <p className="mt-10 text-white/40 text-sm">
                Trusted printing partner • Premium quality • Fast delivery
              </p>
            </div>
          </div>
        </div>
      </CursorReveal>
    </section>
  );
}
