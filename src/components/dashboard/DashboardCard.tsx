
import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface DashboardCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
}

const DashboardCard = ({
  icon: Icon,
  title,
  description,
  linkTo,
  linkText,
}: DashboardCardProps) => {
  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6 flex flex-col h-full">
      <div className="flex items-center mb-4">
        <Icon className="h-6 w-6 text-pareto-pink mr-2" />
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="mt-auto">
        <Button
          variant="outline"
          className="w-full text-gray-300 border-zinc-700 hover:bg-zinc-700 mt-4"
          asChild
        >
          <Link to={linkTo} className="flex items-center justify-center">
            {linkText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default DashboardCard;
