
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FellowEvents = () => {
  const [isCalendarLoading, setIsCalendarLoading] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Events Calendar</h1>
        <p className="text-gray-400 mt-2">
          Stay updated with all upcoming mentor talks, workshops, and networking
          events
        </p>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-4 mb-8">
        <div className="w-full overflow-hidden aspect-[4/3] md:aspect-[16/9]">
          {isCalendarLoading && (
            <div className="w-full h-full">
              <Skeleton className="w-full h-full bg-zinc-700" />
            </div>
          )}
          <iframe
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&src=anVsZXNAcGFyZXRvMjAuY29t&src=Y181ODM1MTM5YjhjZTg0MDBlZmIyMGUxOTI4YjRmZDlkOTVmM2VkMGY5ZmQ2ZTRkNGM4ZjU1MmIwYzNhMmFiMmZmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%237986CB&color=%230B8043"
            style={{ 
              border: "solid 1px #777",
              display: isCalendarLoading ? "none" : "block",
              width: "100%",
              height: "100%"
            }}
            frameBorder="0"
            scrolling="no"
            title="Pareto Fellowship Calendar"
            className="rounded-md"
            onLoad={() => setIsCalendarLoading(false)}
          />
        </div>
      </Card>
    </div>
  );
};

export default FellowEvents;
