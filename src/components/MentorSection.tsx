
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MentorSection = () => {
  return (
    <div className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start">
          <h2 className="text-sm uppercase tracking-widest mb-3 text-[#828282] font-figtree">
            OUR MENTORS
          </h2>
          
          <h3 className="text-5xl font-bold mb-4 tracking-tight text-left">
            Learn from the best
          </h3>
          
          <p className="text-[19px] text-white/60 mb-10">
            Wisdom from leaders who have collectively built companies worth over 
            $50 billion and invested in thousands of startups
          </p>
          
          <Link
            to="/mentors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors duration-300 text-lg font-medium rounded-sm"
          >
            Meet All Mentors
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorSection;
