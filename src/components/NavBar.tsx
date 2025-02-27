
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "../contexts/AuthContext";

const NavBar = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-pareto-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            {!isHomePage && (
              <Link
                to="/"
                className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 inline-flex items-center gap-2"
              >
                <span className="w-5 h-5">←</span>
                Back
              </Link>
            )}
            {isHomePage && (
              <Link
                to="/"
                className="text-xl font-bold text-black dark:text-white hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300"
              >
                Pareto Fellows
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Only show login button in NavBar on non-homepage routes */}
            {!isHomePage && (
              <>
                {isAuthenticated ? (
                  <Button variant="outline" size="sm" onClick={logout} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Fellow</span>
                    <LogOut className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="login" size="sm" onClick={login} className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Log in as Fellow
                  </Button>
                )}
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
