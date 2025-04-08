import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Application } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { Calendar, BookOpen, Users, Award } from "lucide-react";

const FellowDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fellowApplication, setFellowApplication] =
    useState<Application | null>(null);

  // In a real app, you would fetch fellow-specific data here
  // This is just placeholder content for now

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Fellow Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user?.email ? user.email.split("@")[0] : "Fellow"}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Calendar className="h-5 w-5 text-pareto-pink mr-2" />
            <h3 className="text-gray-400 text-sm font-medium">
              Upcoming Events
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">3</p>
          <p className="text-gray-400 text-sm mt-2">
            Next: Founder Showcase (Apr 15)
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <BookOpen className="h-5 w-5 text-pareto-pink mr-2" />
            <h3 className="text-gray-400 text-sm font-medium">
              Learning Resources
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">12</p>
          <p className="text-gray-400 text-sm mt-2">
            4 new resources this week
          </p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Users className="h-5 w-5 text-pareto-pink mr-2" />
            <h3 className="text-gray-400 text-sm font-medium">
              Fellow Network
            </h3>
          </div>
          <p className="text-2xl font-bold text-white">127</p>
          <p className="text-gray-400 text-sm mt-2">Connect with your cohort</p>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col">
          <div className="flex items-center mb-4">
            <Award className="h-5 w-5 text-pareto-pink mr-2" />
            <h3 className="text-gray-400 text-sm font-medium">Your Progress</h3>
          </div>
          <p className="text-2xl font-bold text-white">78%</p>
          <p className="text-gray-400 text-sm mt-2">Fellowship completion</p>
        </Card>
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 p-6 lg:col-span-2">
          <h2 className="text-xl font-bold text-white mb-4">
            Your Fellowship Journey
          </h2>
          <div className="space-y-4">
            <div className="bg-zinc-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Onboarding</h3>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">
                  Complete
                </span>
              </div>
            </div>
            <div className="bg-zinc-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Founder Matching</h3>
                <span className="px-2 py-1 bg-green-900 text-green-300 text-xs rounded-full">
                  Complete
                </span>
              </div>
            </div>
            <div className="bg-zinc-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Project Development</h3>
                <span className="px-2 py-1 bg-yellow-900 text-yellow-300 text-xs rounded-full">
                  In Progress
                </span>
              </div>
            </div>
            <div className="bg-zinc-700 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-white">Demo Day Preparation</h3>
                <span className="px-2 py-1 bg-zinc-600 text-gray-300 text-xs rounded-full">
                  Not Started
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Announcements</h2>
          <div className="space-y-4">
            <div className="border-l-2 border-pareto-pink pl-4">
              <p className="text-gray-300">
                New workshop added: "Fundraising Strategies"
              </p>
              <p className="text-xs text-gray-400 mt-1">1 day ago</p>
            </div>
            <div className="border-l-2 border-pareto-pink pl-4">
              <p className="text-gray-300">
                Founder Showcase scheduled for April 15th
              </p>
              <p className="text-xs text-gray-400 mt-1">3 days ago</p>
            </div>
            <div className="border-l-2 border-pareto-pink pl-4">
              <p className="text-gray-300">
                Office hours with mentor Jane Smith open for booking
              </p>
              <p className="text-xs text-gray-400 mt-1">1 week ago</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FellowDashboard;
