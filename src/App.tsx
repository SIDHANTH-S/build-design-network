
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Splash from "./pages/Splash";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import HomeownerDashboard from "./pages/dashboards/HomeownerDashboard";
import ProfessionalDashboard from "./pages/dashboards/ProfessionalDashboard";
import SupplierDashboard from "./pages/dashboards/SupplierDashboard";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import { useAuth } from "./context/AuthContext";
import { ReactNode } from "react";

// Create Protected Route component to handle route protection
const ProtectedRoute = ({ children, requiredRole }: { children: ReactNode, requiredRole?: string }) => {
  const { user, isLoading } = useAuth();
  
  // Show loading state if auth is still being checked
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // If user is not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // If a specific role is required, check if user has that role
  if (requiredRole && !user.roles.includes(requiredRole)) {
    return <Navigate to="/role-selection" replace />;
  }
  
  return <>{children}</>;
};

// App Provider component to avoid hooks before render issue
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/role-selection" element={
        <ProtectedRoute>
          <RoleSelection />
        </ProtectedRoute>
      } />
      <Route path="/homeowner" element={
        <ProtectedRoute requiredRole="homeowner">
          <HomeownerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/professional" element={
        <ProtectedRoute requiredRole="professional">
          <ProfessionalDashboard />
        </ProtectedRoute>
      } />
      <Route path="/supplier" element={
        <ProtectedRoute requiredRole="supplier">
          <SupplierDashboard />
        </ProtectedRoute>
      } />
      <Route path="/search" element={<Search />} />
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
