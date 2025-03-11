
import { Application } from "@/types/auth";

export const getStoredApplications = (): Application[] => {
  try {
    const storedApps = localStorage.getItem('applications');
    return storedApps ? JSON.parse(storedApps) : [];
  } catch (e) {
    console.error("Error loading applications from localStorage:", e);
    return [];
  }
};

export const storeApplications = (applications: Application[]) => {
  try {
    localStorage.setItem('applications', JSON.stringify(applications));
  } catch (e) {
    console.error("Error saving applications to localStorage:", e);
  }
};

export const getStoredPageViews = (): Record<string, number> => {
  try {
    const storedViews = localStorage.getItem('pageViews');
    return storedViews ? JSON.parse(storedViews) : {};
  } catch (e) {
    console.error("Error loading page views from localStorage:", e);
    return {};
  }
};

export const storePageViews = (pageViews: Record<string, number>) => {
  try {
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
  } catch (e) {
    console.error("Error saving page views to localStorage:", e);
  }
};

export const getStoredVisitorData = (): { total: number, byDate: Record<string, number> } => {
  try {
    const storedData = localStorage.getItem('visitorData');
    return storedData ? JSON.parse(storedData) : { total: 0, byDate: {} };
  } catch (e) {
    console.error("Error loading visitor data from localStorage:", e);
    return { total: 0, byDate: {} };
  }
};

export const storeVisitorData = (visitorData: { total: number, byDate: Record<string, number> }) => {
  try {
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
  } catch (e) {
    console.error("Error saving visitor data to localStorage:", e);
  }
};
