import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

const AdminUsers = () => {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const { data } = await axios.get(`${API}/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const filtered = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [users, search]);

  const toggleStatus = async (id: string) => {
    try {
      await axios.patch(
        `${API}/admin/users/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm("Delete this user?")) return;

    try {
      await axios.delete(`${API}/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-5xl font-bold text-[#B89D82]">Users</h1>

          <p className="text-white/50 mt-2">Manage all registered users</p>
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-4 mb-8"
      />

      <div className="space-y-5">
        {filtered.map((user) => (
          <div
            key={user._id}
            className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>

              <p className="text-white/50 mt-2">{user.email}</p>

              <p className="text-[#B89D82] mt-2">{user.role}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => toggleStatus(user._id)}
                className="px-5 py-2 rounded-lg bg-yellow-600"
              >
                {user.isActive === false ? "Activate" : "Suspend"}
              </button>

              <button
                onClick={() => deleteUser(user._id)}
                className="px-5 py-2 rounded-lg bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
