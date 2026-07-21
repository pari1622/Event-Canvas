import { useState } from "react";
import { useCart } from "../context/CartContext";
import CustomizeDrawer from "./CustomizeDrawer";

type CategoryCardProps = {
  title: string;
  image: string;
  description: string;
  slug: string;
  products: any[];
  expanded: boolean;
  onToggle: () => void;
};

export default function CategoryCard({
  title,
  image,
  description,
  products,
  expanded,
  onToggle,
}: CategoryCardProps) {
  const { items } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedService, setSelectedService] = useState("");

  const [selectedItemId, setSelectedItemId] = useState<number>();

  const handleAdd = async (product: any) => {
    try {
      const { addToQuoteBag } = await import("../services/quoteBagService");

      await addToQuoteBag(product._id);

      alert("Added to Quote Bag");
    } catch (error) {
      console.error(error);
      alert("Failed to add to Quote Bag");
    }
  };
  return (
    <>
      <div
        className="
          group
          rounded-3xl
          overflow-hidden
          bg-white/[0.04]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:bg-white/[0.06]
        "
        style={{
          border: "1px solid #42362F",
        }}
      >
        {/* IMAGE */}

        <div className="overflow-hidden h-60">
          <img
            src={image || "https://placehold.co/600x400?text=EventCanvas"}
            alt={title}
            className="
              w-full
              h-full
              object-cover
              group-hover:scale-105
              transition
              duration-700
            "
          />
        </div>

        {/* CONTENT */}

        <div className="p-6">
          <h2
            className="text-2xl font-bold"
            style={{
              color: "#B89D82",
            }}
          >
            {title}
          </h2>

          <p className="mt-4 text-white/60 leading-relaxed">{description}</p>

          {/* SERVICES BUTTON */}

          <button
            onClick={onToggle}
            className="
              mt-8
              w-full
              flex
              items-center
              justify-between
              rounded-xl
              px-5
              py-3
              font-semibold
              text-white
              transition
            "
            style={{
              backgroundColor: "#42362F",
            }}
          >
            <span>Services Offered</span>

            <span className="text-xl">{expanded ? "−" : "+"}</span>
          </button>

          {/* SERVICES */}

          <div
            className={`
              overflow-hidden
              transition-all
              duration-500
              ${expanded ? "max-h-[900px] mt-5" : "max-h-0"}
            `}
          >
            <div className="space-y-4">
              {products.map((product) => {
                const cartItem = items.find(
                  (item) =>
                    item.name === product.name && item.category === title,
                );

                return (
                  <div
                    key={product._id}
                    className="
                      rounded-xl
                      bg-white/[0.03]
                      p-4
                      transition-all
                      duration-300
                      hover:bg-white/[0.07]
                    "
                    style={{
                      border: "1px solid #42362F",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{product.name}</h4>
                      {!cartItem ? (
                        <button
                          onClick={() => handleAdd(product)}
                          className="
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            transition
                          "
                          style={{
                            backgroundColor: "#42362F",
                          }}
                        >
                          Add To Bag
                        </button>
                      ) : (
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: "#B89D82",
                          }}
                        >
                          ✓ Added
                        </span>
                      )}
                    </div>

                    {/* CUSTOMIZE BUTTON */}

                    {cartItem && (
                      <button
                        onClick={() => {
                          setSelectedService(product.name);
                          setDrawerOpen(true);
                        }}
                        className="
                          mt-4
                          w-full
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          px-4
                          py-3
                          transition-all
                        "
                        style={{
                          backgroundColor: "#2D241F",
                          border: "1px solid #42362F",
                          color: "#B89D82",
                        }}
                      >
                        <span className="font-medium">Customize</span>

                        <span className="text-lg">→</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <CustomizeDrawer
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
          setSelectedItemId(undefined);
        }}
        service={selectedService}
        itemId={selectedItemId}
      />
    </>
  );
}
