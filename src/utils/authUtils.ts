
export const getUserRole = (email: string): "admin" | "super_admin" | "analyst" => {
  if (!email) return "admin";
  
  if (email === "superadmin@pareto20.com") return "super_admin";
  if (email === "analyst@pareto20.com") return "analyst";
  
  return "admin";
};

export const isPareto20Email = (email: string) => {
  return email.endsWith('@pareto20.com');
};
