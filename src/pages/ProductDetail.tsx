import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { categories } from "../data/categories";

export default function ProductDetail() {
  const { category } = useParams();

  const currentCategory = categories.find((item) => item.slug === category);

  if (!currentCategory) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black text-white text-2xl">
          Category Not Found
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="relative min-h-screen pt-32 pb-20 px-6 lg:px-16 overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-slate-950" />

        <div className="absolute inset-0 opacity-20">
          <div
            className="
              h-full w-full
              bg-[linear-gradient(rgba(59,130,246,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,.15)_1px,transparent_1px)]
              bg-[size:60px_60px]
            "
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* LEFT SIDE IMAGE */}
          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
            <img
              src={currentCategory.image}
              alt={currentCategory.title}
              className="w-full h-full object-cover min-h-[700px]"
            />
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h1 className="text-5xl font-bold">{currentCategory.title}</h1>

            <p className="text-white/60 mt-4 mb-8">
              {currentCategory.description}
            </p>

            {/* PRODUCT DROPDOWN */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Product</label>

              <select
                className="
      w-full
      p-4
      rounded-xl
      bg-slate-900
      text-white
      border
      border-white/10
    "
              >
                <option value="">Select Product</option>

                {currentCategory.products.map((product) => (
                  <option
                    key={product}
                    value={product}
                    className="bg-slate-900 text-white"
                  >
                    {product}
                  </option>
                ))}
              </select>
            </div>

            {/* QUANTITY */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Quantity</label>

              <input
                type="number"
                placeholder="Enter Quantity"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
              />
            </div>

            {/* CUSTOMIZATION */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">
                Customization Requirements
              </label>

              <textarea
                rows={4}
                placeholder="Material, size, GSM, finishing, color etc."
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
              />
            </div>

            {/* NOTES */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Additional Notes</label>

              <textarea
                rows={4}
                placeholder="Describe your requirements..."
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
              />
            </div>

            {/* FILE */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Upload Artwork</label>

              <input
                type="file"
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10"
              />
            </div>

            {/* BUTTON */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-4 rounded-xl font-semibold">
              Add To Quote Bag
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
