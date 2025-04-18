
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Construction } from 'lucide-react';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  useEffect(() => {
    // Auto redirect after 2.5 seconds
    const timer = setTimeout(() => {
      if (user) {
        // If user is already logged in, redirect to appropriate dashboard
        if (user.roles.length === 0) {
          navigate('/role-selection');
        } else {
          navigate(`/${user.roles[0]}`);
        }
      } else {
        navigate('/auth');
      }
    }, 2500);
    
    return () => clearTimeout(timer);
  }, [navigate, user]);
  
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-skillink-blue to-skillink-blue-dark overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(26, 54, 93, 0.9), rgba(16, 42, 76, 0.95)), url('https://images.unsplash.com/photo-1581093458791-9a352d7e5682?q=80&w=2070')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="relative flex flex-col items-center animate-pulse">
        <Construction className="h-20 w-20 text-white mb-4" />
        <h1 className="text-4xl font-bold text-white mb-2 animate-fade-in">Skillink 24/7</h1>
        <p className="text-lg text-white/80 animate-fade-in delay-200">Build. Connect. Transform.</p>
      </div>
      
      <div className="absolute bottom-10 w-full max-w-xs flex justify-center">
        <div className="flex space-x-2 animate-fade-in delay-400">
          <div className="animate-pulse bg-white h-2 w-2 rounded-full"></div>
          <div className="animate-pulse bg-white h-2 w-2 rounded-full delay-100"></div>
          <div className="animate-pulse bg-white h-2 w-2 rounded-full delay-200"></div>
        </div>
      </div>
    </div>
  );
}

export default Splash;
