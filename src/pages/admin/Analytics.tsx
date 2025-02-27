
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Calendar, Download, RefreshCw } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const COLORS = ["#EC4899", "#8B5CF6", "#3B82F6", "#10B981"];
const timeRanges = ["7 days", "14 days", "30 days", "90 days"];

const Analytics = () => {
  const { siteMetrics, refreshMetrics } = useAuth();
  const [timeRange, setTimeRange] = useState("14 days");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to handle refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetrics();
    toast.success("Analytics data refreshed");
    setTimeout(() => setIsRefreshing(false), 800); // Add a small delay for UX
  };

  const exportAnalytics = () => {
    // In a real app, this would generate and download a comprehensive report
    toast.success("Analytics report export initiated");
  };

  // Filter visitor data based on selected time range
  const getFilteredVisitorData = () => {
    const days = parseInt(timeRange.split(' ')[0]);
    return siteMetrics.visitors.byDate.slice(-days);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Analytics</h1>
        <div className="flex gap-3">
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "pink" : "outline"}
                size="sm"
                className={
                  timeRange !== range ? "border-zinc-700 text-gray-300 hover:bg-zinc-800" : ""
                }
                onClick={() => setTimeRange(range)}
              >
                {range}
              </Button>
            ))}
          </div>
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
            onClick={exportAnalytics}
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Visitors Over Time */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Visitors Over Time</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getFilteredVisitorData()}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1F2937",
                  borderColor: "#374151",
                  color: "#F9FAFB",
                }}
              />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#EC4899"
                fillOpacity={1}
                fill="url(#colorVisitors)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Traffic Sources</h2>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={siteMetrics.trafficSources}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {siteMetrics.trafficSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    color: "#F9FAFB",
                  }}
                  formatter={(value) => [`${value} visits`, "Visits"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Page Popularity */}
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-6">Page Popularity</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={siteMetrics.pagePopularity}>
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
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Visitor Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Unique Visitors</h3>
          <p className="text-4xl font-bold text-white mt-2">{siteMetrics.visitors.total.toLocaleString()}</p>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <span className="inline-block mr-1">↑</span> 12.5% from last period
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Average Session Duration</h3>
          <p className="text-4xl font-bold text-white mt-2">4:32</p>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <span className="inline-block mr-1">↑</span> 8.3% from last period
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Bounce Rate</h3>
          <p className="text-4xl font-bold text-white mt-2">42.3%</p>
          <p className="text-sm text-red-500 flex items-center mt-2">
            <span className="inline-block mr-1">↑</span> 3.1% from last period
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Conversion Rate</h3>
          <p className="text-4xl font-bold text-white mt-2">
            {(siteMetrics.applications.total / siteMetrics.visitors.total * 100).toFixed(1)}%
          </p>
          <p className="text-sm text-green-500 flex items-center mt-2">
            <span className="inline-block mr-1">↑</span> 5.2% from last period
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
