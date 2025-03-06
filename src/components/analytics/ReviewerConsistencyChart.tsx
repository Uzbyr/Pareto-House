
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const reviewerData = [
  { name: "Sarah K.", consistency: 92, accepted: 24, rejected: 76 },
  { name: "Michael T.", consistency: 87, accepted: 31, rejected: 69 },
  { name: "Ava J.", consistency: 95, accepted: 18, rejected: 82 },
  { name: "David L.", consistency: 89, accepted: 26, rejected: 74 },
  { name: "Sophia R.", consistency: 91, accepted: 22, rejected: 78 },
];

const ReviewerConsistencyChart = () => {
  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6 mb-6">
      <h2 className="text-xl font-bold text-white mb-6">Reviewer Consistency</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={reviewerData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                borderColor: "#374151",
                color: "#F9FAFB",
              }}
            />
            <Legend />
            <Bar
              name="Consistency Score"
              dataKey="consistency"
              fill="#8B5CF6"
            />
            <Bar 
              name="Acceptance Rate (%)" 
              dataKey="accepted" 
              fill="#10B981" 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-400 mt-4">
        Consistency score is calculated based on decision alignment with other reviewers on the same applications.
        Higher scores indicate greater consistency with the overall team's decisions.
      </p>
    </Card>
  );
};

export default ReviewerConsistencyChart;
