
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
  LineChart,
  Line,
} from "recharts";

const universityData = [
  { name: "Stanford", quality: 92, count: 48 },
  { name: "MIT", quality: 90, count: 42 },
  { name: "Harvard", quality: 88, count: 36 },
  { name: "UC Berkeley", quality: 86, count: 45 },
  { name: "CMU", quality: 85, count: 32 },
  { name: "Caltech", quality: 83, count: 18 },
  { name: "Princeton", quality: 82, count: 24 },
];

const channelData = [
  { name: "Direct", quality: 84, count: 120 },
  { name: "Referral", quality: 91, count: 95 },
  { name: "University", quality: 86, count: 78 },
  { name: "LinkedIn", quality: 79, count: 65 },
  { name: "Twitter", quality: 74, count: 42 },
  { name: "Instagram", quality: 72, count: 35 },
];

const QualityMetricsChart = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Application Quality by University</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={universityData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis 
                yAxisId="left" 
                stroke="#9CA3AF" 
                domain={[60, 100]}
                label={{ 
                  value: 'Quality Score', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#9CA3AF'
                }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#9CA3AF"
                label={{ 
                  value: 'Application Count', 
                  angle: 90, 
                  position: 'insideRight',
                  fill: '#9CA3AF'
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
              <Bar 
                yAxisId="left"
                dataKey="quality" 
                name="Quality Score" 
                fill="#EC4899" 
              />
              <Bar 
                yAxisId="right"
                dataKey="count" 
                name="Application Count" 
                fill="#3B82F6" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Application Quality by Source</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={channelData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis 
                yAxisId="left" 
                stroke="#9CA3AF" 
                domain={[60, 100]}
                label={{ 
                  value: 'Quality Score', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#9CA3AF'
                }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="#9CA3AF"
                label={{ 
                  value: 'Application Count', 
                  angle: 90, 
                  position: 'insideRight',
                  fill: '#9CA3AF'
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
                dataKey="quality" 
                name="Quality Score" 
                stroke="#EC4899" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="count" 
                name="Application Count" 
                stroke="#3B82F6" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <p className="text-sm text-gray-400 mt-4 px-6">
        Quality score is a composite metric based on factors like completeness of application, 
        academic achievements, project portfolio quality, and interview performance (if applicable).
        Scores range from 0-100, with higher scores indicating stronger applications.
      </p>
    </div>
  );
};

export default QualityMetricsChart;
