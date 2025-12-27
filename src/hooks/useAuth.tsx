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
    extractTrackingParams(searchParams);
  }, [location.search]);

  // Check for demo auto-login on mount and handle session
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check for demo auto-login flag
        const shouldAutoLogin =
          localStorage.getItem("pq_demo_auto_login") === "true";
        const demoParams = localStorage.getItem("pq_demo_params");

        if (shouldAutoLogin && demoParams) {
          try {
            const { username, password } = JSON.parse(demoParams);

            if (username === "pq.demo" && password === "pq@demo") {
              // Auto-login with demo credentials
              const session: Session = {
                user: { username: "pq.demo", name: "PQ Jewel Admin" },
                expiresAt: Date.now() + SESSION_DURATION,
              };

              localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
              localStorage.removeItem("pq_demo_auto_login");
              localStorage.removeItem("pq_demo_params");

              setIsAuthenticated(true);
              setUser(session.user);
              setIsLoading(false);

              // Get tracking params for redirect
              const trackingParams = getTrackingParams();
              let redirectPath = "/";

              if (Object.keys(trackingParams).length > 0) {
                const queryString = new URLSearchParams(
                  trackingParams as Record<string, string>
                ).toString();
                redirectPath = `/?${queryString}`;
              }

              navigate(redirectPath);
              return;
            }
          } catch (error) {
            console.error("Error parsing demo params:", error);
          }
        }

        // Check existing session
        const sessionData = localStorage.getItem(STORAGE_KEY);

        if (sessionData) {
          const session: Session = JSON.parse(sessionData);

          if (session.expiresAt > Date.now()) {
            // Valid session
            setIsAuthenticated(true);
            setUser(session.user);

            // Refresh session expiry
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
        console.error("Error initializing auth:", error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

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
  }, [navigate]);

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

  // Redirect authenticated users away from login
  useEffect(() => {
    if (isAuthenticated && !isLoading && location.pathname === "/login") {
      const trackingParams = getTrackingParams();
      let redirectPath = "/";

      if (Object.keys(trackingParams).length > 0) {
        const queryString = new URLSearchParams(
          trackingParams as Record<string, string>
        ).toString();
        redirectPath = `/?${queryString}`;
      }

      navigate(redirectPath);
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

    // Clear any demo auto-login flags
    localStorage.removeItem("pq_demo_auto_login");
    localStorage.removeItem("pq_demo_params");
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
