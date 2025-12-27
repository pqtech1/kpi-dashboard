import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  name: string;
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
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const sessionData = localStorage.getItem(STORAGE_KEY);

        if (sessionData) {
          const session = JSON.parse(sessionData);

          if (session.expiresAt > Date.now()) {
            // Valid session
            setIsAuthenticated(true);
            setUser(session.user);

            // Refresh session
            const newSession = {
              user: session.user,
              expiresAt: Date.now() + SESSION_DURATION,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
          } else {
            // Session expired
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem(STORAGE_KEY);
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    const session = {
      user: userData,
      expiresAt: Date.now() + SESSION_DURATION,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    setUser(userData);

    // Clear auto-login flags
    localStorage.removeItem("pq_demo_auto_login");
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
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
