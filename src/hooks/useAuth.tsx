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
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = "pq_session";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check and restore session on mount
  useEffect(() => {
    const checkSession = () => {
      try {
        const sessionData = localStorage.getItem(STORAGE_KEY);
        
        if (sessionData) {
          const session: Session = JSON.parse(sessionData);
          
          if (session.expiresAt > Date.now()) {
            setIsAuthenticated(true);
            setUser(session.user);
            
            // Refresh session expiry on activity
            const newSession: Session = {
              user: session.user,
              expiresAt: Date.now() + SESSION_DURATION
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
          } else {
            // Session expired
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
      setIsLoading(false);
    };

    checkSession();

    // Listen for storage changes (for cross-tab sync)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        if (e.newValue) {
          try {
            const session: Session = JSON.parse(e.newValue);
            if (session.expiresAt > Date.now()) {
              setIsAuthenticated(true);
              setUser(session.user);
            }
          } catch {
            // Invalid session data
          }
        } else {
          // Session was removed (logged out in another tab)
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Refresh session periodically while user is active
  useEffect(() => {
    if (!isAuthenticated) return;

    const refreshSession = () => {
      const sessionData = localStorage.getItem(STORAGE_KEY);
      if (sessionData) {
        try {
          const session: Session = JSON.parse(sessionData);
          if (session.expiresAt > Date.now()) {
            const newSession: Session = {
              user: session.user,
              expiresAt: Date.now() + SESSION_DURATION
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
          }
        } catch {
          // Invalid session
        }
      }
    };

    // Refresh on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, refreshSession, { passive: true }));
    
    return () => {
      events.forEach(event => window.removeEventListener(event, refreshSession));
    };
  }, [isAuthenticated]);

  const login = (userData: User) => {
    const session: Session = {
      user: userData,
      expiresAt: Date.now() + SESSION_DURATION
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout }}>
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
