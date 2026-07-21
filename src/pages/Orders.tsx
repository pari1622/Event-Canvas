import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { getOrders } from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  const loadOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (id: string) => {
    if (!confirm("Cancel this order?")) return;

    try {
      await axios.patch(
        `${API}/orders/${id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to cancel order");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto pt-32 pb-20 px-6">
        <h1 className="text-4xl font-bold mb-10">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-white/60">No Orders Yet.</div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6"
              >
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h2 className="text-2xl font-semibold">{order.status}</h2>

                    <p className="text-white/50 mt-2">
                      Payment : {order.paymentStatus}
                    </p>

                    <p className="text-white/50">
                      Tracking : {order.trackingNumber || "-"}
                    </p>

                    <p className="text-white/50">
                      Delivery :{" "}
                      {order.estimatedDelivery
                        ? new Date(order.estimatedDelivery).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>

                  {order.status !== "Cancelled" &&
                    order.status !== "Completed" && (
                      <button
                        onClick={() => cancelOrder(order._id)}
                        className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700"
                      >
                        Cancel Order
                      </button>
                    )}
                </div>

                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div
                      key={item._id}
                      className="flex justify-between border-b border-[#42362F] pb-3"
                    >
                      <span>{item.product?.name}</span>

                      <span>Qty : {item.quantity}</span>
                    </div>
                  ))}
                </div>

                {order.timeline?.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Timeline</h3>

                    <div className="space-y-2">
                      {order.timeline.map((step: any, index: number) => (
                        <div key={index} className="text-white/70">
                          • {step.status} — {step.note}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
