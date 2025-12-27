import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Extract and store tracking params
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

    // Store for later use
    if (Object.keys(trackingParams).length > 0) {
      sessionStorage.setItem("tracking_params", JSON.stringify(trackingParams));
      localStorage.setItem("tracking_params", JSON.stringify(trackingParams));
    }

    // Check for demo credentials
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    if (username === "pq.demo" && password === "pq@demo") {
      // Auto-login with demo credentials
      sessionStorage.setItem("is_authenticated", "true");

      // Redirect with preserved params
      const queryString = new URLSearchParams(trackingParams).toString();
      const redirectPath = queryString ? `/?${queryString}` : "/";
      navigate(redirectPath, { replace: true });
      return;
    }

    if (isAuthenticated) {
      // Already authenticated, redirect with params
      const queryString = new URLSearchParams(trackingParams).toString();
      const redirectPath = queryString ? `/?${queryString}` : "/";
      navigate(redirectPath, { replace: true });
    } else {
      // Not authenticated, redirect to login with params
      const queryString = searchParams.toString();
      const loginPath = queryString ? `/login?${queryString}` : "/login";
      navigate(loginPath, { replace: true });
    }
  }, [navigate, location, isAuthenticated]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Processing your request...</p>
      </div>
    </div>
  );
}
