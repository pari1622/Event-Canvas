import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { getProductById } from "../services/productService";
import { addToQuoteBag } from "../services/quoteBagService";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleAddToQuoteBag = async () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: `/products/${id}`,
          message: "Please login to add products to your Quote Bag.",
        },
      });

      return;
    }

    try {
      setLoading(true);

      await addToQuoteBag(product._id);

      alert("Product added to Quote Bag.");
    } catch (error) {
      console.error(error);
      alert("Failed to add product to Quote Bag.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;

      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <>
        <Navbar />

        <div
          className="min-h-screen flex items-center justify-center text-white"
          style={{
            backgroundColor: "#110D0B",
          }}
        >
          Loading...
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: "#110D0B",
          paddingTop: "120px",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}

          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl border border-[#42362F]"
            />
          </div>

          {/* Product Details */}

          <div className="text-white">
            <p className="uppercase tracking-[4px] text-[#B89D82] mb-2">
              {product.category?.name}
            </p>

            <h1 className="text-5xl font-bold mb-6">{product.name}</h1>

            <h2 className="text-3xl font-bold text-[#B89D82] mb-8">
              ₹ {product.basePrice?.toLocaleString("en-IN")}
            </h2>

            <p className="text-gray-300 leading-8 mb-8">
              {product.description}
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">Category</span>

                <span>{product.category?.name}</span>
              </div>

              <div className="flex justify-between border-b border-white/10 pb-4">
                <span className="text-gray-400">Minimum Order Quantity</span>

                <span>{product.minimumOrderQuantity}</span>
              </div>
            </div>

            <button
              onClick={handleAddToQuoteBag}
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold transition hover:scale-[1.02] disabled:opacity-60"
              style={{
                backgroundColor: "#B89D82",
                color: "#110D0B",
              }}
            >
              {loading ? "Adding..." : "Add to Quote Bag"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
