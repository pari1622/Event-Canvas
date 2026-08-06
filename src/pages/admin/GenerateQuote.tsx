import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

type QuoteItem = {
  description: string;
  quantity: number;
  unitPrice: number;
};

const GenerateQuote = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [order, setOrder] = useState<any>(null);

  const [items, setItems] = useState<QuoteItem[]>([]);

  const [discount, setDiscount] = useState(0);

  const [gst, setGst] = useState(18);

  const [advance, setAdvance] = useState(50);

  const [validity, setValidity] = useState(15);

  const [terms, setTerms] = useState(
    "50% Advance Payment.\nDelivery starts after quote approval.",
  );

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/orders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrder(data.order);

        setItems(
          data.order.items.map((item: any) => ({
            description: item.product.name,
            quantity: item.quantity,
            unitPrice: item.product.basePrice,
          })),
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadOrder();
  }, [id]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  }, [items]);

  const gstAmount = ((subtotal - discount) * gst) / 100;

  const grandTotal = subtotal - discount + gstAmount;

  const updateItem = (
    index: number,
    key: keyof QuoteItem,
    value: string | number,
  ) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    );
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
      },
    ]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleGenerateQuote = async () => {
    try {
      await axios.post(
        `${API}/quotes`,
        {
          orderId: order._id,
          items,
          discount,
          gst,
          advance,
          validity,
          terms,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Quote Generated Successfully & Email Sent");

      navigate("/admin/quotes");
    } catch (error: any) {
      console.error(error);

      alert(error.response?.data?.message || "Failed to Generate Quote");
    }
  };

  if (!order) {
    return (
      <AdminLayout>
        <h2 className="text-3xl">Loading...</h2>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-[#B89D82] mb-3">
          Quote Builder
        </h1>

        <p className="text-white/60 mb-8">Customer : {order.user?.name}</p>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#42362F]">
                <th className="text-left py-4">Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-[#2C241F]">
                  <td className="py-5">
                    <input
                      value={item.description}
                      onChange={(e) =>
                        updateItem(index, "description", e.target.value)
                      }
                      className="w-full rounded-lg border border-[#42362F] bg-[#1B1715] p-3"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(index, "quantity", Number(e.target.value))
                      }
                      className="w-24 rounded-lg border border-[#42362F] bg-[#1B1715] p-3 text-center"
                    />
                  </td>

                  <td>
                    <input
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) =>
                        updateItem(index, "unitPrice", Number(e.target.value))
                      }
                      className="w-36 rounded-lg border border-[#42362F] bg-[#1B1715] p-3 text-center"
                    />
                  </td>

                  <td className="text-center font-semibold">
                    ₹ {item.quantity * item.unitPrice}
                  </td>

                  <td>
                    <button
                      onClick={() => removeItem(index)}
                      className="rounded-lg bg-red-600 px-4 py-2"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={addItem}
            className="mt-6 rounded-xl bg-[#B89D82] px-6 py-3 font-semibold text-black"
          >
            + Add Custom Item
          </button>
        </div>

        <div className="grid grid-cols-2 gap-10 mt-10">
          <div className="space-y-5">
            <div>
              <label>Discount</label>

              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="mt-2 w-full rounded-xl bg-[#1B1715] p-4"
              />
            </div>

            <div>
              <label>GST (%)</label>

              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(Number(e.target.value))}
                className="mt-2 w-full rounded-xl bg-[#1B1715] p-4"
              />
            </div>

            <div>
              <label>Advance (%)</label>

              <input
                type="number"
                value={advance}
                onChange={(e) => setAdvance(Number(e.target.value))}
                className="mt-2 w-full rounded-xl bg-[#1B1715] p-4"
              />
            </div>

            <div>
              <label>Validity (Days)</label>

              <input
                type="number"
                value={validity}
                onChange={(e) => setValidity(Number(e.target.value))}
                className="mt-2 w-full rounded-xl bg-[#1B1715] p-4"
              />
            </div>

            <div>
              <label>Terms</label>

              <textarea
                rows={6}
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="mt-2 w-full rounded-xl bg-[#1B1715] p-4"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-8 space-y-5">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span>₹ {discount}</span>
            </div>

            <div className="flex justify-between">
              <span>GST</span>
              <span>₹ {gstAmount}</span>
            </div>

            <hr />

            <div className="flex justify-between text-3xl font-bold text-[#B89D82]">
              <span>Grand Total</span>
              <span>₹ {grandTotal}</span>
            </div>

            <button
              onClick={handleGenerateQuote}
              className="mt-8 w-full rounded-xl bg-[#B89D82] py-4 text-xl font-bold text-black hover:bg-[#a88d73] transition"
            >
              Generate Quote
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default GenerateQuote;
