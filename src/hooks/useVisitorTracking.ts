import { useState } from "react";
import { getStoredVisitorData, storeVisitorData } from "@/utils/storageUtils";

export const useVisitorTracking = () => {
  // Initialize session ID for visitor tracking
  const [sessionId] = useState<string>(() => {
    let id = sessionStorage.getItem("visitorSessionId");
    if (!id) {
      id = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("visitorSessionId", id);

      const visitorData = getStoredVisitorData();
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      visitorData.total += 1;
      visitorData.byDate[today] = (visitorData.byDate[today] || 0) + 1;

      storeVisitorData(visitorData);
    }
    return id;
  });

  return { sessionId };
};
