
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for the dashboard
const applicationStats = {
  total: 156,
  approved: 42,
  pending: 89,
  rejected: 25,
  completionRate: 68,
};

const conversionData = [
  { name: "Landing", value: 2400 },
  { name: "Form Start", value: 1398 },
  { name: "Personal", value: 1000 },
  { name: "Education", value: 800 },
  { name: "Experience", value: 650 },
  { name: "Submitted", value: 480 },
];

const weeklyApplications = [
  { name: "Sun", applications: 4 },
  { name: "Mon", applications: 7 },
  { name: "Tue", applications: 8 },
  { name: "Wed", applications: 12 },
  { name: "Thu", applications: 10 },
  { name: "Fri", applications: 15 },
  { name: "Sat", applications: 6 },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400">
          Welcome back, <span className="font-medium text-white">{user?.email.split("@")[0]}</span>
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Total Applications</h3>
          <p className="text-4xl font-bold text-white mt-2">{applicationStats.total}</p>
          <div className="mt-4">
            <Progress value={100} className="h-1 bg-zinc-700" />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Approved</h3>
          <p className="text-4xl font-bold text-green-500 mt-2">{applicationStats.approved}</p>
          <div className="mt-4">
            <Progress 
              value={(applicationStats.approved / applicationStats.total) * 100} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Pending Review</h3>
          <p className="text-4xl font-bold text-yellow-500 mt-2">{applicationStats.pending}</p>
          <div className="mt-4">
            <Progress 
              value={(applicationStats.pending / applicationStats.total) * 100} 
              className="h-1 bg-zinc-700" 
            />
          </div>
        </Card>
        
        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h3 className="text-gray-400 text-sm font-medium">Rejected</h3>
          <p className="text-4xl font-bold text-red-500 mt-2">{applicationStats.rejected}</p>
          <div className="mt-4">
            <Progress 
              value={(applicationStats.rejected / applicationStats.total) * 100} 
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
            <BarChart data={weeklyApplications}>
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
          {conversionData.map((stage, index) => {
            const percentage = Math.round((stage.value / conversionData[0].value) * 100);
            return (
              <div key={stage.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{stage.name}</span>
                  <span className="text-gray-400">{stage.value} users ({percentage}%)</span>
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
