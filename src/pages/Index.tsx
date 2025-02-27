
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ScrollingUniversities from "@/components/ScrollingUniversities";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { trackPageVisit } = useAuth();

  // Track homepage visit on load
  useEffect(() => {
    trackPageVisit("/");
  }, [trackPageVisit]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Main content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 lg:py-32 px-4 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pareto-pink to-pareto-pink/60">
              Join the Top 20 Fellowships for Students
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-8 md:mb-12">
              For the top 20% committed to building and creating together.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-pareto-pink hover:bg-pareto-pink/90">
                <Link to="/apply">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/mentors">
                  Meet the Mentors
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Universities Section */}
        <section className="py-12 bg-zinc-950/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-lg md:text-xl text-center text-zinc-400 mb-6">
              Our students come from the world's top universities
            </h2>
            <ScrollingUniversities />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-pareto-pink/10 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-pareto-pink h-6 w-6"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Mentorship</h3>
              <p className="text-zinc-400">
                Connect with industry leaders and veteran entrepreneurs who will guide you on your journey.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-pareto-pink/10 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-pareto-pink h-6 w-6"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Elite Network</h3>
              <p className="text-zinc-400">
                Build relationships with ambitious peers and create a network that will last a lifetime.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-pareto-pink/10 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-pareto-pink h-6 w-6"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Real-World Projects</h3>
              <p className="text-zinc-400">
                Work on challenging projects with real impact and build an impressive portfolio.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-pareto-pink/10 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-pareto-pink h-6 w-6"
                >
                  <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7"></path>
                  <path d="M15 7h6v6"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Career Acceleration</h3>
              <p className="text-zinc-400">
                Fast-track your career with exclusive opportunities and backdoor access to top companies.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-pareto-pink/10 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-pareto-pink h-6 w-6"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
              <p className="text-zinc-400">
                Join a tight-knit community of like-minded builders who will support you through challenges.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <div className="w-12 h-12 bg-pareto-pink/10 rounded-lg flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-pareto-pink h-6 w-6"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Founder Resources</h3>
              <p className="text-zinc-400">
                Get access to startup resources, funding opportunities, and exclusive founder perks.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to join the top 20%?</h2>
            <p className="text-lg text-zinc-400 mb-8">
              Applications are competitive and reviewed on a rolling basis.
              Apply now to secure your spot in our next cohort.
            </p>
            <Button asChild size="lg" className="bg-pareto-pink hover:bg-pareto-pink/90">
              <Link to="/apply">
                Apply to Pareto 20 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
