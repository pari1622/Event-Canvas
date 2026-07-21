import { Link } from "react-router-dom";

type Props = {
  product: any;
  duplicateProduct: (id: string) => void;
  archiveProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleActive: (id: string) => void;
};

const ProductActions = ({
  product,
  duplicateProduct,
  archiveProduct,
  deleteProduct,
  toggleFeatured,
  toggleActive,
}: Props) => {
  return (
    <div className="flex flex-col items-end gap-3">
      <div className="flex gap-2">
        <button
          onClick={() => toggleFeatured(product._id)}
          className="px-3 py-2 rounded-lg bg-yellow-600 text-sm"
        >
          {product.isFeatured ? "★ Featured" : "☆ Feature"}
        </button>

        <button
          onClick={() => toggleActive(product._id)}
          className="px-3 py-2 rounded-lg bg-green-700 text-sm"
        >
          {product.isActive ? "Deactivate" : "Activate"}
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => duplicateProduct(product._id)}
          className="px-5 py-2 rounded-lg bg-purple-700"
        >
          Duplicate
        </button>

        <Link
          to={`/admin/products/edit/${product._id}`}
          className="px-5 py-2 rounded-lg bg-blue-600"
        >
          Edit
        </Link>

        <button
          onClick={() => archiveProduct(product._id)}
          className="px-5 py-2 rounded-lg bg-gray-700"
        >
          Archive
        </button>

        <button
          onClick={() => deleteProduct(product._id)}
          className="px-5 py-2 rounded-lg bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductActions;
