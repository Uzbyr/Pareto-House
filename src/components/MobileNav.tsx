
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const MobileNav = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex items-center md:hidden">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" className="p-2">
            <Menu className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-[60vh] pt-10">
          <nav className="flex flex-col gap-6 px-4">
            <Link
              to="/mentors"
              className={`text-xl py-4 border-b ${
                isActive("/mentors")
                  ? "text-pareto-pink font-medium border-pareto-pink"
                  : "text-black/80 dark:text-white/80 border-black/10 dark:border-white/10"
              }`}
            >
              Mentors
            </Link>
            <Link
              to="/perks"
              className={`text-xl py-4 border-b ${
                isActive("/perks")
                  ? "text-pareto-pink font-medium border-pareto-pink"
                  : "text-black/80 dark:text-white/80 border-black/10 dark:border-white/10"
              }`}
            >
              Perks
            </Link>
            <Link
              to="/faq"
              className={`text-xl py-4 border-b ${
                isActive("/faq")
                  ? "text-pareto-pink font-medium border-pareto-pink"
                  : "text-black/80 dark:text-white/80 border-black/10 dark:border-white/10"
              }`}
            >
              FAQ
            </Link>
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileNav;
