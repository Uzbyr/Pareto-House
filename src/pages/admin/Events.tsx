
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useEventManagement } from "@/hooks/useEventManagement";
import EventForm from "@/components/admin/events/EventForm";
import EventsTable from "@/components/admin/events/EventsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

const Events = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const {
    events,
    isLoading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    isCreating,
    isUpdating,
    isDeleting,
  } = useEventManagement();

  const handleCreateEvent = (data: any) => {
    createEvent(data);
  };

  const handleUpdateEvent = (data: any) => {
    if (editingEvent) {
      updateEvent({ ...data, id: editingEvent.id });
      setEditingEvent(null);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      deleteEvent(eventId);
    }
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingEvent(null);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Events Management</h1>
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Events Management</h1>
        <Button
          onClick={() => setIsFormOpen(true)}
          className="bg-pareto-pink hover:bg-pareto-pink/80 text-black"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-16 bg-zinc-700 w-full" />
          ))}
        </div>
      ) : events && events.length > 0 ? (
        <EventsTable
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No events found</h3>
          <p className="text-gray-500 mb-4">
            Start by creating your first event.
          </p>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-pareto-pink hover:bg-pareto-pink/80 text-black"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>
      )}

      <EventForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
        event={editingEvent}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};

export default Events;
