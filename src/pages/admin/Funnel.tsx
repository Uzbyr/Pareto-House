
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Sankey,
  Scatter,
  ScatterChart,
  ZAxis,
} from "recharts";

// Mock funnel data
const funnelStages = [
  { name: "Landing Page View", users: 10000, percentage: 100 },
  { name: "Form Started", users: 3200, percentage: 32 },
  { name: "Personal Info Completed", users: 2400, percentage: 24 },
  { name: "Education Info Completed", users: 1800, percentage: 18 },
  { name: "Resume Uploaded", users: 1300, percentage: 13 },
  { name: "Video Uploaded", users: 950, percentage: 9.5 },
  { name: "Form Submitted", users: 800, percentage: 8 },
];

// Time spent on each section in minutes
const timeSpentData = [
  { name: "Personal Info", timeSpent: 2.5 },
  { name: "Education", timeSpent: 3.2 },
  { name: "Resume Upload", timeSpent: 5.1 },
  { name: "Video Upload", timeSpent: 8.4 },
];

// Dropout rates for different segments
const dropoutData = [
  { x: 2.5, y: 35, z: 500, name: "Personal Info" },
  { x: 5.2, y: 28, z: 400, name: "Education" },
  { x: 8.7, y: 15, z: 300, name: "Resume Upload" },
  { x: 12.1, y: 12, z: 150, name: "Video Upload" },
];

const Funnel = () => {
  const exportFunnelData = () => {
    // In a real app, this would generate and download a report
    alert("Funnel analysis report export initiated");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Funnel Analysis</h1>
        <Button
          variant="outline"
          className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
          onClick={exportFunnelData}
        >
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>

      {/* Application Funnel */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Application Funnel</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={funnelStages}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis
                dataKey="name"
                type="category"
                scale="band"
                stroke="#9CA3AF"
                width={180}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
                formatter={(value) => [`${value} users`, "Users"]}
              />
              <Bar
                dataKey="users"
                fill="#EC4899"
                label={{ position: "right", fill: "#fff" }}
                barSize={30}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Conversion Rates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Spent Analysis */}
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Time Spent by Section</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeSpentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                  formatter={(value) => [`${value} minutes`, "Average Time"]}
                />
                <Bar
                  dataKey="timeSpent"
                  fill="#8B5CF6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Dropout Analysis */}
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Dropout Analysis</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="time" 
                  unit="min" 
                  stroke="#9CA3AF"
                  label={{ value: 'Average Time (min)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="dropout" 
                  unit="%" 
                  stroke="#9CA3AF"
                  label={{ value: 'Dropout Rate (%)', angle: -90, position: 'insideLeft' }}
                />
                <ZAxis type="number" dataKey="z" range={[100, 800]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                  formatter={(value, name, props) => {
                    if (name === "dropout") return [`${value}%`, "Dropout Rate"];
                    if (name === "time") return [`${value} min`, "Avg Time Spent"];
                    return [value, name];
                  }}
                  cursor={{ strokeDasharray: "3 3" }}
                />
                <Scatter name="Sections" data={dropoutData} fill="#EC4899" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* User Flow Analysis */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Conversion Statistics by Stage</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-zinc-900 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Stage</th>
                <th scope="col" className="px-6 py-3">Users</th>
                <th scope="col" className="px-6 py-3">Drop-off</th>
                <th scope="col" className="px-6 py-3">Conversion</th>
                <th scope="col" className="px-6 py-3">Avg Time</th>
              </tr>
            </thead>
            <tbody>
              {funnelStages.map((stage, index) => {
                const prevStage = index > 0 ? funnelStages[index - 1] : null;
                const dropOff = prevStage
                  ? prevStage.users - stage.users
                  : 0;
                const dropOffPercentage = prevStage
                  ? ((prevStage.users - stage.users) / prevStage.users) * 100
                  : 0;
                const stageConversion = prevStage
                  ? (stage.users / prevStage.users) * 100
                  : 100;
                
                return (
                  <tr key={stage.name} className="border-b border-zinc-700 hover:bg-zinc-900/50">
                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {stage.name}
                    </th>
                    <td className="px-6 py-4">{stage.users.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      {index > 0 ? (
                        <>
                          {dropOff.toLocaleString()} ({dropOffPercentage.toFixed(1)}%)
                        </>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {index > 0 ? `${stageConversion.toFixed(1)}%` : "100%"}
                    </td>
                    <td className="px-6 py-4">
                      {timeSpentData.find(t => t.name.includes(stage.name.split(" ")[0]))
                        ? `${timeSpentData.find(t => t.name.includes(stage.name.split(" ")[0]))?.timeSpent} min`
                        : "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Funnel;
