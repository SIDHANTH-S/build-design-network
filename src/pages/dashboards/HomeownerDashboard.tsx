
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
import ProfileCard from '@/components/ProfileCard';
import MaterialCard from '@/components/MaterialCard';
import { toast } from '@/components/ui/use-toast';
import { dataService } from '@/services/mockData';
import { Professional, Material, Booking } from '@/types';
import {
  Home,
  Calendar,
  Clock,
  Package,
  Search,
  User,
  MessageSquare,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  Map,
  Construction,
  ChevronRight,
} from 'lucide-react';

const HomeownerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>(
    dataService.getBookingsByUserId(user?.id || '')
  );
  const professionals = dataService.getProfessionals().slice(0, 3);
  const materials = dataService.getMaterials().slice(0, 4);
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
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
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}</h1>
            <p className="text-muted-foreground mb-4">Your homeowner dashboard</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-blue-50 border-blue-200 animate-fade-in">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Search className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Find Professionals</h3>
                      <p className="text-sm text-muted-foreground">Discover verified experts</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                    <Link to="/search">
                      <span>Explore</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200 animate-fade-in delay-100">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <Calendar className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Schedule Service</h3>
                      <p className="text-sm text-muted-foreground">Book an appointment</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600" asChild>
                    <Link to="/book-service">
                      <span>Book Now</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-200 animate-fade-in delay-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Buy Materials</h3>
                      <p className="text-sm text-muted-foreground">Shop construction supplies</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-green-600" asChild>
                    <Link to="/materials">
                      <span>Shop Now</span>
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
                      <h3 className="font-medium">Recent Messages</h3>
                      <p className="text-sm text-muted-foreground">3 unread messages</p>
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
                <div className="flex justify-between items-start">
                  <CardTitle>Your Profile</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/profile/edit">Edit</Link>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center text-center pb-3">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user.profileImage} alt={user.name} />
                  <AvatarFallback>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <Map className="h-3 w-3 mr-1" />
                  <span>{user.location?.city}, {user.location?.state}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  {user.roles.map((role) => (
                    <Badge key={role} variant="outline" className="capitalize">
                      {role}
                    </Badge>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mb-2" asChild>
                  <Link to="/profile">View Full Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-8 animate-fade-in delay-400">
          <Tabs defaultValue="bookings">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                <TabsTrigger value="professionals">Nearby Professionals</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>
              
              <Button variant="ghost" size="sm" asChild>
                <Link to="/bookings">View All</Link>
              </Button>
            </div>
            
            <TabsContent value="bookings" className="mt-0">
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => {
                    const serviceProvider = booking.serviceProviderId 
                      ? dataService.getUserById(booking.serviceProviderId)
                      : null;
                    
                    const material = booking.materialId
                      ? dataService.getMaterialById(booking.materialId)
                      : null;
                    
                    return (
                      <Card key={booking.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-full bg-muted">
                                {material ? (
                                  <Package className="h-5 w-5 text-green-600" />
                                ) : (
                                  <Construction className="h-5 w-5 text-blue-600" />
                                )}
                              </div>
                              
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">
                                    {material 
                                      ? `Material Order: ${material.name}`
                                      : `Service Booking ${serviceProvider ? `with ${serviceProvider.name}` : ''}`
                                    }
                                  </h3>
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
                              <Link to={`/bookings/${booking.id}`}>
                                <Button variant="ghost" size="sm">View Details</Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Bookings Yet</h3>
                    <p className="text-muted-foreground mb-4">You haven't made any bookings yet.</p>
                    <Button asChild>
                      <Link to="/search">Find Professionals</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="professionals" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {professionals.map((professional) => {
                  const profUser = dataService.getUserById(professional.userId);
                  if (!profUser) return null;
                  
                  return (
                    <ProfileCard 
                      key={professional.userId}
                      user={profUser}
                      professional={professional}
                    />
                  );
                })}
              </div>
            </TabsContent>
            
            <TabsContent value="materials" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {materials.map((material) => (
                  <MaterialCard 
                    key={material.id}
                    material={material}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomeownerDashboard;
