import Navbar from "../components/Navbar";
import SectionBackground from "../components/SectionBackground";

export default function Services() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 px-6 lg:px-16 overflow-hidden">
        <SectionBackground />

        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-blue-400 uppercase tracking-[0.3em]">Services</p>

          <h1 className="text-6xl font-bold mt-4">Our Services</h1>

          <p className="text-white/60 mt-6 max-w-3xl">
            EventCanvas provides custom printing, branding, packaging,
            merchandise and event execution solutions.
          </p>
        </div>
      </section>
    </>
  );
}
