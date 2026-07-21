type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ProductSearchBar({ value, onChange }: Props) {
  return (
    <input
      placeholder="Search products..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full max-w-md rounded-xl bg-[#181412] border border-[#42362F] px-5 py-3 outline-none"
    />
  );
}
