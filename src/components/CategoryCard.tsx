import { useState } from "react";
import { useCart } from "../context/CartContext";
import CustomizeDrawer from "./CustomizeDrawer";

type CategoryCardProps = {
  title: string;
  image: string;
  description: string;
  slug: string;
  products: string[];
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
  const { items, addToCart } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [selectedService, setSelectedService] = useState("");

  const [selectedItemId, setSelectedItemId] = useState<number>();

  const handleAdd = (service: string) => {
    addToCart({
      id: Date.now() + Math.random(),
      name: service,
      category: title,
      image,
      addedAt: Date.now(),
    });
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
            src={image}
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
              {products.map((service) => {
                const cartItem = items.find(
                  (item) => item.name === service && item.category === title,
                );

                return (
                  <div
                    key={service}
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
                      <h4 className="font-medium text-white">{service}</h4>
                      {!cartItem ? (
                        <button
                          onClick={() => handleAdd(service)}
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
                          setSelectedService(service);
                          setSelectedItemId(cartItem.id);
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
