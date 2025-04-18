import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Splash from "./pages/Splash";
import Auth from "./pages/Auth";
import RoleSelection from "./pages/RoleSelection";
import HomeownerDashboard from "./pages/dashboards/HomeownerDashboard";
import ProfessionalDashboard from "./pages/dashboards/ProfessionalDashboard";
import SupplierDashboard from "./pages/dashboards/SupplierDashboard";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/homeowner" element={<HomeownerDashboard />} />
            <Route path="/professional" element={<ProfessionalDashboard />} />
            <Route path="/supplier" element={<SupplierDashboard />} />
            <Route path="/search" element={<Search />} />
            {/* Additional routes to be added later */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
