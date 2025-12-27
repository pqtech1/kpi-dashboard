/**
 * Tracking utilities for PQ Jewel INTEGRA
 */

// Keys to track in URLs
export const TRACKING_PARAM_KEYS = [
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
  "email_id",
  "timestamp",
] as const;

export type TrackingParamKey = (typeof TRACKING_PARAM_KEYS)[number];

export interface TrackingParams {
  campaign_id?: string;
  lead_id?: string;
  email?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  link_type?: string;
  email_id?: string;
  timestamp?: string;
  [key: string]: string | undefined;
}

/**
 * Extract tracking parameters from current URL
 */
export function extractTrackingParams(): TrackingParams {
  const params: TrackingParams = {};
  const searchParams = new URLSearchParams(window.location.search);

  TRACKING_PARAM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = decodeURIComponent(value);
    }
  });

  return params;
}

/**
 * Store tracking parameters in localStorage
 */
export function storeTrackingParams(params: TrackingParams): void {
  try {
    // Merge with existing params
    const existing = getTrackingParams();
    const merged = { ...existing, ...params };

    localStorage.setItem("pq_tracking_params", JSON.stringify(merged));
    console.log("Tracking params stored:", merged);
  } catch (error) {
    console.error("Error storing tracking params:", error);
  }
}

/**
 * Get tracking parameters from localStorage
 */
export function getTrackingParams(): TrackingParams {
  try {
    const stored = localStorage.getItem("pq_tracking_params");
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Error getting tracking params:", error);
    return {};
  }
}

/**
 * Clear tracking parameters from localStorage
 */
export function clearTrackingParams(): void {
  localStorage.removeItem("pq_tracking_params");
}

/**
 * Send page view tracking to backend
 */
export function trackPageView(
  additionalParams?: TrackingParams
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        ...getTrackingParams(),
        ...additionalParams,
        page_url: window.location.href,
        page_title: document.title,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toISOString(),
      };

      // Only send if we have required tracking data
      if (params.campaign_id && params.lead_id && params.email) {
        fetch("https://techupgrad.in/crm/track/page-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(params),
          keepalive: true, // Ensures request completes even if page is closed
          mode: "cors",
          credentials: "omit",
        })
          .then((response) => {
            if (!response.ok) {
              console.warn(
                "Page view tracking failed with status:",
                response.status
              );
            }
            return response.json();
          })
          .then((data) => {
            console.log("Page view tracked successfully:", data);
            resolve();
          })
          .catch((error) => {
            console.warn("Page view tracking network error:", error);
            resolve(); // Don't reject on network errors
          });
      } else {
        console.log("Insufficient tracking data, skipping page view tracking");
        resolve();
      }
    } catch (error) {
      console.error("Error in trackPageView:", error);
      resolve(); // Don't break the app on tracking errors
    }
  });
}

/**
 * Send custom event tracking
 */
export function trackEvent(
  eventName: string,
  eventData?: Record<string, any>
): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        ...getTrackingParams(),
        event_name: eventName,
        event_data: eventData || {},
        page_url: window.location.href,
        timestamp: new Date().toISOString(),
      };

      // Only send if we have basic tracking data
      if (params.campaign_id && params.lead_id) {
        fetch("https://techupgrad.in/crm/track/event", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
          keepalive: true,
        })
          .then((response) => {
            if (!response.ok) {
              console.warn(
                `Event tracking failed for ${eventName}:`,
                response.status
              );
            }
            resolve();
          })
          .catch((error) => {
            console.warn(
              `Event tracking network error for ${eventName}:`,
              error
            );
            resolve();
          });
      } else {
        console.log("Insufficient tracking data, skipping event tracking");
        resolve();
      }
    } catch (error) {
      console.error("Error in trackEvent:", error);
      resolve();
    }
  });
}

/**
 * Initialize tracking on page load
 */
export function initializeTracking(): void {
  // Extract from URL on initial load
  const urlParams = extractTrackingParams();
  if (Object.keys(urlParams).length > 0) {
    storeTrackingParams(urlParams);
  }

  // Send initial page view
  setTimeout(() => {
    trackPageView();
  }, 1000);

  // Track time on page
  let startTime = Date.now();
  let maxScrollDepth = 0;

  // Track scroll depth
  window.addEventListener(
    "scroll",
    () => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      maxScrollDepth = Math.max(maxScrollDepth, scrolled);
    },
    { passive: true }
  );

  // Send engagement data before page unload
  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    const engagementData = {
      time_spent: timeSpent,
      scroll_depth: Math.round(maxScrollDepth),
      exit_url: window.location.href,
    };

    // Use sendBeacon for reliable unload tracking
    if (navigator.sendBeacon) {
      const params = {
        ...getTrackingParams(),
        ...engagementData,
        event_name: "page_exit",
        timestamp: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(params)], {
        type: "application/json",
      });
      navigator.sendBeacon("https://techupgrad.in/crm/track/engagement", blob);
    }
  });
}
