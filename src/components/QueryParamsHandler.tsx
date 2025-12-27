import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function QueryParamsHandler() {
  const location = useLocation();

  useEffect(() => {
    // Extract tracking params from URL
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

    // Store in localStorage for tracking script
    if (Object.keys(params).length > 0) {
      localStorage.setItem("pq_tracking_params", JSON.stringify(params));
      console.log("QueryParamsHandler stored tracking params:", params);
    }

    // Send page view tracking if we have campaign_id, lead_id, and email
    if (params.campaign_id && params.lead_id && params.email) {
      sendPageViewTracking(params);
    }
  }, [location.search]);

  const sendPageViewTracking = (params: Record<string, string>) => {
    const data = {
      ...params,
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      time_spent: 0,
      scroll_depth: 0,
      user_agent: navigator.userAgent,
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language,
      timestamp: new Date().toISOString(),
    };

    // Send to Laravel tracking endpoint
    fetch("https://techupgrad.in/crm/track/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
      keepalive: true,
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Page view tracking failed:", response.status);
        }
        return response.json();
      })
      .then((result) => {
        console.log("Page view tracking successful:", result);
      })
      .catch((error) => {
        console.error("Page view tracking error:", error);
      });
  };

  return null;
}
