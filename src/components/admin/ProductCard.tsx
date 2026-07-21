import ProductBadges from "./ProductBadges";
import ProductActions from "./ProductActions";

type Props = {
  product: any;
  duplicateProduct: (id: string) => void;
  archiveProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleActive: (id: string) => void;
};

const ProductCard = ({
  product,
  duplicateProduct,
  archiveProduct,
  deleteProduct,
  toggleFeatured,
  toggleActive,
}: Props) => {
  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-semibold">{product.name}</h2>

        <p className="text-white/50 mt-2">{product.category?.name}</p>

        <p className="text-[#B89D82] mt-3">₹{product.basePrice}</p>

        <ProductBadges product={product} />
      </div>

      <ProductActions
        product={product}
        duplicateProduct={duplicateProduct}
        archiveProduct={archiveProduct}
        deleteProduct={deleteProduct}
        toggleFeatured={toggleFeatured}
        toggleActive={toggleActive}
      />
    </div>
  );
};

export default ProductCard;
