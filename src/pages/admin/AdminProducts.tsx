import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import API from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import ProductFilters from "../../components/admin/ProductFilters";
import ProductTable from "../../components/admin/ProductTable";
import Pagination from "../../components/admin/Pagination";

const AdminProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page, setPage] = useState(1);

  const PRODUCTS_PER_PAGE = 8;

  const loadProducts = async () => {
    const token = localStorage.getItem("token");

    const { data } = await axios.get(`${API}/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setProducts(data.products);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${API}/admin/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    loadProducts();
  };

  const duplicateProduct = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `${API}/admin/products/${id}/duplicate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadProducts();
  };

  const archiveProduct = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.patch(
      `${API}/admin/products/${id}/archive`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadProducts();
  };

  const toggleFeatured = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.patch(
      `${API}/admin/products/${id}/featured`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadProducts();
  };

  const toggleActive = async (id: string) => {
    const token = localStorage.getItem("token");

    await axios.patch(
      `${API}/admin/products/${id}/active`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    loadProducts();
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      )
      .filter((product) =>
        categoryFilter ? product.category?.name === categoryFilter : true,
      );
  }, [products, search, categoryFilter]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-[#B89D82]">Products</h1>

        <Link
          to="/admin/products/add"
          className="px-6 py-3 rounded-xl bg-[#B89D82] text-black font-semibold"
        >
          + Add Product
        </Link>
      </div>

      <ProductFilters
        products={products}
        search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      <ProductTable
        products={paginatedProducts}
        duplicateProduct={duplicateProduct}
        archiveProduct={archiveProduct}
        deleteProduct={deleteProduct}
        toggleFeatured={toggleFeatured}
        toggleActive={toggleActive}
      />
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </AdminLayout>
  );
};

export default AdminProducts;
