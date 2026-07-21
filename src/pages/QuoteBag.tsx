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

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <h1 className="text-4xl font-bold mb-10">Quote Bag</h1>

        {bag.length === 0 ? (
          <h2 className="text-xl text-gray-400">Your Quote Bag is Empty.</h2>
        ) : (
          <>
            <div className="space-y-6">
              {bag.map((item) => (
                <div
                  key={item._id}
                  className="border border-gray-700 rounded-xl p-6"
                >
                  <h2 className="text-2xl font-semibold">
                    {item.product.name}
                  </h2>

                  <p className="mt-2">
                    <strong>Quantity:</strong> {item.quantity}
                  </p>

                  <p className="mt-2">
                    <strong>Notes:</strong> {item.notes || "-"}
                  </p>

                  <button
                    onClick={() => removeItem(item._id)}
                    className="mt-5 bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-lg text-white"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={handlePlaceOrder}
                className="px-8 py-3 rounded-xl bg-[#B89D82] hover:bg-[#a98d72] transition text-black font-semibold"
              >
                Request Quote
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuoteBag;
