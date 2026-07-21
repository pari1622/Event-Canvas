import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

type Props = {
  products: number;
  categories: number;
};

const CategoryChart = ({ products, categories }: Props) => {
  const data = [
    {
      name: "Products",
      value: products,
    },
    {
      name: "Categories",
      value: categories,
    },
  ];

  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold mb-6">Inventory Distribution</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={110} label>
              <Cell fill="#B89D82" />
              <Cell fill="#5F9EA0" />
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;
