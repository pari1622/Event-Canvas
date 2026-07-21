import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import ImageUploader from "../../components/admin/ImageUploader";
import SortableGallery from "../../components/admin/SortableGallery";

const AddProduct = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [categories, setCategories] = useState<any[]>([]);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    basePrice: "",
    minimumOrderQuantity: "",
    customizationAvailable: true,
    isFeatured: false,
    isActive: true,
    images: [] as string[],
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get(`${API}/admin/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCategories(data.categories);
      } catch (err) {
        console.error(err);
      }
    };

    loadCategories();
  }, [token]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/products`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Created");

      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-5xl font-bold text-[#B89D82] mb-10">Add Product</h1>

      <form onSubmit={submit} className="space-y-6 max-w-3xl">
        <input
          placeholder="Product Name"
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
          placeholder="Slug"
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
          placeholder="Description"
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
          value={form.category}
          onChange={(e) =>
            setForm({
              ...form,
              category: e.target.value,
            })
          }
        >
          <option value="">Select Category</option>

          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Base Price"
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
          placeholder="Minimum Order Quantity"
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

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Product Images</h3>

          <ImageUploader
            images={form.images}
            setImages={(images: string[]) =>
              setForm((prev) => ({
                ...prev,
                images,
              }))
            }
          />

          <SortableGallery
            images={form.images}
            setImages={(images: string[]) =>
              setForm((prev) => ({
                ...prev,
                images,
              }))
            }
          />
        </div>

        <button
          type="submit"
          className="px-8 py-4 rounded-xl bg-[#B89D82] text-black font-bold hover:opacity-90"
        >
          Create Product
        </button>
      </form>
    </AdminLayout>
  );
};

export default AddProduct;
