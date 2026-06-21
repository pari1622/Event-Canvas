import { Link } from "react-router-dom";

type CategoryCardProps = {
  title: string;
  image: string;
  description: string;
  slug: string;
};

export default function CategoryCard({
  title,
  image,
  description,
  slug,
}: CategoryCardProps) {
  return (
    <div className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300">
      <div className="h-60 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-semibold">{title}</h3>

        <p className="text-white/60 mt-4 leading-relaxed">{description}</p>

        <div className="flex gap-3 mt-6">
          <button
            className="
              flex-1
              bg-blue-500
              hover:bg-blue-600
              transition
              py-3
              rounded-xl
              font-medium
            "
          >
            Add To Bag
          </button>

          <Link
            to={`/products/${slug}`}
            className="
              flex-1
              border border-white/20
              hover:border-blue-500
              transition
              py-3
              rounded-xl
              text-center
              font-medium
            "
          >
            Know More
          </Link>
        </div>
      </div>
    </div>
  );
}
