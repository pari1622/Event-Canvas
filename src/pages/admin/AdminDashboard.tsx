import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";

import AdminLayout from "../../components/admin/AdminLayout";
import RevenueChart from "../../components/admin/RevenueChart";
import OrdersChart from "../../components/admin/OrdersChart";
import UserGrowthChart from "../../components/admin/UserGrowthChart";
import CategoryChart from "../../components/admin/CategoryChart";
import TopProducts from "../../components/admin/TopProducts";
import QuickActions from "../../components/admin/QuickActions";

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${API}/admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    loadDashboard();

    const interval = setInterval(loadDashboard, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h2 className="text-3xl font-bold text-[#B89D82]">
            Loading Dashboard...
          </h2>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-5xl font-bold mb-10 text-[#B89D82]">Dashboard</h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Revenue</p>
          <h2 className="text-4xl font-bold mt-3">
            ₹ {stats?.totalRevenue ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Monthly Revenue</p>
          <h2 className="text-4xl font-bold mt-3">
            ₹ {stats?.monthlyRevenue ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Pending Orders</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats?.pendingOrders ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Completed Orders</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats?.completedOrders ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Customers</p>
          <h2 className="text-4xl font-bold mt-3">{stats?.totalUsers ?? 0}</h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Admins</p>
          <h2 className="text-4xl font-bold mt-3">{stats?.totalAdmins ?? 0}</h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Products</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats?.totalProducts ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Categories</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats?.totalCategories ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Orders</p>
          <h2 className="text-4xl font-bold mt-3">{stats?.totalOrders ?? 0}</h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Active Users</p>
          <h2 className="text-4xl font-bold mt-3">{stats?.activeUsers ?? 0}</h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">Suspended Users</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats?.suspendedUsers ?? 0}
          </h2>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <p className="text-white/60">New Users This Month</p>
          <h2 className="text-4xl font-bold mt-3">
            {stats?.newUsersThisMonth ?? 0}
          </h2>
        </div>
      </div>

      {/* Recent Activity */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">
        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Orders</h2>

          <div className="space-y-4">
            {stats?.recentOrders?.map((order: any) => (
              <div
                key={order._id}
                className="flex justify-between items-center border-b border-[#42362F] pb-3"
              >
                <div>
                  <p className="font-semibold">
                    {order.user?.name || "Unknown"}
                  </p>

                  <p className="text-sm text-white/50">{order.status}</p>
                </div>

                <p className="text-[#B89D82] font-semibold">
                  ₹ {order.paidAmount || 0}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
          <h2 className="text-2xl font-semibold mb-6">Recent Users</h2>

          <div className="space-y-4">
            {stats?.recentUsers?.map((user: any) => (
              <div
                key={user._id}
                className="flex justify-between items-center border-b border-[#42362F] pb-3"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>

                  <p className="text-sm text-white/50">{user.email}</p>
                </div>

                <p className="text-[#B89D82] capitalize">{user.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Analytics */}

      <div className="mt-10">
        <RevenueChart
          revenue={stats?.totalRevenue ?? 0}
          monthlyRevenue={stats?.monthlyRevenue ?? 0}
        />
      </div>

      <div className="mt-10">
        <OrdersChart
          pending={stats?.pendingOrders ?? 0}
          completed={stats?.completedOrders ?? 0}
        />
      </div>

      <div className="mt-10">
        <UserGrowthChart
          totalUsers={stats?.totalUsers ?? 0}
          activeUsers={stats?.activeUsers ?? 0}
          newUsers={stats?.newUsersThisMonth ?? 0}
        />
      </div>

      <div className="mt-10">
        <CategoryChart
          products={stats?.totalProducts ?? 0}
          categories={stats?.totalCategories ?? 0}
        />
      </div>

      <div className="mt-10">
        <TopProducts />
      </div>

      <div className="mt-10">
        <QuickActions />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
