
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MentorSection = () => {
  return (
    <div className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-start">
          <h2 className="text-[17px] text-[#828282] uppercase tracking-widest mb-3 font-figtree">
            OUR MENTORS
          </h2>
          
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium max-w-4xl leading-tight text-left mb-4">
            Learn from the best
          </h3>
          
          <p className="text-[19px] text-white/60 mb-10">
            Wisdom from leaders who have collectively built companies worth over 
            $50 billion and invested in thousands of startups
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorSection;
