import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Extract tracking params from URL and store them
  const extractAndStoreTrackingParams = () => {
    const searchParams = new URLSearchParams(location.search);
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
      localStorage.setItem("pq_tracking_params", JSON.stringify(params));
      console.log("Tracking params stored in ProtectedRoute:", params);
    }

    return params;
  };

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store tracking params before redirecting to login
    const trackingParams = extractAndStoreTrackingParams();

    // Build login URL with preserved params
    const searchParams = new URLSearchParams();
    Object.entries(trackingParams).forEach(([key, value]) => {
      searchParams.append(key, value);
    });

    const queryString = searchParams.toString();
    const loginPath = `/login${queryString ? `?${queryString}` : ""}`;

    return <Navigate to={loginPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
