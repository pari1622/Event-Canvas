import Navbar from "../components/Navbar";
import SectionBackground from "../components/SectionBackground";

export default function Contact() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 px-6 lg:px-16 overflow-hidden">
        <SectionBackground />

        <div className="relative z-10 max-w-5xl mx-auto">
          <p className="text-blue-400 uppercase tracking-[0.3em]">Contact</p>

          <h1 className="text-6xl font-bold mt-4">Get In Touch</h1>

          <div className="grid md:grid-cols-2 gap-10 mt-12">
            <input
              placeholder="Name"
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <input
              placeholder="Email"
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            />

            <textarea
              rows={6}
              placeholder="Message"
              className="md:col-span-2 p-4 rounded-xl bg-white/5 border border-white/10"
            />
          </div>

          <button className="mt-8 bg-blue-500 px-8 py-4 rounded-xl">
            Send Message
          </button>
        </div>
      </section>
    </>
  );
}
