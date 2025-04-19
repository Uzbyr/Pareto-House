
import { Link } from "react-router-dom"; 
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import {
  Calendar as CalendarIcon,
  Users,
  Award,
  ArrowRight,
  Gift,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FellowDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Fellow Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Welcome back, {user?.email ? user.email.split("@")[0] : "Fellow"}
        </p>
      </div>

      {/* Main sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Discussions */}
        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <MessageCircle className="h-6 w-6 text-pareto-pink mr-2" />
            <h2 className="text-xl font-bold text-white">Discussions</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Join our WhatsApp group to connect with fellow members and participate in discussions.
          </p>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700 mt-4"
              asChild
            >
              <Link to="/fellowship/discussions" className="flex items-center justify-center">
                View Discussions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Events Calendar */}
        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <CalendarIcon className="h-6 w-6 text-pareto-pink mr-2" />
            <h2 className="text-xl font-bold text-white">Events Calendar</h2>
          </div>
          <p className="text-gray-400 mb-4">
            All upcoming mentor talks, workshops, and networking events. Never
            miss an opportunity to learn and connect.
          </p>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700 mt-4"
              asChild
            >
              <Link to="/fellowship/events" className="flex items-center justify-center">
                View Calendar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Fellows Directory */}
        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-pareto-pink mr-2" />
            <h2 className="text-xl font-bold text-white">Fellows Directory</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Connect with your cohort and explore fellow members' profiles. Build
            your network within the Pareto community.
          </p>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700 mt-4"
              asChild
            >
              <Link to="/fellowship/directory" className="flex items-center justify-center">
                View Directory
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Opportunities Board */}
        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Award className="h-6 w-6 text-pareto-pink mr-2" />
            <h2 className="text-xl font-bold text-white">
              Opportunities Board
            </h2>
          </div>
          <p className="text-gray-400 mb-4">
            Exclusive internships, grants, and competitions for Pareto fellows.
            Find your next career-advancing opportunity.
          </p>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700 mt-4"
              asChild
            >
              <Link to="/fellowship/opportunities" className="flex items-center justify-center">
                View Opportunities
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>

        {/* Fellowship Perks */}
        <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <Gift className="h-6 w-6 text-pareto-pink mr-2" />
            <h2 className="text-xl font-bold text-white">Fellowship Perks</h2>
          </div>
          <p className="text-gray-400 mb-4">
            Exclusive benefits and resources for Pareto fellows. Claim your AWS, OpenAI credits and more.
          </p>
          <div className="mt-auto">
            <Button
              variant="outline"
              className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700 mt-4"
              asChild
            >
              <Link to="/fellowship/perks" className="flex items-center justify-center">
                View Perks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FellowDashboard;

