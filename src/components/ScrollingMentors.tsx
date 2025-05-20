
import { useRef, useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { mentors } from "@/data/mentors";

const ScrollingMentors = () => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const scrollSpeed = 0.8; // slightly reduced speed for smoother scrolling
  
  // Track mouse position and drag state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [transitionActive, setTransitionActive] = useState(false);
  const autoScrollTimeoutRef = useRef<number | null>(null);

  const resumeAutoScroll = () => {
    if (autoScrollTimeoutRef.current) {
      window.clearTimeout(autoScrollTimeoutRef.current);
    }
    
    // Add a small delay before resuming auto-scrolling for a smoother transition
    autoScrollTimeoutRef.current = window.setTimeout(() => {
      setTransitionActive(true);
      // Fade in the auto-scrolling effect
      setTimeout(() => {
        setIsAutoScrolling(true);
        setTimeout(() => {
          setTransitionActive(false);
        }, 500);
      }, 100);
    }, 2000); // Reduced from 3s to 2s for better responsiveness
  };

  const handleInteraction = () => {
    setIsAutoScrolling(false);
    setIsHovering(true);
  };

  const handleInteractionEnd = () => {
    setIsHovering(false);
    if (!isDragging) {
      resumeAutoScroll();
    }
  };

  // Handle mouse down event to start dragging with improved feedback
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewportRef.current) {
      e.preventDefault(); // Prevent text selection during drag
      setIsDragging(true);
      setStartX(e.pageX - viewportRef.current.offsetLeft);
      setScrollLeft(viewportRef.current.scrollLeft);
      setIsAutoScrolling(false);
      
      // Clear any pending auto-scroll resumption
      if (autoScrollTimeoutRef.current) {
        window.clearTimeout(autoScrollTimeoutRef.current);
        autoScrollTimeoutRef.current = null;
      }
    }
  };

  // Enhanced mouse move handler for smoother dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !viewportRef.current) return;
    
    // Prevent default behavior like text selection
    e.preventDefault();
    
    // Calculate how far the mouse has moved
    const x = e.pageX - viewportRef.current.offsetLeft;
    const walk = (x - startX) * 1.8; // Slightly increased for better responsiveness
    
    // Apply smooth scrolling with requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      if (viewportRef.current) {
        viewportRef.current.scrollLeft = scrollLeft - walk;
      }
    });
  };

  // Improved mouse up handler
  const handleMouseUp = () => {
    setIsDragging(false);
    
    // Resume auto-scrolling after drag ends
    resumeAutoScroll();
  };

  // Handle wheel events for horizontal scrolling with improved behavior
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (viewportRef.current) {
      // Prevent the default vertical scroll
      e.preventDefault();
      
      // Enhanced horizontal scrolling with variable speed based on delta
      const scrollAmount = e.deltaY * 1.2;
      
      // Apply smooth scrolling
      viewportRef.current.scrollLeft += scrollAmount;
      
      // Temporarily stop auto-scrolling when manually scrolling
      setIsAutoScrolling(false);
      
      // Resume auto-scrolling after a delay with smoother transition
      resumeAutoScroll();
    }
  };

  // Auto-scrolling effect with improved smoothness
  useEffect(() => {
    let frameId: number;
    let lastTimestamp: number | null = null;
    
    const step = (timestamp: number) => {
      if (isAutoScrolling && viewportRef.current) {
        const el = viewportRef.current;
        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        
        // Calculate time-based scroll for consistent speed
        if (lastTimestamp) {
          const delta = timestamp - lastTimestamp;
          const pixelsToScroll = (scrollSpeed * delta) / 16; // Normalize to 60fps
          
          // Move scroll position right
          el.scrollLeft += pixelsToScroll;
          
          // If we've reached the end, reset to beginning (loop effect)
          if (el.scrollLeft >= maxScrollLeft - 5) {
            el.scrollLeft = 0;
          }
        }
        
        lastTimestamp = timestamp;
      } else {
        lastTimestamp = null;
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);

    return () => {
      if (autoScrollTimeoutRef.current) {
        window.clearTimeout(autoScrollTimeoutRef.current);
      }
      cancelAnimationFrame(frameId);
    };
  }, [isAutoScrolling, scrollSpeed]);

  // Improved mouse leave event handling
  useEffect(() => {
    const handleMouseLeaveWindow = () => {
      if (isDragging) {
        setIsDragging(false);
        resumeAutoScroll();
      }
    };

    // Add enhanced drag end detection
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        resumeAutoScroll();
      }
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);
    
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isDragging]);

  return (
    <div className="relative overflow-hidden">
      {/* Left gradient overlay */}
      <div className="absolute top-0 left-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      
      <ScrollArea
        viewportRef={viewportRef}
        className={`w-full transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${transitionActive ? 'transition-all duration-500' : ''}`}
        onMouseEnter={handleInteraction}
        onTouchStart={handleInteraction}
        onMouseLeave={handleInteractionEnd}
        onTouchEnd={handleInteractionEnd}
        onWheel={handleWheel} 
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div className={`flex space-x-12 px-4 ${transitionActive ? 'transition-transform duration-500' : ''}`}>
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
                      draggable="false" // Prevent image dragging interfering with scroll behavior
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
                      draggable="false" // Prevent image dragging interfering with scroll behavior
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
        {!isHovering && !isDragging && (
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
