import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/5 dark:bg-white/5 py-12 border-t border-black/10 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-black/60 dark:text-white/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} Pareto Fellowship. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link to="/terms" className="text-sm text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/tech-partners" className="text-sm text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors duration-300">
              Tech Partners
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
