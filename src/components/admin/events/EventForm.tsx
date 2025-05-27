
import React from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Event {
  id: string;
  topic: string;
  time: string;
  link: string | null;
  meeting_id: string | null;
  passcode: string | null;
}

interface EventFormData {
  topic: string;
  time: string;
  link: string;
  meeting_id: string;
  passcode: string;
}

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EventFormData) => void;
  event?: Event | null;
  isLoading: boolean;
}

const EventForm = ({ isOpen, onClose, onSubmit, event, isLoading }: EventFormProps) => {
  const form = useForm<EventFormData>({
    defaultValues: {
      topic: event?.topic || "",
      time: event?.time ? new Date(event.time).toISOString().slice(0, 16) : "",
      link: event?.link || "",
      meeting_id: event?.meeting_id || "",
      passcode: event?.passcode || "",
    },
  });

  React.useEffect(() => {
    if (event) {
      form.reset({
        topic: event.topic,
        time: new Date(event.time).toISOString().slice(0, 16),
        link: event.link || "",
        meeting_id: event.meeting_id || "",
        passcode: event.passcode || "",
      });
    } else {
      form.reset({
        topic: "",
        time: "",
        link: "",
        meeting_id: "",
        passcode: "",
      });
    }
  }, [event, form]);

  const handleSubmit = (data: EventFormData) => {
    const formattedData = {
      ...data,
      time: new Date(data.time).toISOString(),
      link: data.link || null,
      meeting_id: data.meeting_id || null,
      passcode: data.passcode || null,
    };
    onSubmit(formattedData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create New Event"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="topic"
              rules={{ required: "Topic is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Event topic"
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="time"
              rules={{ required: "Date and time is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date & Time (UTC)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="datetime-local"
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                  </FormControl>
                  <p className="text-sm text-gray-400">
                    Please enter the date and time in UTC timezone
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zoom Link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://zoom.us/j/..."
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meeting_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meeting ID</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123 456 7890"
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passcode</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Meeting passcode"
                      className="bg-zinc-700 border-zinc-600 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-zinc-600 text-white hover:bg-zinc-700"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-pareto-pink hover:bg-pareto-pink/80 text-black"
              >
                {isLoading ? "Saving..." : event ? "Update Event" : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
