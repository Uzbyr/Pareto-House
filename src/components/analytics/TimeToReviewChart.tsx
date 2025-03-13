import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Bar,
  BarChart,
} from "recharts";

const timelineData = [
  { date: "Jan 1", avgTime: 4.2, applications: 15 },
  { date: "Jan 8", avgTime: 3.8, applications: 22 },
  { date: "Jan 15", avgTime: 3.1, applications: 28 },
  { date: "Jan 22", avgTime: 2.5, applications: 18 },
  { date: "Jan 29", avgTime: 2.2, applications: 32 },
  { date: "Feb 5", avgTime: 1.9, applications: 30 },
  { date: "Feb 12", avgTime: 1.8, applications: 25 },
  { date: "Feb 19", avgTime: 1.7, applications: 34 },
];

const reviewerTimeData = [
  { name: "Sarah K.", avgTime: 1.3 },
  { name: "Michael T.", avgTime: 2.1 },
  { name: "Ava J.", avgTime: 1.5 },
  { name: "David L.", avgTime: 1.9 },
  { name: "Sophia R.", avgTime: 1.6 },
];

const TimeToReviewChart = () => {
  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6 mt-6">
      <h2 className="text-xl font-bold text-white mb-6">
        Time to Review Performance
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Review Time Trend
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timelineData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis
                  yAxisId="left"
                  stroke="#9CA3AF"
                  label={{
                    value: "Avg. Days",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9CA3AF",
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#9CA3AF"
                  label={{
                    value: "Applications",
                    angle: 90,
                    position: "insideRight",
                    fill: "#9CA3AF",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="avgTime"
                  name="Avg. Days to Review"
                  stroke="#EC4899"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="applications"
                  name="Applications"
                  stroke="#3B82F6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-white mb-4">
            Reviewer Performance
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reviewerTimeData}
                layout="vertical"
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  type="number"
                  stroke="#9CA3AF"
                  label={{
                    value: "Avg. Days to Review",
                    position: "insideBottom",
                    offset: -5,
                    fill: "#9CA3AF",
                  }}
                />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#9CA3AF"
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                  formatter={(value) => [
                    `${value} days`,
                    "Avg. Time to Review",
                  ]}
                />
                <Bar dataKey="avgTime" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-4">
        Time to review is measured from when an application is submitted to when
        a final decision is made. Target review time is 2 days or less to ensure
        applicants receive timely responses.
      </p>
    </Card>
  );
};

export default TimeToReviewChart;
