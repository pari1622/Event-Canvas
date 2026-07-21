import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
};

const UserGrowthChart = ({ totalUsers, activeUsers, newUsers }: Props) => {
  const data = [
    {
      name: "New",
      users: newUsers,
    },
    {
      name: "Active",
      users: activeUsers,
    },
    {
      name: "Total",
      users: totalUsers,
    },
  ];

  return (
    <div className="rounded-2xl border border-[#42362F] bg-[#120F0D] p-6">
      <h2 className="text-2xl font-semibold mb-6">User Growth</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="users"
              stroke="#B89D82"
              fill="#B89D82"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserGrowthChart;
