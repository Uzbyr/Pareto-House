
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  GraduationCap,
  Filter,
  BarChart3
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState } from "react";

// Mock data for the quality metrics
const universityData = [
  { name: "Stanford", score: 92, count: 28 },
  { name: "MIT", score: 89, count: 24 },
  { name: "Harvard", score: 86, count: 22 },
  { name: "Carnegie Mellon", score: 85, count: 19 },
  { name: "UC Berkeley", score: 84, count: 31 },
  { name: "Princeton", score: 82, count: 16 },
  { name: "UCLA", score: 78, count: 27 },
  { name: "NYU", score: 76, count: 25 },
  { name: "USC", score: 74, count: 20 },
  { name: "UIUC", score: 72, count: 18 }
];

const referralData = [
  { name: "Faculty Referral", score: 88, count: 42 },
  { name: "Alumni", score: 86, count: 38 },
  { name: "LinkedIn", score: 79, count: 64 },
  { name: "Twitter", score: 76, count: 56 },
  { name: "Website", score: 72, count: 85 },
  { name: "School Fair", score: 71, count: 48 },
  { name: "Email Campaign", score: 68, count: 73 },
  { name: "Instagram", score: 65, count: 52 },
  { name: "Hackathon", score: 81, count: 29 },
  { name: "Friend Referral", score: 74, count: 47 }
];

const QualityMetricsChart = () => {
  const [dataType, setDataType] = useState<'university' | 'referral'>('university');
  const [sortBy, setSortBy] = useState<'score' | 'count'>('score');
  
  // Choose data based on type
  const data = dataType === 'university' ? universityData : referralData;
  
  // Sort data
  const sortedData = [...data].sort((a, b) => b[sortBy] - a[sortBy]).slice(0, 10);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-xl font-bold text-white">Quality Metrics by Source</h2>
        <div className="flex gap-3">
          <div className="flex">
            <Button
              variant={dataType === 'university' ? "pink" : "outline"}
              className={dataType !== 'university' ? "border-zinc-700 text-gray-300 rounded-r-none" : "rounded-r-none"}
              onClick={() => setDataType('university')}
            >
              <GraduationCap className="h-4 w-4 mr-2" />
              Universities
            </Button>
            <Button
              variant={dataType === 'referral' ? "pink" : "outline"}
              className={dataType !== 'referral' ? "border-zinc-700 text-gray-300 rounded-l-none" : "rounded-l-none"}
              onClick={() => setDataType('referral')}
            >
              <Building2 className="h-4 w-4 mr-2" />
              Referral Sources
            </Button>
          </div>
          <div className="flex">
            <Button
              variant={sortBy === 'score' ? "pink" : "outline"}
              className={sortBy !== 'score' ? "border-zinc-700 text-gray-300 rounded-r-none" : "rounded-r-none"}
              onClick={() => setSortBy('score')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              By Quality
            </Button>
            <Button
              variant={sortBy === 'count' ? "pink" : "outline"}
              className={sortBy !== 'count' ? "border-zinc-700 text-gray-300 rounded-l-none" : "rounded-l-none"}
              onClick={() => setSortBy('count')}
            >
              <Filter className="h-4 w-4 mr-2" />
              By Volume
            </Button>
          </div>
        </div>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sortedData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" domain={[0, 100]} stroke="#9CA3AF" />
              <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={120} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                formatter={(value, name) => {
                  if (name === 'score') return [`${value} / 100`, 'Quality Score'];
                  return [value, 'Applications'];
                }}
              />
              <Legend />
              <Bar 
                dataKey="score" 
                fill="#EC4899" 
                name="Quality Score" 
                radius={[0, 4, 4, 0]}
                label={{ 
                  position: 'right',
                  formatter: (value: number) => `${value}`, 
                  fill: 'white' 
                }}
              />
              {sortBy === 'count' && (
                <Bar 
                  dataKey="count" 
                  fill="#8B5CF6" 
                  name="Applications" 
                  radius={[0, 4, 4, 0]} 
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Highest Quality Source</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {dataType === 'university' ? 'Stanford' : 'Faculty Referral'}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            92 / 100 average quality score
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Most Applicants</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {dataType === 'university' ? 'UC Berkeley' : 'Website'}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            {dataType === 'university' ? '31' : '85'} total applications
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Best Quality-Volume Ratio</h3>
          <p className="text-2xl font-bold text-white mt-2">
            {dataType === 'university' ? 'MIT' : 'Alumni'}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            High score with substantial volume
          </p>
        </Card>
      </div>
    </div>
  );
};

export default QualityMetricsChart;
