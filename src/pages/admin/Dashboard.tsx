
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const { user, siteMetrics, refreshMetrics } = useAuth();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Function to handle manual refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshMetrics();
    setLastUpdated(new Date());
    toast.success("Dashboard metrics refreshed");
    setTimeout(() => setIsRefreshing(false), 800); // Add a small delay for UX
  };

  // Update the last updated time when metrics change
  useEffect(() => {
    setLastUpdated(new Date());
  }, [siteMetrics]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-400 text-sm flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <p className="text-gray-400">
            Welcome, <span className="font-medium text-white">{user?.email.split("@")[0]}</span>
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Total Applications</h3>
          <p className="text-4xl font-bold text-white mt-2">{siteMetrics.applications.total}</p>
          <div className="mt-4">
            <Progress value={100} className="h-1 bg-zinc-700" />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Approved</h3>
          <p className="text-4xl font-bold text-green-500 mt-2">{siteMetrics.applications.approved}</p>
          <div className="mt-4">
            <Progress 
              value={(siteMetrics.applications.approved / siteMetrics.applications.total) * 100} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Pending Review</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-2">{siteMetrics.applications.pending}</p>
          <div className="mt-4">
            <Progress 
              value={(siteMetrics.applications.pending / siteMetrics.applications.total) * 100} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Rejected</h3>
          <p className="text-4xl font-bold text-red-500 mt-2">{siteMetrics.applications.rejected}</p>
          <div className="mt-4">
            <Progress 
              value={(siteMetrics.applications.rejected / siteMetrics.applications.total) * 100} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
      </div>

      {/* Weekly Applications Chart */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Weekly Application Submissions</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={siteMetrics.applications.byDay}>
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
              <Bar dataKey="applications" fill="#EC4899" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Funnel Overview */}
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-6">Application Funnel Overview</h2>
        <div className="space-y-4">
          {siteMetrics.conversionFunnel.stages.map((stage, index) => {
            const percentage = Math.round((stage.value / siteMetrics.conversionFunnel.stages[0].value) * 100);
            return (
              <div key={stage.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{stage.name}</span>
                  <span className="text-gray-400">{stage.value.toLocaleString()} users ({percentage}%)</span>
                </div>
                <Progress value={percentage} className="h-2 bg-zinc-700" />
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
