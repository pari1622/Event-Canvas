type Props = {
  product: any;
};

const ProductBadges = ({ product }: Props) => {
  return (
    <div className="flex gap-3 mt-3 flex-wrap">
      {product.isFeatured && (
        <span className="px-3 py-1 rounded-full bg-yellow-600 text-xs">
          Featured
        </span>
      )}

      {product.isActive ? (
        <span className="px-3 py-1 rounded-full bg-green-600 text-xs">
          Active
        </span>
      ) : (
        <span className="px-3 py-1 rounded-full bg-red-600 text-xs">
          Inactive
        </span>
      )}

      {product.customizationAvailable && (
        <span className="px-3 py-1 rounded-full bg-blue-600 text-xs">
          Customizable
        </span>
      )}
    </div>
  );
};

export default ProductBadges;
