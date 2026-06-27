import { useEffect, useMemo, useState } from "react";
import { customizationFields } from "../data/customizationFields";
import { useCart, type Customization } from "../context/CartContext";

type CustomizeDrawerProps = {
  open: boolean;
  onClose: () => void;
  service: string;
  itemId?: number;
};

const emptyCustomization: Customization = {
  quantity: 100,
  material: "",
  paper: "",
  size: "",
  lamination: "",
  printing: "",
  color: "",
  notes: "",
  file: "",
};

export default function CustomizeDrawer({
  open,
  onClose,
  service,
  itemId,
}: CustomizeDrawerProps) {
  const { items, updateCustomization } = useCart();

  const configuration = useMemo(() => {
    return customizationFields[service] ?? customizationFields.default;
  }, [service]);

  const currentItem = useMemo(() => {
    if (itemId !== undefined) {
      return items.find((item) => item.id === itemId);
    }

    return items.find((item) => item.name === service);
  }, [items, itemId, service]);

  const [formData, setFormData] = useState<Customization>(emptyCustomization);

  useEffect(() => {
    if (!open) return;

    if (currentItem?.customization) {
      setFormData({
        ...emptyCustomization,
        ...currentItem.customization,
      });
    } else {
      setFormData(emptyCustomization);
    }
  }, [open, currentItem]);

  const updateField = <K extends keyof Customization>(
    field: K,
    value: Customization[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    updateField("file", file.name);
  };

  const saveCustomization = () => {
    if (!currentItem) return;

    updateCustomization(currentItem.id, formData);

    onClose();
  };
  return (
    <>
      {/* BACKDROP */}

      <div
        onClick={onClose}
        className={`
        fixed inset-0
        bg-black/60
        backdrop-blur-sm
        transition-all
        duration-300
        z-[90]

        ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
      />

      {/* DRAWER */}

      <div
        className={`
        fixed
        top-20
        right-0
        h-[calc(100vh-80px)]
        w-full
        sm:w-[560px]
        bg-[#110D0B]
        border-l
        border-[#42362F]
        overflow-y-auto
        transition-transform
        duration-500
        z-[100]

        ${open ? "translate-x-0" : "translate-x-full"}
      `}
      >
        {/* HEADER */}

        <div className="sticky top-0 bg-[#110D0B] border-b border-[#42362F] px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p
                className="uppercase text-xs tracking-[0.3em]"
                style={{
                  color: "#8C7461",
                }}
              >
                Customize
              </p>

              <h2 className="text-3xl font-bold mt-2">{configuration.title}</h2>
            </div>

            <button onClick={onClose} className="text-3xl hover:text-[#B89D82]">
              ×
            </button>
          </div>
        </div>

        {/* BODY */}

        <div className="p-8 space-y-8">
          {configuration.fields.map((field) => {
            switch (field.type) {
              case "quantity":
                return (
                  <div key="quantity">
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <input
                      type="number"
                      min={1}
                      value={formData.quantity ?? ""}
                      placeholder="Enter Quantity"
                      onChange={(e) =>
                        updateField("quantity", Number(e.target.value))
                      }
                      className="
                      w-full
                      rounded-2xl
                      bg-white/5
                      border
                      border-[#42362F]
                      p-4
                      text-lg
                      outline-none
                      focus:border-[#8C7461]
                    "
                    />
                  </div>
                );

              case "material":
              case "paper":
              case "size":
              case "lamination":
              case "printing":
              case "color":
                return (
                  <div key={field.type}>
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {field.options?.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateField(field.type, option)}
                          className={`
                          px-5
                          py-3
                          rounded-full
                          border
                          transition-all

                          ${
                            formData[field.type as keyof Customization] ===
                            option
                              ? "bg-[#42362F] border-[#B89D82]"
                              : "bg-white/5 border-[#42362F]"
                          }
                        `}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                );

              case "upload":
                return (
                  <div key="upload">
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <label
                      className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      rounded-2xl
                      border-2
                      border-dashed
                      border-[#42362F]
                      h-44
                      cursor-pointer
                      hover:bg-white/5
                    "
                    >
                      <span className="text-5xl">📁</span>

                      <p className="mt-3 text-white/60">
                        {formData.file || "Click to Upload Design"}
                      </p>

                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFile}
                      />
                    </label>
                  </div>
                );

              case "notes":
                return (
                  <div key="notes">
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <textarea
                      rows={5}
                      value={formData.notes ?? ""}
                      onChange={(e) => updateField("notes", e.target.value)}
                      className="
                      w-full
                      rounded-2xl
                      bg-white/5
                      border
                      border-[#42362F]
                      p-4
                      outline-none
                      resize-none
                    "
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
          {/* SAVE BUTTON */}

          <button
            type="button"
            onClick={saveCustomization}
            className="
            w-full
            py-4
            rounded-xl
            text-lg
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-[1.02]
            hover:bg-[#5A4A40]
          "
            style={{
              backgroundColor: "#42362F",
            }}
          >
            Save Customization
          </button>
        </div>
      </div>
    </>
  );
}
