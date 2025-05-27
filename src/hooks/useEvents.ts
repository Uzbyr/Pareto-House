
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("time", { ascending: true });

      if (error) throw error;
      return data as Event[];
    },
  });
};
