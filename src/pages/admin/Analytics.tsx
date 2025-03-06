
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
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { 
  Calendar, 
  Download, 
  RefreshCw, 
  Building2, 
  Users, 
  Clock, 
  GraduationCap,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QualityMetricsChart from "@/components/analytics/QualityMetricsChart";
import ReviewerConsistencyChart from "@/components/analytics/ReviewerConsistencyChart";
import DemographicsChart from "@/components/analytics/DemographicsChart";
import TimeToReviewChart from "@/components/analytics/TimeToReviewChart";

const COLORS = ["#EC4899", "#8B5CF6", "#3B82F6", "#10B981"];
const timeRanges = ["7 days", "14 days", "30 days", "90 days"];

const Analytics = () => {
  const { siteMetrics, refreshMetrics } = useAuth();
  const [timeRange, setTimeRange] = useState("14 days");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

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

  // Filter application data based on selected time range
  const getFilteredApplicationData = () => {
    const days = parseInt(timeRange.split(' ')[0]);
    // Since we're using byDay instead of byDate in the applications data
    // We'll just take the last few days worth of data
    return siteMetrics.applications.byDay.slice(-days);
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

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-zinc-800 border-zinc-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-zinc-700">
            Overview
          </TabsTrigger>
          <TabsTrigger value="applications" className="data-[state=active]:bg-zinc-700">
            Applications
          </TabsTrigger>
          <TabsTrigger value="sources" className="data-[state=active]:bg-zinc-700">
            Sources & Quality
          </TabsTrigger>
          <TabsTrigger value="reviewers" className="data-[state=active]:bg-zinc-700">
            Reviewers
          </TabsTrigger>
          <TabsTrigger value="demographics" className="data-[state=active]:bg-zinc-700">
            Demographics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-zinc-800 border-zinc-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium">Total Applications</h3>
                  <p className="text-4xl font-bold text-white mt-2">{siteMetrics.applications.total}</p>
                </div>
                <div className="bg-pink-500/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-pink-500" />
                </div>
              </div>
              <p className="text-sm text-green-500 flex items-center mt-2">
                <span className="inline-block mr-1">↑</span> 15.2% from last month
              </p>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium">Acceptance Rate</h3>
                  <p className="text-4xl font-bold text-white mt-2">12.4%</p>
                </div>
                <div className="bg-purple-500/20 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <p className="text-sm text-red-500 flex items-center mt-2">
                <span className="inline-block mr-1">↓</span> 2.1% from last month
              </p>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-400 text-sm font-medium">Avg. Review Time</h3>
                  <p className="text-4xl font-bold text-white mt-2">1.8 <span className="text-xl">days</span></p>
                </div>
                <div className="bg-blue-500/20 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <p className="text-sm text-green-500 flex items-center mt-2">
                <span className="inline-block mr-1">↑</span> Improved 0.5 days since last month
              </p>
            </Card>
          </div>

          <Card className="bg-zinc-800 border-zinc-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6">Application Trend</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={getFilteredApplicationData()}>
                  <defs>
                    <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorApprove" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
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
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stackId="1"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorApps)"
                    name="Applications"
                  />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card className="bg-zinc-800 border-zinc-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Application Status Breakdown</h2>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Pending", value: 230 },
                        { name: "Approved", value: 48 },
                        { name: "Rejected", value: 142 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={110}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label
                    >
                      <Cell fill="#EAB308" />
                      <Cell fill="#10B981" />
                      <Cell fill="#EF4444" />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#374151",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-zinc-800 border-zinc-700 p-6">
              <h2 className="text-xl font-bold text-white mb-6">Completion Rate by Stage</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Started Form", rate: 100 },
                      { name: "Completed Info", rate: 82 },
                      { name: "Added Resume", rate: 64 },
                      { name: "Added Video", rate: 47 },
                      { name: "Final Submit", rate: 42 }
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        borderColor: "#374151",
                        color: "#F9FAFB",
                      }}
                      formatter={(value) => [`${value}%`, "Completion Rate"]}
                    />
                    <Bar dataKey="rate" fill="#EC4899" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Sources & Quality Tab */}
        <TabsContent value="sources">
          <QualityMetricsChart />
        </TabsContent>

        {/* Reviewers Tab */}
        <TabsContent value="reviewers">
          <ReviewerConsistencyChart />
          <TimeToReviewChart />
        </TabsContent>

        {/* Demographics Tab */}
        <TabsContent value="demographics">
          <DemographicsChart />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
