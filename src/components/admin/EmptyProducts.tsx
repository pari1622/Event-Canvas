const EmptyProducts = () => {
  return (
    <div className="border border-dashed border-[#42362F] rounded-2xl p-20 text-center">
      <h2 className="text-3xl font-bold mb-3">No Products Found</h2>

      <p className="text-white/50">
        Try changing the filters or add a new product.
      </p>
    </div>
  );
};

export default EmptyProducts;
