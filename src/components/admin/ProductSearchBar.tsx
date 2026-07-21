type Props = {
  value: string;
  onChange: (value: string) => void;
};

const ProductSearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md rounded-xl border border-[#42362F] bg-[#181412] px-5 py-3 outline-none focus:border-[#B89D82]"
    />
  );
};

export default ProductSearchBar;
