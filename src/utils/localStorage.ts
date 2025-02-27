
// Types
import { Application } from '../types/application';

// Function to get stored applications from localStorage
export const getStoredApplications = (): Application[] => {
  try {
    const storedApps = localStorage.getItem('applications');
    return storedApps ? JSON.parse(storedApps) : [];
  } catch (e) {
    console.error("Error loading applications from localStorage:", e);
    return [];
  }
};

// Function to store applications in localStorage
export const storeApplications = (applications: Application[]): void => {
  try {
    localStorage.setItem('applications', JSON.stringify(applications));
  } catch (e) {
    console.error("Error saving applications to localStorage:", e);
  }
};

// Function to get stored page views from localStorage
export const getStoredPageViews = (): Record<string, number> => {
  try {
    const storedViews = localStorage.getItem('pageViews');
    return storedViews ? JSON.parse(storedViews) : {};
  } catch (e) {
    console.error("Error loading page views from localStorage:", e);
    return {};
  }
};

// Function to store page views in localStorage
export const storePageViews = (pageViews: Record<string, number>): void => {
  try {
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
  } catch (e) {
    console.error("Error saving page views to localStorage:", e);
  }
};

// Function to get stored visitor data from localStorage
export const getStoredVisitorData = (): { total: number, byDate: Record<string, number> } => {
  try {
    const storedData = localStorage.getItem('visitorData');
    return storedData ? JSON.parse(storedData) : { total: 0, byDate: {} };
  } catch (e) {
    console.error("Error loading visitor data from localStorage:", e);
    return { total: 0, byDate: {} };
  }
};

// Function to store visitor data in localStorage
export const storeVisitorData = (visitorData: { total: number, byDate: Record<string, number> }): void => {
  try {
    localStorage.setItem('visitorData', JSON.stringify(visitorData));
  } catch (e) {
    console.error("Error saving visitor data to localStorage:", e);
  }
};
