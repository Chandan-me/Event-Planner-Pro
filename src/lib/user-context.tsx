import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface UserData {
  name: string;
  email: string;
  initials: string;
}

interface UserContextType {
  user: UserData | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin@Events-pro2025";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("Events-pro_user");
    if (saved) setUser(JSON.parse(saved));
    const adminSaved = localStorage.getItem("Events-pro_admin");
    if (adminSaved === "true") setIsAdmin(true);
  }, []);

  const login = (name: string, email: string) => {
    const initials = name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
    const userData = { name, email, initials };
    setUser(userData);
    localStorage.setItem("Events-pro_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("Events-pro_user");
    localStorage.removeItem("Events-pro_admin");
  };

  const adminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem("Events-pro_admin", "true");
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("Events-pro_admin");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, isAdmin, adminLogin, adminLogout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
