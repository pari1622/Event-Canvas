import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  revenue: number;
  monthlyRevenue: number;
};

const RevenueChart = ({ revenue, monthlyRevenue }: Props) => {
  const data = [
    {
      name: "Total",
      value: revenue,
    },
    {
      name: "This Month",
      value: monthlyRevenue,
    },
  ];

  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold mb-6">Revenue Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#B89D82" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
