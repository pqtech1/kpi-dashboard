import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract query params
    const searchParams = new URLSearchParams(location.search);

    // Check if we have tracking params
    const hasTrackingParams =
      searchParams.has("campaign_id") &&
      searchParams.has("lead_id") &&
      searchParams.has("email");

    if (hasTrackingParams) {
      // Redirect to overview with params preserved
      navigate(`/overview?${searchParams.toString()}`, { replace: true });
    } else {
      // Redirect to overview without params
      navigate("/overview", { replace: true });
    }
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
