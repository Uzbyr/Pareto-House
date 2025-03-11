
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-pareto-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10 min-h-16">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img
              src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
              alt="Pareto Logo"
              className="w-36 md:w-44"
            />
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/mentors"
              className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
            >
              Mentors
            </Link>
            <Link
              to="/tech-partners"
              className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
            >
              Tech Partners
            </Link>
            <Link
              to="/perks"
              className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
            >
              Perks
            </Link>
            <Link
              to="/faq"
              className="text-lg text-black/80 dark:text-white/80 hover:text-pareto-pink dark:hover:text-pareto-pink transition-all duration-300 px-4 py-2"
            >
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
