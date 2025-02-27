
export interface SiteMetrics {
  visitors: {
    total: number;
    byDate: { date: string; visitors: number; pageViews: number }[];
  };
  applications: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
    completionRate: number;
    byDay: { name: string; applications: number }[];
  };
  conversionFunnel: {
    stages: { name: string; value: number }[];
    dropoffRates: { x: number; y: number; z: number; name: string }[];
    timeSpent: { name: string; timeSpent: number }[];
  };
  trafficSources: { name: string; value: number }[];
  pagePopularity: { name: string; views: number }[];
}
