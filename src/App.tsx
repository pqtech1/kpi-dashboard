import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useEffect } from "react";
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import ProductionTracking from "./pages/ProductionTracking";
import MaterialCost from "./pages/MaterialCost";
import DesignCAD from "./pages/DesignCAD";
import Casting from "./pages/Casting";
import Finishing from "./pages/Finishing";
import QualityControl from "./pages/QualityControl";
import Executive from "./pages/Executive";
import PQOffering from "./pages/PQOffering";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AutoHotkeySolution from "./pages/solutions/AutoHotkeySolution";
import ERPIntegrationSolution from "./pages/solutions/ERPIntegrationSolution";
import ICEGateSolution from "./pages/solutions/ICEGateSolution";
import KPIDashboardSolution from "./pages/solutions/KPIDashboardSolution";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ========== PARAM PRESERVER COMPONENT ==========
const ParamPreserver = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Extract tracking parameters from URL
    const params = new URLSearchParams(location.search);
    const campaignId = params.get("campaign_id") || params.get("campaign");
    const leadId = params.get("lead_id") || params.get("lead");
    const email = params.get("email");

    if (campaignId && leadId && email) {
      // Store in localStorage (persists across sessions)
      localStorage.setItem("tracking_campaign_id", campaignId);
      localStorage.setItem("tracking_lead_id", leadId);
      localStorage.setItem("tracking_email", email);

      // Also store in sessionStorage (clears on browser close)
      sessionStorage.setItem("tracking_campaign_id", campaignId);
      sessionStorage.setItem("tracking_lead_id", leadId);
      sessionStorage.setItem("tracking_email", email);

      console.log("✅ Tracking parameters saved:", {
        campaignId,
        leadId,
        email,
      });

      // Send initial page view to Laravel
      sendPageView(campaignId, leadId, email);
    }

    // If user is authenticated and on login page with params, redirect to dashboard
    if (isAuthenticated && location.pathname === "/login" && location.search) {
      const params = new URLSearchParams(location.search);
      const dashboardUrl = `/?${params.toString()}`;
      navigate(dashboardUrl);
    }
  }, [location, navigate, isAuthenticated]);
};


const sendPageView = async (
  campaignId: string,
  leadId: string,
  email: string
) => {
  try {
    console.log('📤 Sending page view to:', 'https://techupgrad.in/crm/api/email/track-page-view');
    
    const response = await fetch("https://techupgrad.in/crm/api/email/track-page-view", {
      method: "POST",
      mode: "cors", // Add this
      credentials: "include", // Add this for cookies if needed
      headers: { 
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        campaign_id: campaignId,
        lead_id: leadId,
        email: email,
        page_url: window.location.href,
        page_title: document.title,
        session_id: "session_" + Date.now(),
      }),
    });
    
    if (!response.ok) {
      console.warn('⚠️ Tracking returned status:', response.status);
    } else {
      const data = await response.json();
      console.log('✅ Page view tracked:', data);
    }
  } catch (error) {
    console.error('❌ Tracking error:', error);
    
    // Fallback: Try GET request
    try {
      const params = new URLSearchParams({
        campaign_id: campaignId,
        lead_id: leadId,
        email: email,
        page_url: window.location.href,
        page_title: document.title,
        session_id: "session_" + Date.now(),
      }).toString();
      
      await fetch(`https://techupgrad.in/crm/api/email/track-page-view?${params}`, {
        method: "GET",
        mode: "no-cors",
      });
      console.log('📊 Page view tracked (GET fallback)');
    } catch (fallbackError) {
      console.error('❌ Fallback tracking also failed:', fallbackError);
    }
  }
};


// ========== END PARAM PRESERVER ==========

// ========== TRACKING WRAPPER COMPONENT ==========
const TrackingWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useEffect(() => {
    // Track every page view
    const trackPageView = async () => {
      const campaignId =
        localStorage.getItem("tracking_campaign_id") ||
        sessionStorage.getItem("tracking_campaign_id");
      const leadId =
        localStorage.getItem("tracking_lead_id") ||
        sessionStorage.getItem("tracking_lead_id");
      const email =
        localStorage.getItem("tracking_email") ||
        sessionStorage.getItem("tracking_email");

      if (campaignId && leadId && email) {
        try {
        await fetch("https://techupgrad.in/crm/api/email/track-page-view", {
          // ✅ WITH /crm/
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            campaign_id: campaignId,
            lead_id: leadId,
            email: email,
            page_url: window.location.href,
            page_title: document.title,
            session_id: "session_" + Date.now(),
          }),
        });
          console.log("📊 Page view tracked:", location.pathname);
        } catch (error) {
          console.error("Page tracking error:", error);
        }
      }
    };

    // Delay tracking to ensure component is mounted
    const timer = setTimeout(trackPageView, 300);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  return <>{children}</>;
};
// ========== END TRACKING WRAPPER ==========

const ProtectedDashboard = () => (
  <ProtectedRoute>
    <DashboardLayout>
      <ParamPreserver />
      <TrackingWrapper>
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/production" element={<ProductionTracking />} />
          <Route path="/material-cost" element={<MaterialCost />} />
          <Route path="/design-cad" element={<DesignCAD />} />
          <Route path="/casting" element={<Casting />} />
          <Route path="/finishing" element={<Finishing />} />
          <Route path="/quality-control" element={<QualityControl />} />
          <Route path="/executive" element={<Executive />} />
          <Route path="/pq-offering" element={<PQOffering />} />
          <Route
            path="/pq-offering/autohotkey"
            element={<AutoHotkeySolution />}
          />
          <Route
            path="/pq-offering/erp-integration"
            element={<ERPIntegrationSolution />}
          />
          <Route path="/pq-offering/icegate" element={<ICEGateSolution />} />
          <Route
            path="/pq-offering/kpi-dashboard"
            element={<KPIDashboardSolution />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TrackingWrapper>
    </DashboardLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/kpi">
        <AuthProvider>
          <ParamPreserver />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ProtectedDashboard />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
