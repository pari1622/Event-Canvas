import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

type Props = {
  pending: number;
  completed: number;
};

const OrdersChart = ({ pending, completed }: Props) => {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];

  const COLORS = ["#D97706", "#10B981"];

  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold mb-6">Orders Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={110} label>
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrdersChart;
