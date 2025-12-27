import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function PreserveQueryParams() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't preserve params on login page
    if (location.pathname === "/login") {
      return;
    }

    const searchParams = new URLSearchParams(location.search);

    // Parameters to preserve
    const paramsToPreserve = [
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
    ];

    // Store current params
    const currentParams: Record<string, string> = {};
    paramsToPreserve.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        currentParams[param] = value;
      }
    });

    // Store in sessionStorage for tracking script
    if (Object.keys(currentParams).length > 0) {
      sessionStorage.setItem(
        "current_tracking_params",
        JSON.stringify(currentParams)
      );

      // Also store individual params for easy access
      Object.entries(currentParams).forEach(([key, value]) => {
        sessionStorage.setItem(`tracking_${key}`, value);
      });
    }

    // Clean up old params from localStorage
    const oldParams = localStorage.getItem("email_tracking_params");
    if (oldParams) {
      try {
        const parsed = JSON.parse(oldParams);
        // Keep params that are still relevant
        const relevantParams: Record<string, string> = {};
        paramsToPreserve.forEach((param) => {
          if (parsed[param]) {
            relevantParams[param] = parsed[param];
          }
        });
        localStorage.setItem(
          "email_tracking_params",
          JSON.stringify(relevantParams)
        );
      } catch (e) {
        localStorage.removeItem("email_tracking_params");
      }
    }
  }, [location]);

  return null;
}
