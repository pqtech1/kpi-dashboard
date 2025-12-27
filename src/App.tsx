import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
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

const queryClient = new QueryClient();

// Component to handle initial landing with params
const LandingRedirect = () => {
  const location = useLocation();

  // If we have tracking parameters in URL, preserve them through the login process
  const searchParams = new URLSearchParams(location.search);
  const trackingKeys = [
    "campaign_id",
    "lead_id",
    "email",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "link_type",
    "source",
  ];

  let hasTrackingParams = false;
  trackingKeys.forEach((key) => {
    if (searchParams.has(key)) {
      hasTrackingParams = true;
    }
  });

  // If user is already authenticated, redirect to dashboard with params
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect to dashboard with preserved params
    const redirectPath = `/${location.search}`;
    return <Navigate to={redirectPath} replace />;
  }

  // If not authenticated but has tracking params, redirect to login with params preserved
  if (hasTrackingParams) {
    const loginPath = `/login${location.search}`;
    return <Navigate to={loginPath} replace />;
  }

  // Default redirect to login without params
  return <Navigate to="/login" replace />;
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
            {/* Root path - handle tracking params */}
            <Route path="/" element={<LandingRedirect />} />
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
