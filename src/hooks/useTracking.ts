import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  extractTrackingParams,
  storeTrackingParams,
  getTrackingParams,
  trackEvent,
  trackPageView,
  TrackingParams,
} from "@/utils/tracking";

export function useTracking() {
  const location = useLocation();

  const extractAndStoreParams = useCallback(() => {
    const params = extractTrackingParams();
    if (Object.keys(params).length > 0) {
      storeTrackingParams(params);
    }
    return params;
  }, []);

  const getStoredParams = useCallback((): TrackingParams => {
    return getTrackingParams();
  }, []);

  const trackCustomEvent = useCallback(
    (eventName: string, eventData?: Record<string, any>) => {
      return trackEvent(eventName, eventData);
    },
    []
  );

  const trackCurrentPageView = useCallback(
    (additionalParams?: TrackingParams) => {
      return trackPageView(additionalParams);
    },
    []
  );

  // Auto-extract params on location change
  const extractParams = useCallback(() => {
    return extractAndStoreParams();
  }, [extractAndStoreParams]);

  return {
    extractAndStoreParams: extractParams,
    getStoredParams,
    trackCustomEvent,
    trackCurrentPageView,
    hasTrackingParams: () => {
      const params = getTrackingParams();
      return !!(params.campaign_id && params.lead_id && params.email);
    },
  };
}
