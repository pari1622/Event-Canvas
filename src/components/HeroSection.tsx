import { lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden bg-black">
      {/* Spline Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
          <Spline
            scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
            className="w-full h-full"
          />
        </Suspense>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />

      {/* Blue Tint Overlay */}
      <div className="absolute inset-0 bg-blue-500/10 mix-blend-screen pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-2xl px-6 md:px-10 pb-10 pt-32">
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[1.05] tracking-[-0.05em] uppercase">
          EVENT
          <span className="text-blue-500">CANVAS</span>
        </h1>

        <p className="mt-4 text-[clamp(1.125rem,2.5vw,1.875rem)] text-white/80">
          We implement packaging correctly.
        </p>

        <p className="mt-6 text-white/60 text-lg max-w-xl">
          Browse products, submit custom requirements, and receive personalized
          quotations tailored to your branding and printing needs.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="bg-blue-500 text-black px-8 py-4 rounded-sm font-semibold hover:brightness-110 transition">
            Book a Call
          </button>

          <button className="bg-white text-black px-8 py-4 rounded-sm font-semibold hover:brightness-90 transition">
            Our Work
          </button>
        </div>

        <p className="mt-6 text-xs text-white/40">
          Trusted printing partner. Custom quotes. Fast delivery.
        </p>
      </div>
    </section>
  );
}
