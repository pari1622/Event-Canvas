import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import CategoryCard from "../../components/admin/CategoryCard";

const AdminCategories = () => {
  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${API}/admin/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCategories(data.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filtered = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const deleteCategory = async (id: string) => {
    try {
      await axios.delete(`${API}/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadCategories();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const toggleFeatured = async (id: string) => {
    try {
      await axios.patch(
        `${API}/admin/categories/featured/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleActive = async (id: string) => {
    try {
      await axios.patch(
        `${API}/admin/categories/active/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      loadCategories();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-5xl font-bold text-[#B89D82]">Categories</h1>

          <p className="mt-2 text-white/50">Manage all product categories</p>
        </div>

        <Link
          to="/admin/categories/add"
          className="px-6 py-3 rounded-xl bg-[#B89D82] text-black font-semibold"
        >
          + Add Category
        </Link>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search Categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl bg-[#181412] border border-[#42362F] p-4"
        />
      </div>

      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-10 text-center text-white/50">
            No Categories Found
          </div>
        ) : (
          filtered.map((category) => (
            <CategoryCard
              key={category._id}
              category={category}
              deleteCategory={deleteCategory}
              toggleFeatured={toggleFeatured}
              toggleActive={toggleActive}
            />
          ))
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminCategories;
