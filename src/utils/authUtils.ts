
export const getUserRole = (
  email: string,
): "admin" | "super_admin" | "analyst" | "fellow" | "alumni" => {
  if (!email) return "fellow";

  if (email === "superadmin@pareto20.com") return "super_admin";
  if (email === "analyst@pareto20.com") return "analyst";
  if (email === "admin@pareto20.com") return "admin";

  // By default, assume this is a fellow
  return "fellow";
};

export const isPareto20Email = (email: string) => {
  return email.endsWith("@pareto20.com");
};

// New helper function to check if a user has admin privileges
export const hasAdminPrivileges = (
  role: "admin" | "super_admin" | "analyst" | "fellow" | "alumni" | undefined,
) => {
  return role === "admin" || role === "super_admin";
};
