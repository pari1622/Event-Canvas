import Navbar from "../components/Navbar";
import SectionBackground from "../components/SectionBackground";

export default function About() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 px-6 lg:px-16 overflow-hidden">
        <SectionBackground />

        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-blue-400 uppercase tracking-[0.3em]">About</p>

          <h1 className="text-6xl font-bold mt-4">About EventCanvas</h1>

          <p className="text-white/60 mt-8 max-w-4xl text-lg leading-relaxed">
            EventCanvas is a custom printing, branding and event solutions
            platform designed to simplify quotation requests and project
            execution.
          </p>
        </div>
      </section>
    </>
  );
}
