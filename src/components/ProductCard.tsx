import { useCart } from "../context/CartContext";

type ProductProps = {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
};

export default function ProductCard({
  id,
  name,
  category,
  description,
  image,
}: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <img src={image} alt={name} className="h-52 w-full object-cover" />

      <div className="p-5">
        <p className="text-blue-400 text-xs uppercase">{category}</p>

        <h3 className="text-xl font-semibold mt-2">{name}</h3>

        <p className="text-white/60 text-sm mt-3">{description}</p>

        <button
          onClick={() =>
            addToCart({
              id,
              name,
              category,
              image,
              addedAt: Date.now(),
            })
          }
          className="mt-5 w-full bg-blue-500 py-3 rounded-lg"
        >
          Add To Bag
        </button>
      </div>
    </div>
  );
}
