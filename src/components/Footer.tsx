
import { TwitterIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-8">
            <a href="https://www.pareto20.com" target="_blank" rel="noopener noreferrer">
              <img
                src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
                alt="Pareto Logo"
                className="w-36"
              />
            </a>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/Pareto_Fellows"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 dark:text-white/70 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
              >
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/pareto-fellows/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/70 dark:text-white/70 hover:text-pareto-pink dark:hover:text-pareto-pink transition-colors"
              >
                <LinkedinIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
          <p className="text-black/70 dark:text-white/70 text-sm">
            Any questions? Text{" "}
            <a
              href="https://www.linkedin.com/in/julesboustouller/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pareto-pink hover:underline"
            >
              Jules
            </a>{" "}
            at +33 7 77 00 29 75
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
