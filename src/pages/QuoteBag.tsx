import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

import { getQuoteBag, removeFromQuoteBag } from "../services/quoteBagService";

import { placeOrder } from "../services/orderService";

const QuoteBag = () => {
  const [bag, setBag] = useState<any[]>([]);
  const navigate = useNavigate();

  const loadBag = async () => {
    try {
      const data = await getQuoteBag();
      setBag(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadBag();
  }, []);

  const removeItem = async (id: string) => {
    try {
      await removeFromQuoteBag(id);
      loadBag();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();

      alert("Quote Request Submitted Successfully");

      navigate("/orders");
    } catch (error) {
      console.error(error);

      alert("Failed to submit quote request");
    }
  };

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen pt-32 pb-20 px-6"
        style={{
          backgroundColor: "#090807",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-10">Quote Bag</h1>

          {bag.length === 0 ? (
            <div className="text-center py-32">
              <h2 className="text-4xl font-bold text-white">
                Your Quote Bag is Empty
              </h2>

              <p className="text-white/50 mt-4 text-lg">
                Browse our services and add products to request a quotation.
              </p>

              <button
                onClick={() => navigate("/products")}
                className="mt-10 px-8 py-4 rounded-xl font-semibold text-[#110D0B]"
                style={{
                  backgroundColor: "#B89D82",
                }}
              >
                Explore Products
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-white">
                    {bag.length} {bag.length === 1 ? "Item" : "Items"} in Quote
                    Bag
                  </h2>

                  <p className="text-white/50 mt-2">
                    Review your customization details before requesting a
                    quotation.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {bag.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-3xl border border-[#42362F] bg-[#120F0D] p-8"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-3xl font-bold text-white">
                          {item.product.name}
                        </h2>

                        <p className="mt-2 text-[#B89D82]">
                          {item.product.category?.name}
                        </p>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-8">
                      <div className="space-y-3">
                        <p>
                          <strong>Quantity:</strong> {item.quantity}
                        </p>

                        <p>
                          <strong>Need Design:</strong>{" "}
                          {item.needDesign ? "Yes" : "No"}
                        </p>

                        <p>
                          <strong>Delivery Date:</strong>{" "}
                          {item.deliveryDate
                            ? new Date(item.deliveryDate).toLocaleDateString()
                            : "-"}
                        </p>

                        <p>
                          <strong>Reference Image:</strong>{" "}
                          {item.referenceImage || "-"}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <p>
                          <strong>Width:</strong>{" "}
                          {item.customization?.width || "-"}
                        </p>

                        <p>
                          <strong>Height:</strong>{" "}
                          {item.customization?.height || "-"}
                        </p>

                        <p>
                          <strong>Material:</strong>{" "}
                          {item.customization?.material || "-"}
                        </p>

                        <p>
                          <strong>Finish:</strong>{" "}
                          {item.customization?.finish || "-"}
                        </p>

                        <p>
                          <strong>Colour:</strong>{" "}
                          {item.customization?.color || "-"}
                        </p>

                        <p>
                          <strong>Printing:</strong>{" "}
                          {item.customization?.printing || "-"}
                        </p>

                        <p>
                          <strong>GSM:</strong> {item.customization?.gsm || "-"}
                        </p>

                        <p>
                          <strong>Lamination:</strong>{" "}
                          {item.customization?.lamination || "-"}
                        </p>

                        <p>
                          <strong>Eyelets:</strong>{" "}
                          {item.customization?.eyelets || "-"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8">
                      <p className="font-semibold text-white">
                        Additional Notes
                      </p>

                      <p className="mt-2 text-white/60">
                        {item.notes || "No notes provided."}
                      </p>

                      {item.customization?.remarks && (
                        <p className="mt-4 text-white/60">
                          {item.customization.remarks}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 rounded-3xl border border-[#42362F] bg-[#120F0D] p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      Ready to Request a Quote?
                    </h2>

                    <p className="mt-3 text-white/60 max-w-2xl">
                      Our team will review your customization requirements,
                      prepare the best quotation and contact you shortly.
                    </p>

                    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-white/40 text-sm">Products</p>

                        <p className="text-2xl font-bold text-[#B89D82]">
                          {bag.length}
                        </p>
                      </div>

                      <div>
                        <p className="text-white/40 text-sm">Custom Orders</p>

                        <p className="text-2xl font-bold text-[#B89D82]">
                          {
                            bag.filter(
                              (item) =>
                                item.needDesign ||
                                item.notes ||
                                item.customization?.width ||
                                item.customization?.material,
                            ).length
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-white/40 text-sm">Design Requests</p>

                        <p className="text-2xl font-bold text-[#B89D82]">
                          {bag.filter((item) => item.needDesign).length}
                        </p>
                      </div>

                      <div>
                        <p className="text-white/40 text-sm">Status</p>

                        <p className="text-2xl font-bold text-green-400">
                          Ready
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => navigate("/products")}
                      className="rounded-xl border border-[#42362F] px-8 py-4 text-white hover:bg-[#1C1714]"
                    >
                      Continue Browsing
                    </button>

                    <button
                      onClick={handlePlaceOrder}
                      className="rounded-xl bg-[#B89D82] px-10 py-4 font-semibold text-[#110D0B] transition hover:bg-[#a88d73]"
                    >
                      Request Final Quote
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuoteBag;
