/**
 * Minimal tracking service that auto-tracks everything
 */
class TrackingService {
  private campaignId: string | null = null;
  private leadId: string | null = null;
  private email: string | null = null;
  private sessionId: string;
  private initialized = false;

  constructor() {
    this.sessionId = "session_" + Math.random().toString(36).substr(2, 9);
  }

  // Initialize once when app loads
  initialize(): void {
    if (this.initialized) return;

    this.extractTrackingParams();
    this.setupAutoTracking();
    this.initialized = true;

    console.log("📊 Tracking initialized");
  }

  private extractTrackingParams(): void {
    // Get params from URL
    const urlParams = new URLSearchParams(window.location.search);

    this.campaignId =
      urlParams.get("campaign_id") ||
      urlParams.get("campaign") ||
      sessionStorage.getItem("campaign_id");

    this.leadId =
      urlParams.get("lead_id") ||
      urlParams.get("lead") ||
      sessionStorage.getItem("lead_id");

    this.email = urlParams.get("email") || sessionStorage.getItem("email");

    // Store in sessionStorage for later pages
    if (this.campaignId) sessionStorage.setItem("campaign_id", this.campaignId);
    if (this.leadId) sessionStorage.setItem("lead_id", this.leadId);
    if (this.email) sessionStorage.setItem("email", this.email);
  }

  private setupAutoTracking(): void {
    if (!this.campaignId || !this.leadId || !this.email) {
      console.log("No tracking params found");
      return;
    }

    // Track initial page view
    this.trackPageView();

    // Track navigation
    this.setupNavigationTracking();
  }

  private setupNavigationTracking(): void {
    let currentPath = window.location.pathname + window.location.search;

    // Listen for React Router navigation
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      setTimeout(() => checkPathChange(), 100);
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      setTimeout(() => checkPathChange(), 100);
    };

    window.addEventListener("popstate", () => {
      setTimeout(() => checkPathChange(), 100);
    });

    const checkPathChange = () => {
      const newPath = window.location.pathname + window.location.search;
      if (newPath !== currentPath) {
        currentPath = newPath;
        this.trackPageView();
      }
    };
  }

  private async trackPageView(): Promise<void> {
    if (!this.campaignId || !this.leadId || !this.email) return;

    try {
      await fetch("https://techupgrad.in/crm/email/track-page-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaign_id: this.campaignId,
          lead_id: this.leadId,
          email: this.email,
          page_url: window.location.href,
          page_title: document.title,
          referrer: document.referrer || "",
          session_id: this.sessionId,
        }),
        mode: "cors",
      });
    } catch (error) {
      console.error("Tracking error:", error);
    }
  }
}

// Create and export single instance
export const trackingService = new TrackingService();
