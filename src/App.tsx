import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import { QueryParamsHandler } from "@/components/QueryParamsHandler";
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
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const queryClient = new QueryClient();

// Component to handle initial landing with params
const LandingHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  // Extract and store tracking params immediately
  useEffect(() => {
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

    const trackingParams: Record<string, string> = {};
    trackingKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        trackingParams[key] = decodeURIComponent(value);
      }
    });

    if (Object.keys(trackingParams).length > 0) {
      localStorage.setItem(
        "pq_tracking_params",
        JSON.stringify(trackingParams)
      );
      console.log("LandingHandler stored tracking params:", trackingParams);

      // Send immediate page view for landing
      sendLandingPageView(trackingParams);
    }

    // Check for demo credentials
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    if (username === "pq.demo" && password === "pq@demo") {
      // Store for auto-login
      localStorage.setItem("pq_demo_auto_login", "true");
      localStorage.setItem(
        "pq_demo_params",
        JSON.stringify({
          username: username,
          password: password,
          timestamp: Date.now(),
        })
      );
    }
  }, [location.search]);

  const sendLandingPageView = (params: Record<string, string>) => {
    const data = {
      ...params,
      page_url: window.location.href,
      page_title: "Jewel INTEGRA Landing",
      referrer: document.referrer,
      event_type: "landing_page",
      timestamp: new Date().toISOString(),
    };

    fetch("https://techupgrad.in/crm/track/page-view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(console.error);
  };

  // Handle redirection based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Already logged in, go to dashboard with params
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.toString()) {
          navigate(`/?${searchParams.toString()}`);
        } else {
          navigate("/");
        }
      } else {
        // Not logged in, go to login with params preserved
        const loginPath = `/login${location.search}`;
        navigate(loginPath);
      }
    }
  }, [isAuthenticated, isLoading, location.search, navigate]);

  // Show loading while checking
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-white">Loading Jewel INTEGRA...</p>
        </div>
      </div>
    );
  }

  return null; // Will redirect in useEffect
};

const ProtectedDashboard = () => (
  <DashboardLayout>
    <QueryParamsHandler />
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
      <Route path="/pq-offering/autohotkey" element={<AutoHotkeySolution />} />
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
  </DashboardLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/kpi">
        <AuthProvider>
          <Routes>
            {/* Root path - handle initial landing with tracking params */}
            <Route path="/" element={<LandingHandler />} />

            {/* Login page - preserves params */}
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <ProtectedDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
