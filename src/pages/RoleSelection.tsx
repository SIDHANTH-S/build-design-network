import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { Home, Briefcase, Store, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const RoleSelection: React.FC = () => {
  const navigate = useNavigate();
  const { user, addRole, isLoading } = useAuth();
  
  const handleRoleSelection = async (role: UserRole) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to select a role",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }
    
    try {
      // If user already has the role, just navigate to that dashboard
      if (user.roles.includes(role)) {
        navigate(`/${role}`);
        return;
      }
      
      // Otherwise, add the role to the user
      const updatedUser = await addRole(role);
      
      if (updatedUser) {
        toast({
          title: "Role added successfully",
          description: `You can now access the ${role} dashboard`,
        });
        navigate(`/${role}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add role. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Role</h1>
          <p className="text-muted-foreground">
            Select how you want to use Skillink 24/7. You can always switch between roles later.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="w-full overflow-hidden hover:shadow-md transition-all duration-300 group relative animate-fade-in delay-100">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <CardHeader>
              <div className="p-2 rounded-full bg-blue-100 w-fit mb-2">
                <Home className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Homeowner</CardTitle>
              <CardDescription>
                I want to build or renovate my home
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-blue-500 mt-0.5" />
                  <span>Find verified professionals</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-blue-500 mt-0.5" />
                  <span>Buy quality construction materials</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-blue-500 mt-0.5" />
                  <span>Book services & track progress</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 group-hover:translate-y-0"
                onClick={() => handleRoleSelection('homeowner')}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue as Homeowner'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="w-full overflow-hidden hover:shadow-md transition-all duration-300 group relative animate-fade-in delay-200">
            <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
            <CardHeader>
              <div className="p-2 rounded-full bg-purple-100 w-fit mb-2">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Professional</CardTitle>
              <CardDescription>
                I want to offer my services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-purple-500 mt-0.5" />
                  <span>Showcase your portfolio & skills</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-purple-500 mt-0.5" />
                  <span>Get verified status & build trust</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-purple-500 mt-0.5" />
                  <span>Receive bookings & grow business</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleRoleSelection('professional')}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue as Professional'}
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="w-full overflow-hidden hover:shadow-md transition-all duration-300 group relative animate-fade-in delay-300">
            <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
            <CardHeader>
              <div className="p-2 rounded-full bg-green-100 w-fit mb-2">
                <Store className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Supplier</CardTitle>
              <CardDescription>
                I want to sell construction materials
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-green-500 mt-0.5" />
                  <span>List your products & inventory</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-green-500 mt-0.5" />
                  <span>Connect with buyers directly</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-4 w-4 mr-1 text-green-500 mt-0.5" />
                  <span>Manage orders & grow sales</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleRoleSelection('supplier')}
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Continue as Supplier'}
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        {user?.roles.length ? (
          <div className="text-center animate-fade-in">
            <p className="text-muted-foreground mb-2">
              Already have a role? Go to your existing dashboard:
            </p>
            <div className="flex justify-center gap-4">
              {user.roles.map((role) => (
                <Button
                  key={role}
                  variant="outline"
                  onClick={() => navigate(`/${role}`)}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
                </Button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RoleSelection;
