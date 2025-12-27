import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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
    // Store current URL parameters for tracking
    const searchParams = new URLSearchParams(location.search);
    const trackingParams: Record<string, string> = {};

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
    ];

    trackingKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        trackingParams[key] = decodeURIComponent(value);
      }
    });

    // Store in localStorage before redirecting
    if (Object.keys(trackingParams).length > 0) {
      localStorage.setItem(
        "pq_tracking_params",
        JSON.stringify(trackingParams)
      );
    }

    // Redirect to login with preserved parameters
    const loginPath = `/login${location.search}`;
    return <Navigate to={loginPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
