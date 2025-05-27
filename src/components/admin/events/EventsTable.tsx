
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink } from "lucide-react";

interface Event {
  id: string;
  topic: string;
  time: string;
  link: string | null;
  meeting_id: string | null;
  passcode: string | null;
  created_at: string;
  updated_at: string;
}

interface EventsTableProps {
  events: Event[];
  onEdit: (event: Event) => void;
  onDelete: (eventId: string) => void;
  isDeleting: boolean;
}

const EventsTable = ({ events, onEdit, onDelete, isDeleting }: EventsTableProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  return (
    <div className="rounded-md border border-zinc-700">
      <Table>
        <TableHeader>
          <TableRow className="border-zinc-700">
            <TableHead className="text-zinc-300">Topic</TableHead>
            <TableHead className="text-zinc-300">Date & Time</TableHead>
            <TableHead className="text-zinc-300">Status</TableHead>
            <TableHead className="text-zinc-300">Meeting ID</TableHead>
            <TableHead className="text-zinc-300">Link</TableHead>
            <TableHead className="text-zinc-300 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id} className="border-zinc-700">
              <TableCell className="text-white font-medium">
                {event.topic}
              </TableCell>
              <TableCell className="text-zinc-300">
                {formatDate(event.time)}
              </TableCell>
              <TableCell>
                <Badge
                  variant={isUpcoming(event.time) ? "default" : "secondary"}
                  className={
                    isUpcoming(event.time)
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-600"
                  }
                >
                  {isUpcoming(event.time) ? "Upcoming" : "Past"}
                </Badge>
              </TableCell>
              <TableCell className="text-zinc-300">
                {event.meeting_id || "-"}
              </TableCell>
              <TableCell>
                {event.link ? (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pareto-pink hover:text-pareto-pink/80 flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Join
                  </a>
                ) : (
                  <span className="text-zinc-500">-</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(event)}
                    className="border-zinc-600 text-white hover:bg-zinc-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(event.id)}
                    disabled={isDeleting}
                    className="border-zinc-600 text-white hover:bg-zinc-700 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EventsTable;
