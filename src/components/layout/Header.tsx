
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  User,
  Menu,
  Construction,
  LogOut,
  MessageSquare,
  Bell,
  Search,
  Home,
  Briefcase,
  ShoppingBag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
            <Construction className="h-6 w-6 text-primary" />
            <span className="hidden md:inline">Skillink 24/7</span>
          </Link>
        </div>

        {user && (
          <div className="hidden md:flex items-center gap-6">
            <Link to="/search" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            
            {user.roles.includes("homeowner") && (
              <Link to="/homeowner" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            )}
            
            {user.roles.includes("professional") && (
              <Link to="/professional" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>Services</span>
              </Link>
            )}
            
            {user.roles.includes("supplier") && (
              <Link to="/supplier" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                <ShoppingBag className="h-4 w-4" />
                <span>Materials</span>
              </Link>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/messages" className="relative">
                <MessageSquare className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Link>
              
              <Link to="/notifications" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center">
                  5
                </Badge>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImage} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0].toUpperCase()).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="flex items-center w-full">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/role-selection" className="flex items-center w-full">
                      <Menu className="mr-2 h-4 w-4" />
                      <span>Switch Role</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?register=true">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
