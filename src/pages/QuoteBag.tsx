import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CustomizeDrawer from "../components/CustomizeDrawer";
import { useCart } from "../context/CartContext";

export default function QuoteBag() {
  const { items, removeFromCart, clearCart } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    service: string;
  } | null>(null);

  const [customer, setCustomer] = useState(() => {
    const savedCustomer = localStorage.getItem("eventcanvas-customer");

    if (!savedCustomer) {
      return {
        name: "",
        company: "",
        email: "",
        phone: "",
        gst: "",
        address: "",
        deliveryDate: "",
        notes: "",
      };
    }

    try {
      return JSON.parse(savedCustomer);
    } catch {
      return {
        name: "",
        company: "",
        email: "",
        phone: "",
        gst: "",
        address: "",
        deliveryDate: "",
        notes: "",
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("eventcanvas-customer", JSON.stringify(customer));
  }, [customer]);

  useEffect(() => {
    if (items.length === 0) {
      setCustomer({
        name: "",
        company: "",
        email: "",
        phone: "",
        gst: "",
        address: "",
        deliveryDate: "",
        notes: "",
      });

      localStorage.removeItem("eventcanvas-customer");
    }
  }, [items]);

  const validateQuote = () => {
    if (items.length === 0) {
      alert("Your QuoteBag is empty.");
      return false;
    }

    if (!customer.name.trim()) {
      alert("Please enter your full name.");
      return false;
    }

    if (!customer.email.trim()) {
      alert("Please enter your email.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(customer.email)) {
      alert("Please enter a valid email.");
      return false;
    }

    if (!customer.phone.trim()) {
      alert("Please enter your phone number.");
      return false;
    }

    if (!/^\d{10}$/.test(customer.phone)) {
      alert("Phone number must contain exactly 10 digits.");
      return false;
    }

    if (!customer.address.trim()) {
      alert("Please enter delivery address.");
      return false;
    }

    if (!customer.deliveryDate) {
      alert("Please choose a delivery date.");
      return false;
    }

    const pending = items.filter((item) => !item.customized);

    if (pending.length > 0) {
      alert("Please customize every service before submitting.");
      return false;
    }

    return true;
  };

  return (
    <>
      <Navbar />

      <section
        className="
          relative
          min-h-screen
          pt-32
          pb-24
          px-6
          lg:px-16
          bg-[#090807]
          overflow-hidden
        "
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#221A16] via-[#110D0B] to-[#060505]" />

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

        <div className="relative z-10 max-w-7xl mx-auto">
          <p
            className="uppercase tracking-[0.35em] text-sm font-semibold"
            style={{
              color: "#8C7461",
            }}
          >
            EVENTCANVAS
          </p>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-4">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold">
                QuoteBag ({items.length})
              </h1>

              <p className="mt-5 max-w-2xl text-white/60">
                Review every selected service before submitting your quotation
                request.
              </p>
            </div>

            {items.length > 0 && (
              <button
                onClick={() => {
                  clearCart();
                  localStorage.removeItem("eventcanvas-customer");
                }}
                className="
                  rounded-xl
                  border
                  border-red-500
                  px-6
                  py-3
                  text-red-400
                  transition
                  hover:bg-red-600
                  hover:text-white
                "
              >
                Clear QuoteBag
              </button>
            )}
          </div>
          {items.length === 0 ? (
            <div
              className="
                mt-20
                rounded-3xl
                border
                border-[#42362F]
                bg-white/5
                p-16
                text-center
              "
            >
              <h2 className="text-3xl font-bold">Your QuoteBag is Empty</h2>

              <p className="mt-4 text-white/60">
                Browse our services and add products to request a quotation.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-8 mt-14">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-[#42362F]
                      bg-white/5
                      backdrop-blur-xl
                    "
                  >
                    <div className="grid lg:grid-cols-[240px_1fr]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full
                          min-h-[260px]
                          w-full
                          object-cover
                        "
                      />

                      <div className="p-8">
                        <div className="flex justify-between items-start gap-6">
                          <div>
                            <p
                              className="uppercase tracking-[0.3em] text-xs"
                              style={{
                                color: "#8C7461",
                              }}
                            >
                              {item.category}
                            </p>

                            <h2 className="mt-3 text-4xl font-bold">
                              {item.name}
                            </h2>

                            <p
                              className="mt-5 font-semibold"
                              style={{
                                color: "#B89D82",
                              }}
                            >
                              {item.customized
                                ? `✓ Customized • ${
                                    Object.entries(
                                      item.customization ?? {},
                                    ).filter(
                                      ([key, value]) =>
                                        key !== "file" &&
                                        key !== "fileUrl" &&
                                        key !== "fileName" &&
                                        value !== undefined &&
                                        value !== "",
                                    ).length
                                  } Specifications`
                                : "Pending Customization"}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="
                              rounded-xl
                              bg-red-600
                              px-5
                              py-3
                              transition
                              hover:bg-red-700
                            "
                          >
                            Remove
                          </button>
                        </div>
                        {/* CUSTOMIZATION */}

                        {item.customization ? (
                          <>
                            <div className="mt-8">
                              <h3
                                className="text-xl font-semibold mb-6"
                                style={{
                                  color: "#B89D82",
                                }}
                              >
                                Custom Specifications
                              </h3>

                              <div className="grid md:grid-cols-2 gap-4">
                                {Object.entries(item.customization).map(
                                  ([key, value]) => {
                                    if (
                                      key === "file" ||
                                      key === "fileUrl" ||
                                      key === "fileName"
                                    ) {
                                      return null;
                                    }

                                    if (!value) return null;

                                    return (
                                      <div
                                        key={key}
                                        className="
                                          rounded-xl
                                          bg-[#2D241F]
                                          border
                                          border-[#42362F]
                                          p-4
                                        "
                                      >
                                        <p
                                          className="text-sm uppercase"
                                          style={{
                                            color: "#8C7461",
                                          }}
                                        >
                                          {key}
                                        </p>

                                        <p className="mt-2 text-lg">
                                          {String(value)}
                                        </p>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            </div>

                            <div className="flex gap-4 mt-8">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedItem({
                                    id: item.id,
                                    service: item.name,
                                  });

                                  setDrawerOpen(true);
                                }}
                                className="
                                  rounded-xl
                                  border
                                  border-[#42362F]
                                  px-6
                                  py-3
                                  hover:bg-[#2D241F]
                                  transition
                                "
                              >
                                Edit Customization
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  if (!item.customization?.fileUrl) {
                                    alert("No design uploaded.");
                                    return;
                                  }

                                  const previewWindow = window.open(
                                    "",
                                    "_blank",
                                  );

                                  if (!previewWindow) return;

                                  previewWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<title>${item.name}</title>
<style>
body{
margin:0;
background:#111;
display:flex;
justify-content:center;
align-items:center;
height:100vh;
overflow:hidden;
}

img{
max-width:95%;
max-height:95%;
object-fit:contain;
}

iframe{
width:100%;
height:100%;
border:none;
}
</style>
</head>

<body>
${
  item.customization.fileName?.toLowerCase().endsWith(".pdf")
    ? `<iframe src="${item.customization.fileUrl}"></iframe>`
    : `<img src="${item.customization.fileUrl}" />`
}
</body>
</html>
`);

                                  previewWindow.document.close();
                                }}
                                className="
                                  rounded-xl
                                  px-6
                                  py-3
                                  text-white
                                  transition
                                  hover:opacity-90
                                "
                                style={{
                                  backgroundColor: "#42362F",
                                }}
                              >
                                View Design
                              </button>
                            </div>
                          </>
                        ) : (
                          <div
                            className="
                              mt-8
                              rounded-2xl
                              border
                              border-dashed
                              border-[#42362F]
                              bg-[#1A1512]
                              p-8
                              text-center
                            "
                          >
                            <p
                              className="font-semibold"
                              style={{
                                color: "#B89D82",
                              }}
                            >
                              This product hasn't been customized yet.
                            </p>

                            <p className="mt-3 text-white/60">
                              Return to the Products page and customize this
                              service before submitting your quotation request.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* CUSTOMER DETAILS */}

              <div
                className="
                  mt-20
                  rounded-3xl
                  border
                  border-[#42362F]
                  bg-white/5
                  backdrop-blur-xl
                  p-10
                "
              >
                <p
                  className="uppercase tracking-[0.35em] text-sm font-semibold"
                  style={{
                    color: "#8C7461",
                  }}
                >
                  CUSTOMER DETAILS
                </p>

                <h2 className="mt-4 text-4xl font-bold">
                  Tell us about your project
                </h2>

                <p className="mt-4 text-white/60">
                  These details help us prepare an accurate quotation.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-10">
                  <input
                    placeholder="Full Name"
                    value={customer.name}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        name: e.target.value,
                      })
                    }
                    className="
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                    "
                  />

                  <input
                    placeholder="Company Name"
                    value={customer.company}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        company: e.target.value,
                      })
                    }
                    className="
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                    "
                  />

                  <input
                    placeholder="Email Address"
                    value={customer.email}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        email: e.target.value,
                      })
                    }
                    className="
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                    "
                  />

                  <input
                    placeholder="Phone Number"
                    value={customer.phone}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        phone: e.target.value,
                      })
                    }
                    className="
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                    "
                  />

                  <input
                    placeholder="GST Number (Optional)"
                    value={customer.gst}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        gst: e.target.value,
                      })
                    }
                    className="
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                    "
                  />

                  <input
                    type="date"
                    value={customer.deliveryDate}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        deliveryDate: e.target.value,
                      })
                    }
                    className="
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                    "
                  />

                  <textarea
                    rows={4}
                    placeholder="Delivery Address"
                    value={customer.address}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        address: e.target.value,
                      })
                    }
                    className="
                      md:col-span-2
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                      resize-none
                    "
                  />

                  <textarea
                    rows={5}
                    placeholder="Additional Notes"
                    value={customer.notes}
                    onChange={(e) =>
                      setCustomer({
                        ...customer,
                        notes: e.target.value,
                      })
                    }
                    className="
                      md:col-span-2
                      rounded-xl
                      border
                      border-[#42362F]
                      bg-[#1A1512]
                      p-4
                      outline-none
                      resize-none
                    "
                  />
                </div>
              </div>
              {/* QUOTE SUMMARY */}

              <div
                className="
                  sticky
                  bottom-6
                  mt-10
                  rounded-3xl
                  border
                  border-[#42362F]
                  bg-[#110D0B]/90
                  backdrop-blur-xl
                  p-8
                "
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div>
                    <p
                      className="uppercase tracking-[0.3em] text-xs"
                      style={{
                        color: "#8C7461",
                      }}
                    >
                      QUOTE SUMMARY
                    </p>

                    <h3 className="mt-3 text-3xl font-bold">
                      {items.length} Service
                      {items.length !== 1 ? "s" : ""} Selected
                    </h3>

                    <p className="mt-3 text-white/60">
                      Once submitted, our team will review your requirements and
                      send a personalized quotation.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (!validateQuote()) return;

                      alert("Quote request submitted successfully!");

                      clearCart();

                      localStorage.removeItem("eventcanvas-customer");
                    }}
                    disabled={items.length === 0}
                    className={`
                      rounded-2xl
                      px-12
                      py-5
                      text-lg
                      font-semibold
                      text-white
                      transition-all
                      duration-300
                      ${
                        items.length === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:scale-105"
                      }
                    `}
                    style={{
                      backgroundColor: "#42362F",
                    }}
                  >
                    Submit Quote Request →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <CustomizeDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedItem(null);
        }}
        service={selectedItem?.service ?? ""}
        itemId={selectedItem?.id}
      />
    </>
  );
}
