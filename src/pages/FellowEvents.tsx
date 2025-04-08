
import React from "react";
import { Card } from "@/components/ui/card";

const FellowEvents = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Events Calendar</h1>
        <p className="text-gray-400 mt-2">
          Stay updated with all upcoming mentor talks, workshops, and networking events
        </p>
      </div>

      <Card className="bg-zinc-800 border-zinc-700 p-6 mb-8 overflow-hidden">
        <div className="flex justify-center w-full overflow-x-auto">
          <iframe 
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Europe%2FParis&showPrint=0&src=anVsZXNAcGFyZXRvMjAuY29t&src=Y181ODM1MTM5YjhjZTg0MDBlZmIyMGUxOTI4YjRmZDlkOTVmM2VkMGY5ZmQ2ZTRkNGM4ZjU1MmIwYzNhMmFiMmZmQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&src=ZW4uZnJlbmNoI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%237986CB&color=%230B8043" 
            style={{ border: "solid 1px #777" }} 
            width="800" 
            height="600" 
            frameBorder="0" 
            scrolling="no"
            title="Pareto Fellowship Calendar"
            className="mx-auto rounded-md"
          />
        </div>
      </Card>
      
      <Card className="bg-zinc-800 border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white mb-4">Calendar Instructions</h2>
        <div className="space-y-4 text-gray-300">
          <p>
            This calendar shows all upcoming events for Pareto Fellows, including:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Mentor talks and Q&A sessions</li>
            <li>Technical workshops and training</li>
            <li>Networking events and social gatherings</li>
            <li>Important deadlines and program dates</li>
          </ul>
          <p>
            You can add this calendar to your personal Google Calendar by clicking the "+ Google Calendar" button at the bottom right of the calendar.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FellowEvents;
