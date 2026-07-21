type Props = {
  selected: number;
  onDelete: () => void;
  onArchive: () => void;
};

export default function ProductToolbar({
  selected,
  onDelete,
  onArchive,
}: Props) {
  if (selected === 0) return null;

  return (
    <div className="mb-6 flex gap-4 rounded-xl bg-[#181412] border border-[#42362F] p-4">
      <span>{selected} selected</span>

      <button onClick={onArchive} className="px-4 py-2 rounded-lg bg-gray-700">
        Archive Selected
      </button>

      <button onClick={onDelete} className="px-4 py-2 rounded-lg bg-red-700">
        Delete Selected
      </button>
    </div>
  );
}
