type Props = {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function DeleteConfirmModal({
  open,
  title,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#181412] border border-[#42362F] rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        <p className="text-white/60 mb-8">This action cannot be undone.</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-neutral-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
