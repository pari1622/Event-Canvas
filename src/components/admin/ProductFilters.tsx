import ProductSearchBar from "./ProductSearchBar";

type Props = {
  products: any[];
  search: string;
  setSearch: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
};

const ProductFilters = ({
  products,
  search,
  setSearch,
  categoryFilter,
  setCategoryFilter,
}: Props) => {
  return (
    <div className="flex gap-4 mb-8">
      <select
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
        className="rounded-xl border border-[#42362F] bg-[#181412] px-5 py-3"
      >
        <option value="">All Categories</option>

        {[...new Set(products.map((p) => p.category?.name))].map((cat: any) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <ProductSearchBar value={search} onChange={setSearch} />
    </div>
  );
};

export default ProductFilters;
