import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState<any>({
    name: "",
    slug: "",
    description: "",
    category: "",
    basePrice: "",
    minimumOrderQuantity: "",
    customizationAvailable: true,
    isFeatured: false,
    isActive: true,
    images: [],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const categoryRes = await axios.get(`${API}/admin/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(categoryRes.data.categories);

        const productRes = await axios.get(`${API}/products/${id}`);

        setForm(productRes.data.product);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, [id, token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`${API}/admin/products/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Updated");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Failed to update product");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-5xl font-bold text-[#B89D82] mb-10">Edit Product</h1>

      <form onSubmit={submit} className="space-y-6 max-w-3xl">
        <input
          className="w-full p-4 rounded-xl bg-[#181412]"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full p-4 rounded-xl bg-[#181412]"
          value={form.slug}
          onChange={(e) =>
            setForm({
              ...form,
              slug: e.target.value,
            })
          }
        />

        <textarea
          rows={5}
          className="w-full p-4 rounded-xl bg-[#181412]"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <select
          className="w-full p-4 rounded-xl bg-[#181412]"
          value={form.category?._id || form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        >
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="w-full p-4 rounded-xl bg-[#181412]"
          value={form.basePrice}
          onChange={(e) =>
            setForm({
              ...form,
              basePrice: e.target.value,
            })
          }
        />

        <input
          type="number"
          className="w-full p-4 rounded-xl bg-[#181412]"
          value={form.minimumOrderQuantity}
          onChange={(e) =>
            setForm({
              ...form,
              minimumOrderQuantity: e.target.value,
            })
          }
        />

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.customizationAvailable}
            onChange={(e) =>
              setForm({
                ...form,
                customizationAvailable: e.target.checked,
              })
            }
          />
          Customization Available
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(e) =>
              setForm({
                ...form,
                isFeatured: e.target.checked,
              })
            }
          />
          Featured Product
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm({
                ...form,
                isActive: e.target.checked,
              })
            }
          />
          Active Product
        </label>

        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-[#B89D82] text-black font-bold"
        >
          Save Changes
        </button>
      </form>
    </AdminLayout>
  );
};

export default EditProduct;
