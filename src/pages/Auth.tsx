
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OTPInput from '@/components/OTPInput';
import { toast } from '@/components/ui/use-toast';
import { Construction, ArrowLeft, Loader2 } from 'lucide-react';

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, verifyOTP, isLoading, user } = useAuth();
  
  // Get the register param from URL query if it exists
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('register') === 'true' ? 'register' : 'login';
  
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'otp'>(initialTab as 'login' | 'register');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [processingLogin, setProcessingLogin] = useState<boolean>(false);
  
  useEffect(() => {
    // If already logged in, navigate to dashboard
    if (user) {
      if (user.roles.length === 0) {
        navigate('/role-selection');
      } else {
        navigate(`/${user.roles[0]}`);
      }
    }
  }, [user, navigate]);
  
  const validatePhoneNumber = (value: string): boolean => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(value)) {
      setPhoneError('Enter a valid 10-digit Indian mobile number');
      return false;
    }
    setPhoneError('');
    return true;
  };
  
  const validateEmail = (value: string): boolean => {
    if (!value) return true; // Email is optional
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value)) {
      setEmailError('Enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };
  
  const handleSubmitPhone = async () => {
    if (!validatePhoneNumber(phoneNumber)) return;
    
    try {
      setProcessingLogin(true);
      
      if (activeTab === 'login') {
        // Try to login the user
        const response = await login(phoneNumber);
        
        // If login fails (no user found), show a more friendly message
        if (!response) {
          toast({
            title: "Account not found",
            description: "This number doesn't have an account. Please register first.",
            variant: "destructive"
          });
          // Optional: Automatically switch to register tab
          setActiveTab('register');
          return;
        }
        
        // Login success, move to OTP verification
        setActiveTab('otp');
      } else {
        // For registration
        if (!name.trim()) {
          toast({
            title: "Name required",
            description: "Please enter your full name",
            variant: "destructive"
          });
          return;
        }
        
        if (email && !validateEmail(email)) return;
        
        // Move to OTP verification for registration flow
        setActiveTab('otp');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setProcessingLogin(false);
    }
  };
  
  const handleOTPComplete = async (otp: string) => {
    try {
      const isValid = await verifyOTP(otp);
      
      if (isValid) {
        if (activeTab === 'register') {
          // For registration flow, create a new user
          await register(name, phoneNumber, email || undefined);
          
          toast({
            title: "Success!",
            description: "Account created successfully",
          });
        } else {
          // For login flow
          toast({
            title: "Login successful",
            description: "Welcome back to Skillink 24/7",
          });
        }
        
        // In both cases, redirect to role selection
        navigate('/role-selection');
      } else {
        toast({
          title: "Invalid OTP",
          description: "Please enter the correct OTP",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numeric input with max 10 digits
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
      if (value.length === 10) {
        validatePhoneNumber(value);
      } else if (phoneError) {
        setPhoneError('');
      }
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md animate-scale-in">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Construction className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Skillink 24/7</span>
            </Link>
          </div>
          
          {activeTab === 'otp' ? (
            <>
              <CardTitle>Enter Verification Code</CardTitle>
              <CardDescription>
                We've sent a 6-digit code to {phoneNumber}
              </CardDescription>
            </>
          ) : (
            <>
              <CardTitle>Welcome to Skillink 24/7</CardTitle>
              <CardDescription>
                {activeTab === 'login' 
                  ? 'Sign in to continue to your account' 
                  : 'Create an account to get started'}
              </CardDescription>
            </>
          )}
        </CardHeader>
        
        <CardContent>
          {activeTab === 'otp' ? (
            <div className="space-y-4">
              <OTPInput 
                length={6} 
                onComplete={handleOTPComplete} 
                className="justify-center" 
              />
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Didn't receive code? </span>
                <Button variant="link" className="p-0 h-auto" onClick={() => setActiveTab('login')}>
                  Resend
                </Button>
              </div>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center border rounded-l-md px-3 bg-muted">
                      +91
                    </div>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your 10-digit number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="rounded-l-none"
                    />
                  </div>
                  {phoneError && <p className="text-destructive text-sm">{phoneError}</p>}
                </div>
                
                <Button 
                  onClick={handleSubmitPhone} 
                  className="w-full" 
                  disabled={isLoading || processingLogin || phoneNumber.length !== 10}
                >
                  {(isLoading || processingLogin) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    'Continue with OTP'
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="register" className="mt-0 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-phone">Phone Number</Label>
                  <div className="flex">
                    <div className="flex items-center justify-center border rounded-l-md px-3 bg-muted">
                      +91
                    </div>
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="Enter your 10-digit number"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="rounded-l-none"
                    />
                  </div>
                  {phoneError && <p className="text-destructive text-sm">{phoneError}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value) validateEmail(e.target.value);
                    }}
                  />
                  {emailError && <p className="text-destructive text-sm">{emailError}</p>}
                </div>
                
                <Button 
                  onClick={handleSubmitPhone} 
                  className="w-full" 
                  disabled={isLoading || processingLogin || phoneNumber.length !== 10 || !name.trim()}
                >
                  {(isLoading || processingLogin) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing
                    </>
                  ) : (
                    'Register with OTP'
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          {activeTab === 'otp' ? (
            <Button 
              variant="ghost" 
              onClick={() => setActiveTab(initialTab as 'login' | 'register')}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {initialTab === 'register' ? 'registration' : 'login'}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{' '}
              &{' '}
              <Link to="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
