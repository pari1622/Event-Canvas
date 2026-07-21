import { Link } from "react-router-dom";

type Props = {
  category: any;
  deleteCategory: (id: string) => void;
  toggleFeatured: (id: string) => void;
  toggleActive: (id: string) => void;
};

const CategoryCard = ({
  category,
  deleteCategory,
  toggleFeatured,
  toggleActive,
}: Props) => {
  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] overflow-hidden">
      <div className="flex">
        <div className="w-44 h-40 bg-[#181412] flex items-center justify-center">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white/40">No Image</span>
          )}
        </div>

        <div className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{category.name}</h2>

              <p className="mt-2 text-white/50">{category.description}</p>

              <div className="flex gap-3 mt-4">
                {category.isFeatured && (
                  <span className="px-3 py-1 rounded-full bg-yellow-600 text-sm">
                    Featured
                  </span>
                )}

                {category.isActive ? (
                  <span className="px-3 py-1 rounded-full bg-green-600 text-sm">
                    Active
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-red-600 text-sm">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                to={`/admin/categories/edit/${category._id}`}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-center"
              >
                Edit
              </Link>

              <button
                onClick={() => toggleFeatured(category._id)}
                className="px-5 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700"
              >
                Featured
              </button>

              <button
                onClick={() => toggleActive(category._id)}
                className="px-5 py-2 rounded-lg bg-green-600 hover:bg-green-700"
              >
                Active
              </button>

              <button
                onClick={() => deleteCategory(category._id)}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
