import { Link } from "react-router-dom";

type Props = {
  order: any;
  statuses: string[];
  updateStatus: (id: string, status: string) => void;
  generateQuote: (orderId: string) => Promise<void>;
};

const OrderCard = ({ order, statuses, updateStatus, generateQuote }: Props) => {
  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold">{order.user?.name || "Guest"}</h2>

      <p className="text-white/50">{order.user?.email}</p>

      <div className="mt-5 space-y-2">
        {order.items.map((item: any) => (
          <div
            key={item._id}
            className="flex justify-between border-b border-[#42362F] pb-2"
          >
            <div>
              <p className="font-medium">{item.product?.name}</p>

              {item.notes && (
                <p className="text-sm text-white/50">{item.notes}</p>
              )}
            </div>

            <span>x {item.quantity}</span>
          </div>
        ))}
      </div>

      <select
        value={order.status}
        onChange={(e) => updateStatus(order._id, e.target.value)}
        className="mt-6 w-full rounded-xl border border-[#42362F] bg-[#1C1714] px-4 py-3"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <div className="mt-6 flex flex-col gap-3">
        <button
          onClick={() => generateQuote(order._id)}
          className="rounded-xl bg-[#B89D82] px-5 py-3 font-semibold text-black transition hover:opacity-90"
        >
          Quick Generate Quote
        </button>

        <Link
          to={`/admin/orders/${order._id}/quote`}
          className="rounded-xl border border-[#B89D82] px-5 py-3 text-center font-semibold text-[#B89D82] transition hover:bg-[#B89D82] hover:text-black"
        >
          Open Quote Builder
        </Link>
      </div>
    </div>
  );
};

export default OrderCard;
