
import { useRef, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mentors } from "@/data/mentors";

const ScrollingMentors = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const scrollDirection = useRef<number>(1);
  const [isHovering, setIsHovering] = useState(false);

  const handleInteraction = () => {
    setIsAutoScrolling(false);
    setIsHovering(true);
  };

  const handleInteractionEnd = () => {
    setIsAutoScrolling(true);
    setIsHovering(false);
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
    </div>
  );
};

export default ScrollingMentors;
