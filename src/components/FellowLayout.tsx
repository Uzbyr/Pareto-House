
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  BookOpen,
  Users,
  Award,
  MessageCircle,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface FellowLayoutProps {
  children: React.ReactNode;
}

const FellowLayout = ({ children }: FellowLayoutProps) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("There was an issue logging out");
    }
  };

  const navItems = [
    { label: "Dashboard", path: "/fellowship", icon: Home },
    { label: "Fellows Directory", path: "/fellowship/directory", icon: Users },
    { label: "Events Calendar", path: "/fellowship/events", icon: Calendar },
    { label: "Opportunities", path: "/fellowship/opportunities", icon: Award },
    { label: "Resources", path: "/fellowship/resources", icon: BookOpen },
    {
      label: "Discussions",
      path: "/fellowship/discussions",
      icon: MessageCircle,
    },
    { label: "Settings", path: "/fellowship/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-800 border-r border-zinc-700 flex flex-col">
        <div className="p-4 border-b border-zinc-700">
          <h1 className="text-xl font-bold text-pareto-pink">
            Pareto Fellowship
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-pareto-pink text-black font-medium"
                      : "text-gray-300 hover:bg-zinc-700"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-white">{user?.email}</p>
              <p className="text-xs text-gray-400 capitalize">
                {user?.role?.replace("_", " ")}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 text-gray-300 border-zinc-700 hover:bg-zinc-700"
              onClick={() => navigate("/fellowship/profile")}
              type="button" 
            >
              <User className="h-4 w-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-gray-300 border-zinc-700 hover:bg-zinc-700"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-zinc-900 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default FellowLayout;
