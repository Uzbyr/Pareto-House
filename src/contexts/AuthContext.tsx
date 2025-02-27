
import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  email: string;
  role: "admin" | "super_admin" | "analyst";
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isPareto20Email: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Check localStorage for existing auth state on initial load
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    return storedAuth === "true";
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update localStorage when auth state changes
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated.toString());
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [isAuthenticated, user]);

  const isPareto20Email = (email: string) => {
    return email.endsWith('@pareto20.com');
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // For this demo, we'll just check if the email domain is @pareto20.com
    // In a real app, you would validate credentials against a backend
    
    if (!isPareto20Email(email)) {
      return false;
    }

    // Mock admin accounts for demo purposes
    const adminAccounts = [
      { email: 'admin@pareto20.com', role: 'admin' as const, password: 'admin123' },
      { email: 'superadmin@pareto20.com', role: 'super_admin' as const, password: 'super123' },
      { email: 'analyst@pareto20.com', role: 'analyst' as const, password: 'analyst123' },
      { email: 'jules@pareto20.com', role: 'admin' as const, password: 'Kiara00!' }
    ];

    const matchedUser = adminAccounts.find(account => 
      account.email === email && account.password === password
    );

    if (matchedUser) {
      setIsAuthenticated(true);
      setUser({ email: matchedUser.email, role: matchedUser.role });
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isPareto20Email }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
