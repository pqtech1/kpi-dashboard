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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
      <BrowserRouter>
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
