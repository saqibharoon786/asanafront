import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { ListFilter } from "lucide-react";

const data = [
  { section: "A", value: 8 },
  { section: "B", value: 7 },
  { section: "C", value: 9 },
  { section: "D", value: 6 },
  { section: "E", value: 7.5 },
  { section: "F", value: 6.5 },
  { section: "G", value: 8.5 },
];

const pieData = [{ name: "Completed", value: 4, color: "#A7A2F7" }];

const lineData = [
  { assignee: "A", tasks: 10 },
  { assignee: "B", tasks: 9 },
  { assignee: "C", tasks: 8 },
  { assignee: "D", tasks: 7 },
  { assignee: "E", tasks: 6 },
  { assignee: "F", tasks: 6 },
  { assignee: "G", tasks: 6 },
];

const areaData = [
  { date: "01/30", total: 0, completed: 0 },
  { date: "01/31", total: 0, completed: 0 },
  { date: "02/01", total: 0, completed: 0 },
  { date: "02/02", total: 0, completed: 0 },
  { date: "02/03", total: 0, completed: 0 },
  { date: "02/04", total: 0, completed: 0 },
  { date: "02/05", total: 3, completed: 3 },
  { date: "02/06", total: 3, completed: 3 },
  { date: "02/07", total: 4, completed: 4 },
  { date: "02/08", total: 4, completed: 4 },
  { date: "02/09", total: 4, completed: 4 },
  { date: "02/10", total: 4, completed: 4 },
  { date: "02/11", total: 4, completed: 4 },
];

const Card = ({ children, className }) => (
  <div
    className={`bg-gray-800 p-4 rounded-lg shadow-md border border-gray-500 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ children, className }) => (
  <button
    className={`bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded ${className}`}
  >
    {children}
  </button>
);

const ProjectDashboard = () => {
  return (
    <div className="bg-gray-900 p-6 text-white">
      <div className="grid grid-cols-4 gap-6">
        {[
          "Completed Tasks",
          "Incomplete Tasks",
          "Overdue Tasks",
          "Total Tasks",
        ].map((title, index) => (
          <Card key={index} className="flex flex-col items-center">
            <p className="text-lg">{title}</p>
            <h1 className="text-3xl font-bold">
              {index === 0 || index === 3 ? 4 : 0}
            </h1>
            <ListFilter className="text-gray-400" />
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="flex flex-col items-center bg-gray-900 text-white p-4 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-600 bg-white/10">
          <h2 className="text-lg font-semibold self-start mb-2">
            Incomplete tasks by section
          </h2>
          <Card className="w-full">
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="white"
                    opacity={0.2}
                  />
                  <XAxis dataKey="section" stroke="white" />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ fill: "#444" }}
                    wrapperStyle={{ backgroundColor: "#222", color: "white" }}
                  />
                  <Bar
                    dataKey="value"
                    fill="#D8D8F6"
                    barSize={40}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col items-center bg-gray-900 text-white p-4 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-600 bg-white/10">
          <h2 className="text-lg font-semibold self-start mb-2">
            Total tasks by completion status
          </h2>
          <Card className="w-full">
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#A7A2F7"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend iconSize={10} wrapperStyle={{ color: "white" }} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center bg-gray-900 text-white p-4 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-600 bg-white/10">
          <h2 className="text-lg font-semibold self-start mb-2">
            Upcoming tasks by assignee
          </h2>
          <Card className="w-full">
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={lineData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="white"
                    opacity={0.2}
                  />
                  <XAxis dataKey="assignee" stroke="white" />
                  <YAxis hide />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    wrapperStyle={{ backgroundColor: "#222", color: "white" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tasks"
                    stroke="#A7A2F7"
                    strokeWidth={2}
                    dot={{ fill: "#A7A2F7", r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col items-center bg-gray-900 text-white p-4 rounded-2xl shadow-lg w-full max-w-4xl border border-gray-600 bg-white/10">
          <h2 className="text-lg font-semibold self-start mb-2">
            Task completion over time
          </h2>
          <Card className="w-full">
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={areaData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="white"
                    opacity={0.2}
                  />
                  <XAxis dataKey="date" stroke="white" />
                  <YAxis stroke="white" />
                  <Tooltip
                    wrapperStyle={{ backgroundColor: "#222", color: "white" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#CBC3E3"
                    fill="#CBC3E3"
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    stroke="#A7A2F7"
                    fill="#A7A2F7"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
