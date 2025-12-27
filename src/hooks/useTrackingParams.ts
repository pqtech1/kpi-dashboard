import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useTrackingParams() {
  const location = useLocation();
  const [trackingParams, setTrackingParams] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Extract tracking parameters
    const params: Record<string, string> = {};
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
        params[key] = decodeURIComponent(value);
      }
    });

    // Store in sessionStorage for persistence
    if (Object.keys(params).length > 0) {
      sessionStorage.setItem("tracking_params", JSON.stringify(params));
      // Also store in localStorage for cross-session persistence
      localStorage.setItem("tracking_params", JSON.stringify(params));
    }

    setTrackingParams(params);
  }, [location.search]);

  return trackingParams;
}
