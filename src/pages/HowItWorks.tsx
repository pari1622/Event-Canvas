import Navbar from "../components/Navbar";
import SectionBackground from "../components/SectionBackground";

export default function HowItWorks() {
  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 px-6 lg:px-16 overflow-hidden">
        <SectionBackground />

        <div className="relative z-10 max-w-6xl mx-auto">
          <p className="text-blue-400 uppercase tracking-[0.3em]">Process</p>

          <h1 className="text-6xl font-bold mt-4">How It Works</h1>

          <div className="mt-16 space-y-8 text-xl">
            <div>1. Browse Products & Services</div>
            <div>2. Select Requirements</div>
            <div>3. Submit Quote Request</div>
            <div>4. Receive Custom Pricing</div>
            <div>5. Approve Quotation</div>
            <div>6. Production Begins</div>
            <div>7. Delivery & Completion</div>
          </div>
        </div>
      </section>
    </>
  );
}
