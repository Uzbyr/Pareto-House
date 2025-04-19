import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home,
  Calendar,
  Users,
  Award,
  MessageCircle,
  LogOut,
  User,
  Gift,
  Menu,
} from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";

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
    { label: "Perks", path: "/fellowship/perks", icon: Gift },
    {
      label: "Discussions",
      path: "/fellowship/discussions",
      icon: MessageCircle,
    }
  ];

  const NavigationContent = () => (
    <>
      <SidebarHeader className="p-4 border-b border-zinc-700">
        <h1 className="text-xl font-bold text-pareto-pink">Pareto Fellowship</h1>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto py-4">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.path}
                tooltip={item.label}
              >
                <Link to={item.path} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-zinc-700">
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
            asChild
          >
            <Link to="/fellowship/profile" className="flex items-center justify-center">
              <User className="h-4 w-4 mr-2" />
              Profile
            </Link>
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
      </SidebarFooter>
    </>
  );

  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-zinc-900">
        {/* Desktop Sidebar */}
        <Sidebar className="hidden md:flex" variant="sidebar">
          <NavigationContent />
        </Sidebar>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden absolute top-4 left-4">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] bg-zinc-800 p-0 border-zinc-700">
            <NavigationContent />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default FellowLayout;
