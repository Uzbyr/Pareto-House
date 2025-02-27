
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Apply = () => {
  const { trackPageVisit } = useAuth();

  // Track apply page visit on load
  useEffect(() => {
    trackPageVisit("/apply");
  }, [trackPageVisit]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="py-12 md:py-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pareto-pink to-pareto-pink/60">
            Apply to Pareto 20
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            Join a select community of builders, thinkers, and doers 
            from the world's top universities.
          </p>
        </div>
        
        <ApplicationForm />
        
        <div className="mt-16 max-w-3xl mx-auto text-center border-t border-zinc-800 pt-8">
          <h2 className="text-2xl font-bold mb-4">What Happens Next?</h2>
          <ol className="text-left space-y-6">
            <li className="flex gap-4">
              <div className="bg-pareto-pink/20 text-pareto-pink rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-lg">Application Review</h3>
                <p className="text-zinc-400">Our team will review your application within 7-10 business days.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-pareto-pink/20 text-pareto-pink rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-lg">Interview</h3>
                <p className="text-zinc-400">Selected candidates will be invited for a virtual interview with our team.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-pareto-pink/20 text-pareto-pink rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-lg">Final Decision</h3>
                <p className="text-zinc-400">You'll receive our decision within 48 hours after your interview.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="bg-pareto-pink/20 text-pareto-pink rounded-full h-8 w-8 flex-shrink-0 flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold text-lg">Welcome to Pareto 20</h3>
                <p className="text-zinc-400">Accepted fellows will receive onboarding information and program details.</p>
              </div>
            </li>
          </ol>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Apply;
