import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  const location = useLocation();  

  // Show loading while checking auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

   if (!isAuthenticated) {
     // Get current query parameters
     const searchParams = new URLSearchParams(location.search);

     // Preserve ALL existing parameters
     const redirectUrl = `/login?${searchParams.toString()}`;

     console.log("Redirecting to login with params:", redirectUrl);
     return <Navigate to={redirectUrl} replace />;
   }

  return <>{children}</>;
};

export default ProtectedRoute;
