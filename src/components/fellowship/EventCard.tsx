
import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Key, Hash, ExternalLink } from "lucide-react";

interface Event {
  id: string;
  topic: string;
  time: string;
  link: string | null;
  meeting_id: string | null;
  passcode: string | null;
}

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const eventDate = new Date(event.time);
  const isUpcoming = eventDate > new Date();
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    });
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700 p-6 hover:bg-zinc-750 transition-colors">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-white">{event.topic}</h3>
          <Badge 
            variant={isUpcoming ? "default" : "secondary"}
            className={isUpcoming ? "bg-green-600 hover:bg-green-700" : "bg-gray-600"}
          >
            {isUpcoming ? "Upcoming" : "Past"}
          </Badge>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(eventDate)}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-300">
            <Clock className="h-4 w-4" />
            <span>{formatTime(eventDate)}</span>
          </div>

          {event.link && (
            <div className="flex items-center space-x-2 text-gray-300">
              <ExternalLink className="h-4 w-4" />
              <a 
                href={event.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pareto-pink hover:text-pareto-pink/80 underline"
              >
                Zoom Meeting Link
              </a>
            </div>
          )}

          {event.meeting_id && (
            <div className="flex items-center space-x-2 text-gray-300">
              <Hash className="h-4 w-4" />
              <span>Meeting ID: {event.meeting_id}</span>
            </div>
          )}

          {event.passcode && (
            <div className="flex items-center space-x-2 text-gray-300">
              <Key className="h-4 w-4" />
              <span>Passcode: {event.passcode}</span>
            </div>
          )}
        </div>

        {event.link && isUpcoming && (
          <Button
            asChild
            className="bg-pareto-pink hover:bg-pareto-pink/80 text-black font-semibold"
          >
            <a href={event.link} target="_blank" rel="noopener noreferrer">
              <Video className="h-4 w-4 mr-2" />
              Join Meeting
            </a>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default EventCard;
