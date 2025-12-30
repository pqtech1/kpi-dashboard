/**
 * Minimal tracking service that auto-tracks everything
 */
class TrackingService {
  private static instance: TrackingService;
  private campaignId: string | null = null;
  private leadId: string | null = null;
  private email: string | null = null;
  private sessionId: string;
  private initialized = false;
  private currentPath = "";

  constructor() {
    this.sessionId = "session_" + Math.random().toString(36).substr(2, 9);
  }

  static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  // Initialize on app start - call this ONCE in App.tsx
  initialize(): void {
    if (this.initialized) return;

    this.extractTrackingParams();
    this.setupAutoTracking();
    this.initialized = true;

    console.log("Tracking initialized:", {
      campaignId: this.campaignId,
      leadId: this.leadId,
      email: this.email,
    });
  }

  private extractTrackingParams(): void {
    // 1. Check URL parameters first (from email click)
    const urlParams = new URLSearchParams(window.location.search);

    this.campaignId =
      urlParams.get("campaign_id") ||
      urlParams.get("campaign") || // your current param
      sessionStorage.getItem("campaign_id");

    this.leadId =
      urlParams.get("lead_id") ||
      urlParams.get("lead") || // your current param
      sessionStorage.getItem("lead_id");

    this.email =
      urlParams.get("email") ||
      decodeURIComponent(urlParams.get("email") || "") ||
      sessionStorage.getItem("email");

    // 2. Store for later pages
    if (this.campaignId) {
      sessionStorage.setItem("campaign_id", this.campaignId);
      // Also set as URL param for all navigation
      this.updateUrlWithTracking();
    }
    if (this.leadId) sessionStorage.setItem("lead_id", this.leadId);
    if (this.email) sessionStorage.setItem("email", this.email);
  }

  private updateUrlWithTracking(): void {
    // Update URL without reloading to maintain tracking params
    if (this.campaignId && this.leadId && this.email) {
      const url = new URL(window.location.href);
      url.searchParams.set("campaign_id", this.campaignId);
      url.searchParams.set("lead_id", this.leadId);
      url.searchParams.set("email", this.email);

      window.history.replaceState({}, "", url.toString());
    }
  }

  // Set up automatic tracking - NO MANUAL COMPONENT CHANGES NEEDED
  private setupAutoTracking(): void {
    // Track page views on route changes
    this.setupRouteTracking();

    // Track clicks on all links
    this.setupClickTracking();

    // Track initial page load
    this.trackPageView();
  }

  private setupRouteTracking(): void {
    // Override history methods to track navigation
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = (...args) => {
      originalPushState.apply(window.history, args);
      this.onRouteChange();
    };

    window.history.replaceState = (...args) => {
      originalReplaceState.apply(window.history, args);
      this.onRouteChange();
    };

    // Also track popstate (back/forward)
    window.addEventListener("popstate", () => {
      setTimeout(() => this.onRouteChange(), 100);
    });

    // Track initial route
    this.currentPath = window.location.pathname + window.location.search;
  }

  private onRouteChange(): void {
    const newPath = window.location.pathname + window.location.search;

    // Only track if path actually changed
    if (newPath !== this.currentPath) {
      this.currentPath = newPath;
      this.trackPageView();
    }
  }

  private setupClickTracking(): void {
    // Track all clicks on links
    document.addEventListener(
      "click",
      (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest("a");

        if (link && this.campaignId && this.leadId && this.email) {
          const linkUrl = link.href;
          const linkText = link.textContent || link.innerText || "";

          // Skip tracking pixel clicks and external tracking URLs
          if (
            linkUrl.includes("/email/click") ||
            linkUrl.includes("/email/open")
          ) {
            return;
          }

          // Determine link type
          let linkType = "internal_navigation";
          if (
            linkUrl.startsWith("http") &&
            !linkUrl.includes(window.location.hostname)
          ) {
            linkType = "external_link";
          }

          // Track the click
          this.trackLinkClick(linkText, linkUrl, linkType);
        }
      },
      true
    ); // Use capture phase
  }

  // Send page view to CRM
  private async trackPageView(): Promise<void> {
    if (!this.campaignId || !this.leadId || !this.email) {
      console.log("No tracking params available for page view");
      return;
    }

    const data = {
      campaign_id: this.campaignId,
      lead_id: this.leadId,
      email: this.email,
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer || "",
      session_id: this.sessionId,
    };

    try {
      await fetch("https://techupgrad.in/crm/email/track-page-view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include", // Include cookies if needed
      });

      console.log("Page view tracked:", data.page_url);
    } catch (error) {
      console.error("Tracking error:", error);
    }
  }

  // Track link clicks
  private async trackLinkClick(
    linkText: string,
    linkUrl: string,
    linkType: string
  ): Promise<void> {
    if (!this.campaignId || !this.leadId || !this.email) return;

    const data = {
      campaign_id: this.campaignId,
      lead_id: this.leadId,
      email: this.email,
      link_url: linkUrl,
      link_text: linkText.substring(0, 200), // Limit length
      page_url: window.location.href,
      link_type: linkType,
      session_id: this.sessionId,
    };

    try {
      await fetch("https://techupgrad.in/crm/email/track-internal-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "include",
      });

      console.log("Link click tracked:", { linkText, linkType });
    } catch (error) {
      console.error("Link tracking error:", error);
    }
  }

  // Public method to check if tracking is active
  isTrackingActive(): boolean {
    return !!(this.campaignId && this.leadId && this.email);
  }
}

// Export singleton instance
export const trackingService = TrackingService.getInstance();
