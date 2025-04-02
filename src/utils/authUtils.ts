
export type UserRole = "admin" | "super_admin" | "analyst" | "fellow" | "alumni";

export const getUserRole = (
  email: string,
): UserRole => {
  if (!email) return "admin";

  if (email === "superadmin@pareto20.com") return "super_admin";
  if (email === "analyst@pareto20.com") return "analyst";
  
  // Check for fellow and alumni emails
  if (email.endsWith("@fellow.pareto20.com")) return "fellow";
  if (email.endsWith("@alumni.pareto20.com")) return "alumni";

  return "admin";
};

export const isPareto20Email = (email: string) => {
  return email.endsWith("@pareto20.com") || 
         email.endsWith("@fellow.pareto20.com") || 
         email.endsWith("@alumni.pareto20.com");
};

export const canAccessAdminDashboard = (role: UserRole) => {
  return role === "admin" || role === "super_admin" || role === "analyst";
};
