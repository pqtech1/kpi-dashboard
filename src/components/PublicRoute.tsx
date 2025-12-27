import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // If authenticated, redirect to home with preserved params
    const searchParams = new URLSearchParams(location.search);
    const queryString = searchParams.toString();
    const redirectPath = queryString ? `/?${queryString}` : "/";
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
}
