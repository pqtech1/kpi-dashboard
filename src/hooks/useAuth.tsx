import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  username: string;
  name: string;
}

interface Session {
  user: User;
  expiresAt: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionData = sessionStorage.getItem("session");
    
    if (sessionData) {
      const session: Session = JSON.parse(sessionData);
      
      if (session.expiresAt > Date.now()) {
        setIsAuthenticated(true);
        setUser(session.user);
        
        // Refresh session on activity
        const newSession: Session = {
          user: session.user,
          expiresAt: Date.now() + SESSION_DURATION
        };
        sessionStorage.setItem("session", JSON.stringify(newSession));
      } else {
        // Session expired
        sessionStorage.removeItem("session");
      }
    }
  }, []);

  const login = (userData: User) => {
    const session: Session = {
      user: userData,
      expiresAt: Date.now() + SESSION_DURATION
    };
    sessionStorage.setItem("session", JSON.stringify(session));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem("session");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
