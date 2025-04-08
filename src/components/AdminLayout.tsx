
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  FileText,
  Home,
  LineChart,
  LogOut,
  Settings,
  Users,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
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
    { label: "Dashboard", path: "/admin/dashboard", icon: Home },
    { 
      label: "Applications", 
      path: "/admin/applications", 
      icon: FileText,
      role: "admin" as const
    },
    { 
      label: "Analytics", 
      path: "/admin/analytics", 
      icon: BarChart3,
      role: "admin" as const
    },
    { 
      label: "Funnel Analysis", 
      path: "/admin/funnel", 
      icon: LineChart,
      role: "admin" as const
    },
    {
      label: "Admin Users",
      path: "/admin/users",
      icon: Users,
      role: "super_admin" as const,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
      role: "admin" as const,
    },
    // New routes for fellows and alumni
    {
      label: "Fellowship",
      path: "/fellowship",
      icon: GraduationCap,
      role: "fellow" as const,
    },
    {
      label: "Alumni Network",
      path: "/alumni",
      icon: BookOpen,
      role: "alumni" as const,
    },
  ];

  // Filter menu items based on user role
  const filteredNavItems = navItems.filter((item) => {
    if (!item.role) return true;
    
    // Super admins can see everything
    if (user?.role === "super_admin") return true;
    
    // Admins can see admin items
    if (user?.role === "admin" && 
        (item.role === "admin" || !["super_admin", "fellow", "alumni"].includes(item.role))) 
      return true;
    
    // Fellows and alumni can only see their specific items and general items
    if (user?.role === item.role || !item.role) return true;
    
    return false;
  });

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-800 border-r border-zinc-700 flex flex-col">
        <div className="p-4 border-b border-zinc-700">
          <h1 className="text-xl font-bold text-pareto-pink">Pareto Admin</h1>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {filteredNavItems.map((item) => (
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
          <Button
            variant="outline"
            className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
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

export default AdminLayout;
