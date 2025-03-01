
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Gift, Lock } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";
import ScrollingUniversities from "../components/ScrollingUniversities";

const Index = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-pareto-black text-black dark:text-white font-inter">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 dark:bg-pareto-black/80 backdrop-blur-md border-b border-black/10 dark:border-white/10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <img
              src="/lovable-uploads/f136e975-2a52-41a5-9cd9-e464dda2a69b.png"
              alt="Pareto Logo"
              className="w-36 md:w-44"
            />
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
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-36 md:pt-56 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-tight">
              The Most Ambitious{" "}
              <span className="text-pareto-pink">Undergraduate</span>{" "}
              Community
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-black/80 dark:text-white/80 mb-16 max-w-2xl mx-auto">
            Connect with exceptional peers, access unparalleled opportunities, and accelerate your path to impact.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-20">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-pareto-pink text-black hover:bg-white dark:hover:bg-white transition-colors duration-300 text-lg font-semibold rounded-sm"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="https://www.pareto20.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black/10 dark:bg-white/10 text-black dark:text-white hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-semibold rounded-sm border border-black/20 dark:border-white/20"
            >
              About Pareto
            </a>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-20">
            {[
              { number: "50", label: "Fellows Per Batch" },
              { number: "30+", label: "Universities" },
              { number: "$100K", label: "Potential Check" },
              { number: "50+", label: "Tech Partners" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-pareto-pink mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-black/60 dark:text-white/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Universities Section */}
        <div className="relative overflow-hidden py-10 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 rounded-lg mt-20">
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white dark:from-pareto-black dark:via-transparent dark:to-pareto-black z-10 pointer-events-none" />
          <h2 className="text-sm uppercase tracking-widest mb-6 text-pareto-pink text-center relative z-20">
            TARGET UNIVERSITIES
          </h2>
          <ScrollingUniversities />
        </div>
      </div>

      {/* Perks Section */}
      <div className="bg-black/5 dark:bg-white/5 py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Fellowship Perks
            </h2>
            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              As a Pareto Fellow, you get access to exclusive benefits and opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Gift className="w-10 h-10 text-pareto-pink" />,
                title: "Grant Money",
                description: "Up to $100,000 in grant funding for exceptional projects"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pareto-pink"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>,
                title: "Mentor Network",
                description: "Connect with top founders, operators, and researchers"
              },
              {
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pareto-pink"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>,
                title: "Cohort Community",
                description: "Join a vetted peer group of ambitious undergraduates"
              },
            ].map((perk, index) => (
              <div key={index} className="bg-white dark:bg-pareto-black p-8 rounded-md hover:shadow-lg transition-shadow duration-300">
                <div className="mb-6">{perk.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                <p className="text-black/70 dark:text-white/70">{perk.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/perks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-medium"
            >
              View All Perks
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-32">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-black/70 dark:text-white/70 max-w-2xl mx-auto">
              The Pareto Fellowship selects and supports exceptional undergraduates through a rigorous process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Apply",
                description: "Submit your application with projects, achievements, and ambitions"
              },
              {
                step: "02",
                title: "Interview",
                description: "Selected applicants proceed to interviews with our team"
              },
              {
                step: "03",
                title: "Selection",
                description: "50 undergraduates are accepted into each cohort"
              },
              {
                step: "04",
                title: "Fellowship",
                description: "Join the community, access mentorship, funding, and more"
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-4xl font-bold text-pareto-pink mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-black/70 dark:text-white/70">{item.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 right-0 w-3/4 h-0.5 bg-black/10 dark:bg-white/10" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/apply"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-pareto-pink text-black hover:bg-white dark:hover:bg-white transition-colors duration-300 text-lg font-semibold rounded-sm"
            >
              Apply Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Use the Footer component */}
      <Footer />

      {/* Admin Login Button */}
      <div className="border-t border-black/10 dark:border-white/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="text-black/60 dark:text-white/60 hover:text-pareto-pink dark:hover:text-pareto-pink"
              onClick={handleAdminLogin}
            >
              <Lock className="w-4 h-4 mr-2" />
              Admin Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
