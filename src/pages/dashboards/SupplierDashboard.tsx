
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MaterialCard from '@/components/MaterialCard';
import { toast } from '@/components/ui/use-toast';
import { dataService } from '@/services/mockData';
import { Material, Booking } from '@/types';
import {
  Store,
  Package,
  BarChart,
  Calendar,
  Percent,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Upload,
  ChevronRight,
  ShoppingCart,
  TrendingUp,
  Search,
  Settings,
} from 'lucide-react';

const SupplierDashboard: React.FC = () => {
  const { user } = useAuth();
  const [materials, setMaterials] = useState<Material[]>(
    user ? dataService.getMaterialsBySupplierId(user.id) : []
  );
  const [orders, setOrders] = useState<Booking[]>(
    user ? dataService.getBookingsByServiceProviderId(user.id) : []
  );
  const [searchTerm, setSearchTerm] = useState('');
  
  const supplier = user ? dataService.getSupplierByUserId(user.id) : null;
  
  const filteredMaterials = searchTerm
    ? materials.filter(m => 
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        m.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : materials;
  
  const handleAddMaterial = () => {
    toast({
      title: "Feature coming soon",
      description: "Adding new materials will be available in the next update",
    });
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Action not available",
      description: "As a supplier, you cannot add your own materials to a cart",
    });
  };
  
  const handleUpdateStock = (materialId: string, inStock: boolean) => {
    const updatedMaterials = materials.map(m => 
      m.id === materialId ? { ...m, inStock } : m
    );
    setMaterials(updatedMaterials);
    
    toast({
      title: `Material ${inStock ? 'In Stock' : 'Out of Stock'}`,
      description: `Stock status has been updated successfully.`,
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
            <AlertCircle className="h-3 w-3" />
            <span>Processing</span>
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
            <span>Delivered</span>
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
  
  if (!user || !supplier) return null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">Supplier Dashboard</h1>
            <p className="text-muted-foreground mb-4">Manage your inventory and orders</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="bg-green-50 border-green-200 animate-fade-in">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Package className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Materials</h3>
                      <p className="text-sm text-muted-foreground">{materials.length} products listed</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-green-600" asChild>
                    <Link to="/supplier/materials">
                      <span>Manage</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-200 animate-fade-in delay-100">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <ShoppingCart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Orders</h3>
                      <p className="text-sm text-muted-foreground">
                        {orders.filter(o => o.status === 'confirmed').length} in progress
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600" asChild>
                    <Link to="/supplier/orders">
                      <span>View</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-200 animate-fade-in delay-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      <BarChart className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Sales Analytics</h3>
                      <p className="text-sm text-muted-foreground">View performance</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-purple-600" asChild>
                    <Link to="/supplier/analytics">
                      <span>Analytics</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-200 animate-fade-in delay-300">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <Percent className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Offers & Discounts</h3>
                      <p className="text-sm text-muted-foreground">2 active promotions</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-amber-600" asChild>
                    <Link to="/supplier/offers">
                      <span>Manage</span>
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
                <CardTitle>Business Profile</CardTitle>
                <CardDescription>Your supplier account status</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">{supplier.businessName}</h3>
                  {supplier.gstNumber && (
                    <p className="text-sm text-muted-foreground">GST: {supplier.gstNumber}</p>
                  )}
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Categories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {supplier.categories.map((category, index) => (
                      <Badge key={index} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span>GST Verification</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Store className="h-4 w-4 text-green-600" />
                      <span>Business Information</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      Completed
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Upload className="h-4 w-4 text-yellow-600" />
                      <span>Product Listings</span>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {materials.length} Added
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2 flex gap-2">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/supplier/settings">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </Button>
                  <Button className="w-full" asChild>
                    <Link to="/supplier/materials/add">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Material
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-8 animate-fade-in delay-400">
          <Tabs defaultValue="inventory">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <div className="relative w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input 
                    placeholder="Search materials..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddMaterial} asChild>
                  <Link to="/supplier/materials/add">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Material
                  </Link>
                </Button>
              </div>
            </div>
            
            <TabsContent value="inventory" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {filteredMaterials.length > 0 ? (
                  filteredMaterials.map((material) => (
                    <Card key={material.id} className="overflow-hidden">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={material.image} 
                          alt={material.name} 
                          className="object-cover w-full h-full"
                        />
                        <Badge 
                          className="absolute top-2 right-2"
                          variant={material.category === 'Premium' ? 'default' : 'secondary'}
                        >
                          {material.category}
                        </Badge>
                      </div>
                      
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-1">{material.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{material.description}</p>
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="text-lg font-bold text-green-600">
                            ₹{material.price}
                            <span className="text-xs font-normal text-muted-foreground ml-1">
                              per {material.unit}
                            </span>
                          </div>
                          
                          {material.inStock ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              In Stock: {material.stockCount}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Out of Stock
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            variant={material.inStock ? "destructive" : "default"}
                            size="sm"
                            className="flex-1"
                            onClick={() => handleUpdateStock(material.id, !material.inStock)}
                          >
                            {material.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" asChild>
                            <Link to={`/supplier/materials/${material.id}`}>
                              Edit
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-4 text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    {searchTerm ? (
                      <>
                        <h3 className="text-lg font-medium mb-2">No matching materials</h3>
                        <p className="text-muted-foreground mb-4">Try another search term</p>
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-medium mb-2">No Materials Yet</h3>
                        <p className="text-muted-foreground mb-4">Add your first material to get started</p>
                        <Button onClick={handleAddMaterial}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add First Material
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="orders" className="mt-0">
              <div className="space-y-4">
                {orders.length > 0 ? (
                  orders.map((order) => {
                    const customer = dataService.getUserById(order.userId);
                    const material = order.materialId ? dataService.getMaterialById(order.materialId) : null;
                    
                    return (
                      <Card key={order.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={customer?.profileImage} alt={customer?.name} />
                                <AvatarFallback>
                                  {customer?.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">
                                    Order by {customer?.name || 'Unknown Customer'}
                                  </h3>
                                  {getStatusBadge(order.status)}
                                </div>
                                
                                {material && (
                                  <p className="text-sm font-medium mt-1">
                                    {material.name} × {Math.round(order.totalAmount / material.price)} {material.unit}s
                                  </p>
                                )}
                                
                                <div className="text-sm text-muted-foreground mt-1 flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>
                                    {new Date(order.date).toLocaleDateString()}
                                  </span>
                                </div>
                                
                                {order.notes && (
                                  <p className="text-sm mt-2">{order.notes}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <p className="font-semibold text-lg">₹{order.totalAmount}</p>
                              <div className="flex gap-2 mt-2">
                                {order.status === 'confirmed' && (
                                  <Button 
                                    size="sm"
                                    onClick={() => {
                                      const updatedOrders = orders.map(o => 
                                        o.id === order.id ? { ...o, status: 'completed' as const } : o
                                      );
                                      setOrders(updatedOrders);
                                      
                                      toast({
                                        title: "Order Completed",
                                        description: "The order has been marked as delivered",
                                      });
                                    }}
                                  >
                                    Mark as Delivered
                                  </Button>
                                )}
                                
                                <Link to={`/supplier/orders/${order.id}`}>
                                  <Button variant="ghost" size="sm">View Details</Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Orders Yet</h3>
                    <p className="text-muted-foreground">When customers place orders, they'll appear here</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                  <CardDescription>Overview of your business performance</CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-2">
                      <h3 className="text-sm text-muted-foreground">Total Revenue</h3>
                      <p className="text-3xl font-bold text-green-600">₹24,500</p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+12% from last month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm text-muted-foreground">Orders</h3>
                      <p className="text-3xl font-bold">18</p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+5% from last month</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-sm text-muted-foreground">Avg. Order Value</h3>
                      <p className="text-3xl font-bold">₹1,361</p>
                      <div className="flex items-center text-sm text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>+3% from last month</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center py-12">
                    <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Detailed Analytics</h3>
                    <p className="text-muted-foreground mb-4">Detailed analytics will be available in the next update</p>
                    <Button variant="outline" asChild>
                      <Link to="/supplier/analytics">
                        View Full Analytics
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupplierDashboard;
