
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { toast } from "sonner";

const Funnel = () => {
  const { siteMetrics, refreshMetrics } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetrics();
    toast.success("Funnel data refreshed");
    setTimeout(() => setIsRefreshing(false), 800); // Add a small delay for UX
  };

  const exportFunnelData = () => {
    // In a real app, this would generate and download a report
    toast.success("Funnel analysis report export initiated");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Funnel Analysis</h1>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-zinc-700 text-gray-300 hover:bg-zinc-800"
            onClick={exportFunnelData}
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Application Funnel */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Application Funnel</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={siteMetrics.conversionFunnel.stages}
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
                formatter={(value) => [`${value.toLocaleString()} users`, "Users"]}
              />
              <Bar
                dataKey="value"
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
              <BarChart data={siteMetrics.conversionFunnel.timeSpent}>
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
                <Scatter name="Sections" data={siteMetrics.conversionFunnel.dropoffRates} fill="#EC4899" />
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
              {siteMetrics.conversionFunnel.stages.map((stage, index) => {
                const prevStage = index > 0 ? siteMetrics.conversionFunnel.stages[index - 1] : null;
                const dropOff = prevStage
                  ? prevStage.value - stage.value
                  : 0;
                const dropOffPercentage = prevStage
                  ? ((prevStage.value - stage.value) / prevStage.value) * 100
                  : 0;
                const stageConversion = prevStage
                  ? (stage.value / prevStage.value) * 100
                  : 100;
                
                const stageName = stage.name.split(" ")[0];
                const timeSpentItem = siteMetrics.conversionFunnel.timeSpent.find(t => 
                  t.name.includes(stageName)
                );
                
                return (
                  <tr key={stage.name} className="border-b border-zinc-700 hover:bg-zinc-900/50">
                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                      {stage.name}
                    </th>
                    <td className="px-6 py-4">{stage.value.toLocaleString()}</td>
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
                      {timeSpentItem ? `${timeSpentItem.timeSpent} min` : "-"}
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
