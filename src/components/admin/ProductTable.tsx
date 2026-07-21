import ProductCard from "./ProductCard";
import EmptyProducts from "./EmptyProducts";

type Props = {
  products: any[];
  duplicateProduct: (id: string) => void;
  archiveProduct: (id: string) => void;
  deleteProduct: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleActive: (id: string) => void;
};

const ProductTable = ({
  products,
  duplicateProduct,
  archiveProduct,
  deleteProduct,
  toggleFeatured,
  toggleActive,
}: Props) => {
  if (products.length === 0) {
    return <EmptyProducts />;
  }

  return (
    <div className="space-y-5">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          duplicateProduct={duplicateProduct}
          archiveProduct={archiveProduct}
          deleteProduct={deleteProduct}
          toggleFeatured={toggleFeatured}
          toggleActive={toggleActive}
        />
      ))}
    </div>
  );
};
export default ProductTable;
