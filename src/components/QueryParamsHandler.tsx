import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function QueryParamsHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have tracking params in URL
    const searchParams = new URLSearchParams(location.search);

    // List of tracking parameters we want to preserve
    const trackingParams = [
      "campaign_id",
      "lead_id",
      "email",
      "source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
    ];

    const hasTrackingParams = trackingParams.some((param) =>
      searchParams.has(param)
    );

    if (hasTrackingParams) {
      // Store params in sessionStorage for page tracking
      const paramsObject: Record<string, string> = {};
      trackingParams.forEach((param) => {
        const value = searchParams.get(param);
        if (value) {
          paramsObject[param] = value;
        }
      });

      sessionStorage.setItem(
        "email_tracking_params",
        JSON.stringify(paramsObject)
      );

      // Also store in localStorage for persistence across pages
      localStorage.setItem(
        "email_tracking_params",
        JSON.stringify(paramsObject)
      );

      console.log("Tracking params saved:", paramsObject);
    }

    // Check if we need to redirect with params preserved
    if (location.pathname === "/kpi" && hasTrackingParams) {
      // Navigate to overview page with params preserved
      navigate(`/?${searchParams.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  return null;
}
