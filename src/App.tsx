import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
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
import { trackingService } from "@/services/tracking";

const queryClient = new QueryClient();

// Initialize tracking ONCE when app loads
if (typeof window !== 'undefined') {
  trackingService.initialize(); // <-- ADD THIS
}

const ProtectedDashboard = () => (
  <ProtectedRoute>
    <DashboardLayout>
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
    </DashboardLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* Add basename="/kpi" here */}
      <BrowserRouter basename="/kpi">
        <AuthProvider>
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
