import { useState } from "react";
import ImageUploader from "./ImageUploader";
import ImagePreview from "./ImagePreview";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
};

const CategoryForm = ({ initialData, onSubmit }: Props) => {
  const [form, setForm] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    banner: initialData?.banner || "",
    isFeatured: initialData?.isFeatured || false,
    isActive: initialData?.isActive ?? true,
    displayOrder: initialData?.displayOrder || 0,
    seoTitle: initialData?.seoTitle || "",
    seoDescription: initialData?.seoDescription || "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    await onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <input
        placeholder="Category Name"
        className="w-full p-4 rounded-xl bg-[#181412]"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <textarea
        rows={4}
        placeholder="Description"
        className="w-full p-4 rounded-xl bg-[#181412]"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      <div className="space-y-3">
        <h3 className="font-semibold">Category Image</h3>

        <ImageUploader
          images={form.image ? [form.image] : []}
          setImages={(images) =>
            setForm({
              ...form,
              image: images[0] || "",
            })
          }
        />

        <ImagePreview
          images={form.image ? [form.image] : []}
          setImages={(images) =>
            setForm({
              ...form,
              image: images[0] || "",
            })
          }
        />
      </div>

      <input
        type="number"
        placeholder="Display Order"
        className="w-full p-4 rounded-xl bg-[#181412]"
        value={form.displayOrder}
        onChange={(e) =>
          setForm({
            ...form,
            displayOrder: Number(e.target.value),
          })
        }
      />

      <input
        placeholder="SEO Title"
        className="w-full p-4 rounded-xl bg-[#181412]"
        value={form.seoTitle}
        onChange={(e) =>
          setForm({
            ...form,
            seoTitle: e.target.value,
          })
        }
      />

      <textarea
        rows={3}
        placeholder="SEO Description"
        className="w-full p-4 rounded-xl bg-[#181412]"
        value={form.seoDescription}
        onChange={(e) =>
          setForm({
            ...form,
            seoDescription: e.target.value,
          })
        }
      />

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.isFeatured}
          onChange={(e) =>
            setForm({
              ...form,
              isFeatured: e.target.checked,
            })
          }
        />
        Featured Category
      </label>

      <label className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) =>
            setForm({
              ...form,
              isActive: e.target.checked,
            })
          }
        />
        Active Category
      </label>

      <button
        type="submit"
        className="px-8 py-4 rounded-xl bg-[#B89D82] text-black font-bold"
      >
        Save Category
      </button>
    </form>
  );
};

export default CategoryForm;
