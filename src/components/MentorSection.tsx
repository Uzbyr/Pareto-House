
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollingMentors from "./ScrollingMentors";
import PageContainer from "./PageContainer";

const MentorSection = () => {
  return (
    <div id="mentor-section" className="py-20 bg-black">
      <PageContainer>
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
      </PageContainer>
      
      {/* Add the ScrollingMentors component below the intro text */}
      <ScrollingMentors />
      
      {/* Add button to view all mentors */}
      <PageContainer className="mt-12">
        <div className="text-center">
          <Link
            to="/mentors"
            className="group inline-flex items-center gap-2 px-6 py-2 whitespace-nowrap text-white border border-white hover:bg-white/10 transition-colors duration-300 text-[17px] font-figtree font-medium"
          >
            VIEW ALL MENTORS
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </PageContainer>
    </div>
  );
};

export default MentorSection;
