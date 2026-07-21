import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import CategoryForm from "../../components/admin/CategoryForm";

const AddCategory = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const submit = async (form: any) => {
    try {
      await axios.post(`${API}/admin/categories`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Category Created");

      navigate("/admin/categories");
    } catch (error) {
      console.error(error);
      alert("Failed to create category");
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-5xl font-bold text-[#B89D82] mb-10">Add Category</h1>

      <CategoryForm onSubmit={submit} />
    </AdminLayout>
  );
};

export default AddCategory;
