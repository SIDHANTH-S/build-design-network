
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { dataService } from '@/services/mockData';
import { Booking } from '@/types';
import {
  Briefcase,
  Calendar,
  Clock,
  Star,
  Shield,
  User,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertCircle,
  Image,
  Map,
  Upload,
  FileText,
  ThumbsUp,
  ChevronRight,
} from 'lucide-react';

const ProfessionalDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(
    user ? dataService.getBookingsByServiceProviderId(user.id) : []
  );
  
  const professional = user ? dataService.getProfessionalByUserId(user.id) : null;
  
  const handleBookingAction = (bookingId: string, status: Booking['status']) => {
    const updatedBooking = dataService.updateBookingStatus(bookingId, status);
    if (updatedBooking) {
      setBookings(bookings.map(b => b.id === bookingId ? updatedBooking : b));
      
      toast({
        title: `Booking ${status}`,
        description: `The booking has been ${status} successfully.`,
      });
    }
  };
  
  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="h-3 w-3" />
            <span>Pending</span>
          </Badge>
        );
      case 'confirmed':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <Clock className="h-3 w-3" />
            <span>Confirmed</span>
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
            <span>Completed</span>
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3" />
            <span>Cancelled</span>
          </Badge>
        );
    }
  };
  
  if (!user || !professional) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">Professional Dashboard</h1>
            <p className="text-muted-foreground mb-4">Manage your services and bookings</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-purple-50 border-purple-200 animate-fade-in">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Upcoming Bookings</h3>
                      <p className="text-sm text-muted-foreground">
                        {bookings.filter(b => b.status === 'confirmed').length} confirmed
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600" asChild>
                    <Link to="/professional/bookings">
                      <span>View</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200 animate-fade-in delay-100">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Image className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Portfolio Projects</h3>
                      <p className="text-sm text-muted-foreground">
                        {professional.portfolio.length} projects
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                    <Link to="/professional/portfolio">
                      <span>Manage</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200 animate-fade-in delay-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <ThumbsUp className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Reviews & Ratings</h3>
                      <p className="text-sm text-muted-foreground">12 total reviews</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-green-600" asChild>
                    <Link to="/professional/reviews">
                      <span>View All</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-200 animate-fade-in delay-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <MessageSquare className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Client Messages</h3>
                      <p className="text-sm text-muted-foreground">5 unread messages</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-amber-600" asChild>
                    <Link to="/messages">
                      <span>View All</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <Card className="animate-fade-in delay-200">
              <CardHeader className="pb-3">
                <CardTitle>Verification Status</CardTitle>
                <CardDescription>Your professional profile status</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-purple-600" />
                    <span className="font-medium">Trust Score</span>
                  </div>
                  <span className="font-semibold">{professional.trustScore}/100</span>
                </div>
                <Progress value={professional.trustScore} className="h-2" />
                
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-green-600" />
                      <span>Identity Verification</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span>Professional Credentials</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Image className="h-4 w-4 text-green-600" />
                      <span>Portfolio Uploads</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {professional.portfolio.length}/3
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Upload className="h-4 w-4 text-yellow-600" />
                      <span>Video Interview</span>
                    </div>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                      Optional
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button className="w-full" asChild>
                    <Link to="/professional/verification">
                      Complete Verification
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-8 animate-fade-in delay-400">
          <Tabs defaultValue="pending">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to="/professional/bookings">View All</Link>
              </Button>
            </div>
            
            {['pending', 'upcoming', 'completed'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-0">
                <div className="space-y-4">
                  {bookings.filter(b => {
                    if (tab === 'pending') return b.status === 'pending';
                    if (tab === 'upcoming') return b.status === 'confirmed';
                    if (tab === 'completed') return b.status === 'completed';
                    return false;
                  }).length > 0 ? (
                    bookings
                      .filter(b => {
                        if (tab === 'pending') return b.status === 'pending';
                        if (tab === 'upcoming') return b.status === 'confirmed';
                        if (tab === 'completed') return b.status === 'completed';
                        return false;
                      })
                      .map((booking) => {
                        const client = dataService.getUserById(booking.userId);
                        
                        return (
                          <Card key={booking.id}>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex gap-3">
                                  <Avatar className="h-10 w-10">
                                    <AvatarImage src={client?.profileImage} alt={client?.name} />
                                    <AvatarFallback>
                                      {client?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                    </AvatarFallback>
                                  </Avatar>
                                  
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h3 className="font-medium">{client?.name || 'Unknown Client'}</h3>
                                      {getStatusBadge(booking.status)}
                                    </div>
                                    
                                    <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                      <Calendar className="h-3 w-3 mr-1" />
                                      <span>
                                        {new Date(booking.date).toLocaleDateString()}{' '}
                                        {booking.time && `at ${booking.time}`}
                                      </span>
                                    </div>
                                    
                                    {booking.notes && (
                                      <p className="text-sm mt-2">{booking.notes}</p>
                                    )}
                                  </div>
                                </div>
                                
                                <div className="text-right">
                                  <p className="font-semibold text-lg">₹{booking.totalAmount}</p>
                                  <div className="flex gap-2 mt-2">
                                    {booking.status === 'pending' && (
                                      <>
                                        <Button 
                                          variant="outline" 
                                          size="sm" 
                                          className="text-destructive"
                                          onClick={() => handleBookingAction(booking.id, 'cancelled')}
                                        >
                                          Decline
                                        </Button>
                                        <Button 
                                          size="sm"
                                          onClick={() => handleBookingAction(booking.id, 'confirmed')}
                                        >
                                          Accept
                                        </Button>
                                      </>
                                    )}
                                    
                                    {booking.status === 'confirmed' && (
                                      <Button 
                                        size="sm"
                                        onClick={() => handleBookingAction(booking.id, 'completed')}
                                      >
                                        Mark Completed
                                      </Button>
                                    )}
                                    
                                    <Link to={`/bookings/${booking.id}`}>
                                      <Button variant="ghost" size="sm">Details</Button>
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Bookings</h3>
                      <p className="text-muted-foreground mb-4">
                        {tab === 'pending' 
                          ? "You don't have any pending booking requests"
                          : tab === 'upcoming'
                            ? "You don't have any upcoming bookings"
                            : "You don't have any completed bookings"
                        }
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <div className="mb-8 animate-fade-in delay-500">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Portfolio</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/professional/portfolio/add">
                <Upload className="h-4 w-4 mr-2" />
                Add Project
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {professional.portfolio.map((project) => (
              <Card key={project.id} className="overflow-hidden group">
                <div className="aspect-video relative">
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {new Date(project.date).toLocaleDateString()}
                    </span>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/professional/portfolio/${project.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfessionalDashboard;
