
import React from "react";
import { useEvents } from "@/hooks/useEvents";
import EventCard from "@/components/fellowship/EventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar } from "lucide-react";

const FellowEvents = () => {
  const { data: events, isLoading, error } = useEvents();

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
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-48 bg-zinc-700" />
          ))}
        </div>
      ) : events && events.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-16 w-16 text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No events scheduled</h3>
          <p className="text-gray-500 text-center max-w-md">
            There are currently no events scheduled. Check back later for upcoming mentor talks, workshops, and networking events.
          </p>
        </div>
      )}
    </div>
  );
};

export default FellowEvents;
