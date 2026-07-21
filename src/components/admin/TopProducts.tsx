import { useEffect, useState } from "react";
import axios from "axios";
import API from "../../services/api";

const TopProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${API}/admin/products/top`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProducts(data.products);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);

  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold mb-6">Top Products</h2>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex justify-between border-b border-[#42362F] pb-3"
          >
            <div>
              <p className="font-semibold">{product.name}</p>

              <p className="text-white/50 text-sm">{product.category?.name}</p>
            </div>

            <p className="text-[#B89D82] font-semibold">{product.salesCount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
