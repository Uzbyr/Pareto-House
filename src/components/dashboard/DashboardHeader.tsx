
import { useAuth } from "@/contexts/AuthContext";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader = ({ title }: DashboardHeaderProps) => {
  const { user } = useAuth();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="text-gray-400 mt-2">
        Welcome back, {user?.email ? user.email.split("@")[0] : "Fellow"}
      </p>
    </div>
  );
};

export default DashboardHeader;
