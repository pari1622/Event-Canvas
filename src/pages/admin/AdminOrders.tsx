import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import OrderCard from "../../components/admin/OrderCard";

const statuses = [
  "Pending",
  "Quoted",
  "Approved",
  "In Production",
  "Completed",
  "Cancelled",
];

const AdminOrders = () => {
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const loadOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/admin/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(
        `${API}/admin/orders/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    }
  };
  const generateQuote = async (orderId: string): Promise<void> => {
    window.location.href = `/admin/orders/${orderId}/quote`;
  };

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
        order.user?.email?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold text-[#B89D82]">Orders</h1>

          <p className="mt-2 text-white/50">Manage customer orders</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl bg-[#181412] border border-[#42362F] p-4"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl bg-[#181412] border border-[#42362F] p-4"
        >
          <option>All</option>

          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-10 text-center text-white/50">
            No Orders Found
          </div>
        ) : (
          filtered.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              statuses={statuses}
              updateStatus={updateStatus}
              generateQuote={generateQuote}
            />
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
