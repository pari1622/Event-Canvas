import { useEffect, useState } from "react";
import { addToQuoteBag } from "../services/quoteBagService";

type Props = {
  open: boolean;
  onClose: () => void;
  product: any;
};

export default function QuoteCustomizationModal({
  open,
  onClose,
  product,
}: Props) {
  const [quantity, setQuantity] = useState(1);

  const [notes, setNotes] = useState("");

  const [needDesign, setNeedDesign] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState("");

  const [referenceImage, setReferenceImage] = useState("");

  const [loading, setLoading] = useState(false);

  const [customization, setCustomization] = useState({
    width: "",
    height: "",
    material: "",
    finish: "",
    color: "",
    gsm: "",
    printing: "",
    lamination: "",
    eyelets: "",
    remarks: "",
  });

  useEffect(() => {
    if (!open) return;

    setQuantity(1);
    setNotes("");
    setNeedDesign(false);
    setDeliveryDate("");
    setReferenceImage("");

    setCustomization({
      width: "",
      height: "",
      material: "",
      finish: "",
      color: "",
      gsm: "",
      printing: "",
      lamination: "",
      eyelets: "",
      remarks: "",
    });
  }, [open, product]);

  if (!open || !product) return null;

  const submit = async () => {
    try {
      setLoading(true);
      console.log("MODAL PAYLOAD", {
        productId: product._id,
        quantity,
        notes,
        needDesign,
        deliveryDate: deliveryDate || null,
        referenceImage,
        customization,
      });

      await addToQuoteBag({
        productId: product._id,
        quantity,
        notes,
        needDesign,
        deliveryDate: deliveryDate || null,
        referenceImage,
        customization,
      });

      alert("Added to Quote Bag");

      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-3xl border border-[#42362F] bg-[#120F0D] p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[4px] text-[#B89D82]">
              Quote Customization
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {product.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-full bg-[#2D241F] text-xl text-white hover:bg-[#42362F]"
          >
            ×
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm text-white/70">Quantity</label>

            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Required Delivery Date
            </label>

            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Width</label>

            <input
              value={customization.width}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  width: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Height</label>

            <input
              value={customization.height}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  height: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Material</label>

            <input
              value={customization.material}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  material: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Finish</label>

            <input
              value={customization.finish}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  finish: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Printing</label>

            <input
              value={customization.printing}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  printing: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">GSM</label>

            <input
              value={customization.gsm}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  gsm: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>
        </div>
        <div className="mt-6 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-white/70">
              Lamination
            </label>

            <input
              value={customization.lamination}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  lamination: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Eyelets</label>

            <input
              value={customization.eyelets}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  eyelets: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Colour Preference
            </label>

            <input
              value={customization.color}
              onChange={(e) =>
                setCustomization({
                  ...customization,
                  color: e.target.value,
                })
              }
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Reference Image URL
            </label>

            <input
              value={referenceImage}
              onChange={(e) => setReferenceImage(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              id="needDesign"
              type="checkbox"
              checked={needDesign}
              onChange={(e) => setNeedDesign(e.target.checked)}
            />

            <label htmlFor="needDesign" className="text-white">
              I need EventCanvas to create the design.
            </label>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">
              Additional Notes
            </label>

            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-[#42362F] bg-[#181412] p-3 text-white resize-none"
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-xl border border-[#42362F] px-6 py-3 text-white"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            disabled={loading}
            className="rounded-xl bg-[#B89D82] px-8 py-3 font-semibold text-[#110D0B] transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add To Quote Bag"}
          </button>
        </div>
      </div>
    </div>
  );
}
