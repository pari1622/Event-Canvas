export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Browse Products",
      description:
        "Explore our printing, packaging, branding and merchandise solutions.",
    },
    {
      number: "02",
      title: "Add To Bag",
      description: "Select products and include your custom requirements.",
    },
    {
      number: "03",
      title: "Submit Request",
      description: "Send your order details and customization requirements.",
    },
    {
      number: "04",
      title: "Receive Quote",
      description:
        "Our team reviews the order and prepares a custom quotation.",
    },
    {
      number: "05",
      title: "Approve & Pay",
      description: "Review your quotation and confirm the order.",
    },
    {
      number: "06",
      title: "Production Begins",
      description: "Your project enters production and delivery processing.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-32 px-6 lg:px-16 overflow-hidden bg-[#090807]"
    >
      {/* Background */}
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

      {/* Ambient Brown Glow */}
      <div className="absolute -top-48 right-0 h-[450px] w-[450px] rounded-full bg-[#5A4A40]/20 blur-[150px]" />

      <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-[#8C7461]/10 blur-[170px]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <p
          className="uppercase tracking-[0.3em] text-sm font-semibold"
          style={{ color: "#8C7461" }}
        >
          Process
        </p>

        <h2 className="text-5xl md:text-6xl font-bold mt-4">How It Works</h2>

        <p className="text-white/60 mt-6 max-w-2xl leading-relaxed">
          A streamlined workflow built around custom quotations and personalized
          production.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {steps.map((step) => (
            <div
              key={step.number}
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
              <span
                className="text-5xl font-bold"
                style={{
                  color: "#8C7461",
                }}
              >
                {step.number}
              </span>

              <h3 className="text-2xl font-semibold mt-5 text-white">
                {step.title}
              </h3>

              <p className="text-white/60 mt-4 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
