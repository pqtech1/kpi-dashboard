import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  getTrackingParams: () => Record<string, string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = "pq_session";
const TRACKING_PARAMS_KEY = "pq_tracking_params";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to extract and store tracking params
  const extractTrackingParams = (searchParams: URLSearchParams) => {
    const trackingKeys = [
      "campaign_id",
      "lead_id",
      "email",
      "source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "link_type",
      "click_time",
      "click_tracked",
    ];

    const params: Record<string, string> = {};
    trackingKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key] = decodeURIComponent(value);
      }
    });

    if (Object.keys(params).length > 0) {
      localStorage.setItem(TRACKING_PARAMS_KEY, JSON.stringify(params));
      console.log("Tracking params stored:", params);
    }

    return params;
  };

  // Extract tracking params on location change
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Always extract and store tracking params from URL
    const trackingParams = extractTrackingParams(searchParams);

    // Check for demo credentials in URL
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    // Auto-login with demo credentials
    if (username === "pq.demo" && password === "pq@demo") {
      const session: Session = {
        user: { username: "pq.demo", name: "PQ Jewel Admin" },
        expiresAt: Date.now() + SESSION_DURATION,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setIsAuthenticated(true);
      setUser(session.user);
      setIsLoading(false);

      // Redirect to dashboard with tracking params preserved
      if (Object.keys(trackingParams).length > 0) {
        const queryString = new URLSearchParams(trackingParams).toString();
        navigate(`/?${queryString}`);
      } else {
        navigate("/");
      }
      return;
    }
  }, [location.search, navigate]);

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
              expiresAt: Date.now() + SESSION_DURATION,
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

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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
              expiresAt: Date.now() + SESSION_DURATION,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
          }
        } catch {
          // Invalid session
        }
      }
    };

    // Refresh on user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart"];
    events.forEach((event) =>
      window.addEventListener(event, refreshSession, { passive: true })
    );

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, refreshSession)
      );
    };
  }, [isAuthenticated]);

  // Redirect authenticated users to dashboard with tracking params
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      // Get tracking params from localStorage
      const trackingParams = getTrackingParams();

      // Only redirect if we're on login page
      if (location.pathname === "/login") {
        if (Object.keys(trackingParams).length > 0) {
          const queryString = new URLSearchParams(
            trackingParams as Record<string, string>
          ).toString();
          navigate(`/?${queryString}`);
        } else {
          navigate("/");
        }
      }
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  const login = (userData: User) => {
    const session: Session = {
      user: userData,
      expiresAt: Date.now() + SESSION_DURATION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
  };

  const getTrackingParams = () => {
    try {
      const params = localStorage.getItem(TRACKING_PARAMS_KEY);
      return params ? JSON.parse(params) : {};
    } catch {
      return {};
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        getTrackingParams,
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
