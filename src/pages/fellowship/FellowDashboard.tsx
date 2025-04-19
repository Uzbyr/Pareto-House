
import {
  Calendar as CalendarIcon,
  Users,
  Award,
  Gift,
  MessageCircle,
} from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";

const FellowDashboard = () => {
  const dashboardCards = [
    {
      icon: MessageCircle,
      title: "Discussions",
      description: "Join our WhatsApp group to connect with fellow members and participate in discussions.",
      linkTo: "/fellowship/discussions",
      linkText: "View Discussions"
    },
    {
      icon: CalendarIcon,
      title: "Events Calendar",
      description: "All upcoming mentor talks, workshops, and networking events. Never miss an opportunity to learn and connect.",
      linkTo: "/fellowship/events",
      linkText: "View Calendar"
    },
    {
      icon: Users,
      title: "Fellows Directory",
      description: "Connect with your cohort and explore fellow members' profiles. Build your network within the Pareto community.",
      linkTo: "/fellowship/directory",
      linkText: "View Directory"
    },
    {
      icon: Award,
      title: "Opportunities Board",
      description: "Exclusive internships, grants, and competitions for Pareto fellows. Find your next career-advancing opportunity.",
      linkTo: "/fellowship/opportunities",
      linkText: "View Opportunities"
    },
    {
      icon: Gift,
      title: "Fellowship Perks",
      description: "Exclusive benefits and resources for Pareto fellows. Claim your AWS, OpenAI credits and more.",
      linkTo: "/fellowship/perks",
      linkText: "View Perks"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <DashboardHeader title="Fellow Dashboard" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default FellowDashboard;
