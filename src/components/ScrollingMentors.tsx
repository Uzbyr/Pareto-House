
import { useRef, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mentors } from "@/data/mentors";

const ScrollingMentors = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeed = 1; // reduced speed for smoother scrolling

  const handleInteraction = () => {
    setIsAutoScrolling(false);
    setIsHovering(true);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
    setIsHovering(false);
  };

  // Handle wheel events for horizontal scrolling
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (viewportRef.current) {
      // Prevent the default vertical scroll
      e.preventDefault();
      
      // Scroll horizontally based on the vertical wheel delta
      viewportRef.current.scrollLeft += e.deltaY;
      
      // Temporarily stop auto-scrolling when manually scrolling
      setIsAutoScrolling(false);
      
      // Resume auto-scrolling after a delay
      const timer = setTimeout(() => {
        setIsAutoScrolling(true);
      }, 3000); // Resume auto-scrolling after 3 seconds of inactivity
      
      return () => clearTimeout(timer);
    }
  };

  useEffect(() => {
    let frameId: number;

    const step = () => {
      if (isAutoScrolling && viewportRef.current) {
        const el = viewportRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        
        // Move scroll position right
        el.scrollLeft += scrollSpeed;
        
        // If we've reached the end, reset to beginning (loop effect)
        if (el.scrollLeft >= maxScrollLeft) {
          el.scrollLeft = 0;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    if (isAutoScrolling) {
      frameId = requestAnimationFrame(step);
    }

    return () => cancelAnimationFrame(frameId);
  }, [isAutoScrolling, scrollSpeed]);

  return (
    <div className="relative overflow-hidden">
      {/* Left gradient overlay */}
      <div className="absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      
      <ScrollArea
        viewportRef={viewportRef}
        className="w-full"
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseLeave={handleInteractionEnd}
        onTouchEnd={handleInteractionEnd}
        onWheel={handleWheel} // Add wheel event handler
      >
        <div className={`flex space-x-12 px-4`}>
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
                <div className="h-48 w-48 aspect-square rounded-none overflow-hidden mb-4 group-hover:shadow-lg transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all"
                    />
                  )}
                </div>
                <h4 className="font-figtree font-semibold text-lg text-center mb-1">
                  {mentor.name}
                </h4>
                <p className="font-figtree text-black/60 dark:text-white/60 text-sm text-center">
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
                <div className="h-48 w-48 aspect-square rounded-none overflow-hidden mb-4 group-hover:shadow-lg transition-all duration-300">
                  {mentor.imageUrl && (
                    <img
                      src={mentor.imageUrl}
                      alt={mentor.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all"
                    />
                  )}
                </div>
                <h4 className="font-figtree font-semibold text-lg text-center mb-1">
                  {mentor.name}
                </h4>
                <p className="font-figtree text-black/60 dark:text-white/60 text-sm text-center">
                  {mentor.description}
                </p>
              </div>
            </a>
          ))}
        </div>
        {!isHovering && (
          <ScrollBar
            orientation="horizontal"
            className="bg-black/10 dark:bg-white/10"
          />
        )}
      </ScrollArea>
      
      {/* Right gradient overlay */}
      <div className="absolute top-0 right-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
    </div>
  );
};

export default ScrollingMentors;
