
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Construction } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const handleNavigateHome = () => {
    if (!user) {
      navigate('/auth');
    } else if (user.roles.length === 0) {
      navigate('/role-selection');
    } else {
      navigate(`/${user.roles[0]}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <Construction className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={handleNavigateHome} 
          className="w-full"
        >
          Return to {user ? (user.roles.length > 0 ? `${user.roles[0]} Dashboard` : 'Role Selection') : 'Login'}
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
