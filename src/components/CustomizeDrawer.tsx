import { useMemo, useState } from "react";
import { customizationFields } from "../data/customizationFields";
import { useCart } from "../context/CartContext";

type CustomizeDrawerProps = {
  open: boolean;
  onClose: () => void;
  service: string;
};

export default function CustomizeDrawer({
  open,
  onClose,
  service,
}: CustomizeDrawerProps) {
  const { items, updateCustomization } = useCart();

  const configuration = useMemo(() => {
    return customizationFields[service] ?? customizationFields.default;
  }, [service]);

  const existingItem = items.find((item) => item.name === service);

  const existingCustomization = existingItem?.customization ?? {};

  const [formData, setFormData] = useState<any>({
    quantity: existingCustomization.quantity ?? 100,

    material: existingCustomization.material ?? "",

    paper: existingCustomization.paper ?? "",

    size: existingCustomization.size ?? "",

    lamination: existingCustomization.lamination ?? "",

    printing: existingCustomization.printing ?? "",

    color: existingCustomization.color ?? "",

    notes: existingCustomization.notes ?? "",

    file: existingCustomization.file ?? "",
  });

  const selectOption = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const increaseQuantity = () => {
    setFormData((prev: any) => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  };

  const decreaseQuantity = () => {
    setFormData((prev: any) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFormData((prev: any) => ({
      ...prev,
      file: file.name,
    }));
  };

  const saveCustomization = () => {
    if (!existingItem) return;

    updateCustomization(existingItem.id, formData);

    onClose();
  };

  return (
    <>
      {/* BACKDROP */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
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
          <div className="flex justify-between items-center">
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

        <div className="p-8 space-y-8">
          {configuration.fields.map((field) => {
            switch (field.type) {
              case "quantity":
                return (
                  <div>
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <input
                      type="number"
                      min={1}
                      placeholder="Enter quantity (e.g. 500)"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData((prev: any) => ({
                          ...prev,
                          quantity: Number(e.target.value),
                        }))
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
      transition-all
    "
                    />
                  </div>
                );

              case "material":
              case "paper":
              case "lamination":
              case "printing":
              case "color":
              case "size":
                return (
                  <div key={field.type}>
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {field.options?.map((option) => (
                        <button
                          key={option}
                          onClick={() => selectOption(field.type, option)}
                          className={`
                            px-5
                            py-3
                            rounded-full
                            transition-all
                            duration-300

                            ${
                              formData[field.type] === option
                                ? "bg-[#42362F] border border-[#B89D82]"
                                : "bg-white/5 border border-[#42362F]"
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
                  <div key={field.type}>
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
                        transition
                      "
                    >
                      <span className="text-5xl">📁</span>

                      <p className="mt-3 text-white/60">
                        {formData.file
                          ? formData.file
                          : "Click to Upload Design"}
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
                  <div key={field.type}>
                    <h3 className="text-xl font-semibold mb-5">
                      {field.label}
                    </h3>

                    <textarea
                      rows={5}
                      value={formData.notes}
                      onChange={(e) => selectOption("notes", e.target.value)}
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
