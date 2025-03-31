
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { mentors } from "@/data/mentors";

const ScrollingMentors = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollDirection = useRef<number>(1);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
  };

  useEffect(() => {
    let frameId: number;

    const step = () => {
      if (isAutoScrolling && viewportRef.current) {
        const el = viewportRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        const currentScrollLeft = el.scrollLeft;
        const speed = 2; // adjust speed as desired

        // If we've hit the right edge, switch to negative direction
        if (currentScrollLeft >= maxScrollLeft) {
          scrollDirection.current = -1;
        }
        // If we've hit the left edge, switch to positive direction
        else if (currentScrollLeft <= 0) {
          scrollDirection.current = 1;
        }

        el.scrollLeft += scrollDirection.current * speed;
      }

      frameId = requestAnimationFrame(step);
    };

    if (isAutoScrolling) {
      frameId = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isAutoScrolling]);

  return (
    <div className="relative overflow-hidden py-16">
      <div className="text-center mb-8">
        <h2 className="text-sm uppercase tracking-widest mb-3 text-pareto-pink">
          OUR MENTORS
        </h2>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Learn from the Best
        </h3>
        <p className="text-black/60 dark:text-white/60 text-lg max-w-2xl mx-auto">
          Decacorn and unicorn founders, tier 1 investors, top operators, public
          figures, and more
        </p>
      </div>

      <ScrollArea
        viewportRef={viewportRef}
        className="w-full"
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseLeave={handleInteractionEnd}
        onTouchEnd={handleInteractionEnd}
      >
        <div className={`flex space-x-12 px-4 py-6`}>
          {/* First set of mentors */}
          {mentors.concat(mentors).map((mentor, index) => (
            <a
              key={`a-${mentor.name}-${index}`}
              href={mentor.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center w-48">
                <div className="h-48 w-48 rounded-full overflow-hidden mb-4 group-hover:shadow-lg transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-lg text-center mb-1">
                    {mentor.name}
                  </h4>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-black/60 dark:text-white/60 text-sm text-center">
                  {mentor.description}
                </p>
              </div>
            </a>
          ))}

          {/* Duplicated mentors for infinite scroll effect */}
          {mentors.map((mentor, index) => (
            <a
              key={`b-${mentor.name}-${index}`}
              href={mentor.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 group"
            >
              <div className="flex flex-col items-center w-48">
                <div className="h-48 w-48 rounded-full overflow-hidden mb-4 group-hover:shadow-lg transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-lg text-center mb-1">
                    {mentor.name}
                  </h4>
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                </div>
                <p className="text-black/60 dark:text-white/60 text-sm text-center">
                  {mentor.description}
                </p>
              </div>
            </a>
          ))}
        </div>
        <ScrollBar
          orientation="horizontal"
          className="bg-black/10 dark:bg-white/10"
        />
      </ScrollArea>

      <div className="text-center mt-6 mb-12 max-w-3xl mx-auto">
        <p className="text-lg text-black/70 dark:text-white/70 italic">
          Wisdom from leaders who have collectively built companies worth over
          $50 billion and invested in thousands of startups
        </p>
      </div>

      <div className="text-center mt-8">
        <Link
          to="/mentors"
          className="inline-flex items-center gap-2 px-6 py-3 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors duration-300 text-lg font-medium rounded-sm"
        >
          Meet All Mentors
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default ScrollingMentors;
