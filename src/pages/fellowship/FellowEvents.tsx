
import React from "react";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "@/components/fellowship/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "lucide-react";

const FellowEvents = () => {
  const { data: events, isLoading, error } = useEvents();

  // Sort events by time in descending order (newest first)
  const sortedEvents = events ? [...events].sort((a, b) => 
    new Date(b.time).getTime() - new Date(a.time).getTime()
  ) : [];

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Events Calendar</h1>
          <p className="text-gray-400 mt-2">
            Stay updated with all upcoming mentor talks, workshops, and networking events
          </p>
        </div>
        
        <Alert className="bg-red-900/20 border-red-700">
          <AlertDescription className="text-red-300">
            Failed to load events. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Events Calendar</h1>
        <p className="text-gray-400 mt-2">
          Stay updated with all upcoming mentor talks, workshops, and networking events
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-zinc-700 w-full" />
          ))}
        </div>
      ) : sortedEvents && sortedEvents.length > 0 ? (
        <div className="space-y-4">
          {sortedEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-16 w-16 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No events yet</h3>
          <p className="text-gray-500 text-center max-w-md">
            Events will appear here once they are scheduled. Check back soon for upcoming mentor talks, workshops, and networking opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default FellowEvents;
