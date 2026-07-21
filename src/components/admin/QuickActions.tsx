import { Link } from "react-router-dom";

const actions = [
  {
    title: "Products",
    path: "/admin/products",
  },
  {
    title: "Categories",
    path: "/admin/categories",
  },
  {
    title: "Orders",
    path: "/admin/orders",
  },
  {
    title: "Users",
    path: "/admin/users",
  },
];

const QuickActions = () => {
  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            to={action.path}
            className="rounded-xl border border-[#42362F] bg-[#181412] p-5 hover:bg-[#201A17] transition text-center font-semibold"
          >
            {action.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
