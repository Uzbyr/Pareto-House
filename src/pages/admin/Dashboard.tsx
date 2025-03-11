
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ApplicationStats {
  total: number;
  approved: number;
  pending: number;
  rejected: number;
  byDay: { name: string; applications: number }[];
}

const Dashboard = () => {
  const { user } = useAuth();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Fetch application stats from Supabase
  const { data: stats, refetch, isFetching } = useQuery({
    queryKey: ['applicationStats'],
    queryFn: async (): Promise<ApplicationStats> => {
      // Get all applications
      const { data: applications, error } = await supabase
        .from('applications')
        .select('status, submission_date');
      
      if (error) throw error;

      // Calculate statistics
      const total = applications.length;
      const approved = applications.filter(app => app.status === 'approved').length;
      const pending = applications.filter(app => app.status === 'pending').length;
      const rejected = applications.filter(app => app.status === 'rejected').length;

      // Calculate applications by day for the last 7 days
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      const byDay = Array(7).fill(0).map((_, i) => {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const count = applications.filter(app => {
          const submissionDate = new Date(app.submission_date);
          return submissionDate.toDateString() === date.toDateString();
        }).length;
        return {
          name: dayNames[(7 + date.getDay() - i) % 7],
          applications: count
        };
      }).reverse();

      return {
        total,
        approved,
        pending,
        rejected,
        byDay
      };
    }
  });

  // Function to handle manual refresh
  const handleRefresh = async () => {
    await refetch();
    setLastUpdated(new Date());
    toast.success("Dashboard metrics refreshed");
  };

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
            disabled={isFetching}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
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
          <p className="text-4xl font-bold text-white mt-2">{stats?.total || 0}</p>
          <div className="mt-4">
            <Progress value={100} className="h-1 bg-zinc-700" />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Approved</h3>
          <p className="text-4xl font-bold text-green-500 mt-2">{stats?.approved || 0}</p>
          <div className="mt-4">
            <Progress 
              value={stats ? (stats.approved / stats.total) * 100 : 0} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Pending Review</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-2">{stats?.pending || 0}</p>
          <div className="mt-4">
            <Progress 
              value={stats ? (stats.pending / stats.total) * 100 : 0} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Rejected</h3>
          <p className="text-4xl font-bold text-red-500 mt-2">{stats?.rejected || 0}</p>
          <div className="mt-4">
            <Progress 
              value={stats ? (stats.rejected / stats.total) * 100 : 0} 
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
            <BarChart data={stats?.byDay || []}>
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
    </div>
  );
};

export default Dashboard;
