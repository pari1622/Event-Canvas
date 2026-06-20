type Props = {
  title: string;
  image: string;
  description: string;
};

export default function CategoryCard({ title, image, description }: Props) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-blue-500/40 transition">
      <img src={image} alt={title} className="h-56 w-full object-cover" />

      <div className="p-6">
        <h3 className="text-2xl font-semibold">{title}</h3>

        <p className="text-white/60 mt-4">{description}</p>

        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl">
            Add To Bag
          </button>

          <button className="flex-1 border border-white/20 hover:border-blue-500 transition py-3 rounded-xl">
            Know More
          </button>
        </div>
      </div>
    </div>
  );
}
