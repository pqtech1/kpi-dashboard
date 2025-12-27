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
    // Preserve the entire URL (path + query params)
    const returnTo = `${location.pathname}${location.search}`;

    // Store in localStorage for redirect after login
    if (returnTo !== "/") {
      localStorage.setItem("pq_return_to", returnTo);
    }

    // Extract and preserve tracking params for login page
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
    ];

    const trackingParams: Record<string, string> = {};
    trackingKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        trackingParams[key] = decodeURIComponent(value);
      }
    });

    // Store tracking params for login page
    if (Object.keys(trackingParams).length > 0) {
      localStorage.setItem(
        "pq_tracking_params",
        JSON.stringify(trackingParams)
      );
    }

    // Redirect to login with preserved query params
    const loginPath = `/login${location.search}`;
    return <Navigate to={loginPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
