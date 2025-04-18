
// Define the core types for the application

export type UserRole = 'homeowner' | 'professional' | 'supplier';

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  email?: string;
  roles: UserRole[];
  location?: Location;
  profileImage?: string;
  createdAt: Date;
  verified: boolean;
  trustScore?: number;
}

export interface Location {
  state: string;
  city: string;
  area?: string;
  latitude?: number;
  longitude?: number;
}

export interface Professional {
  userId: string;
  specialization: string[];
  portfolio: Project[];
  skills: string[];
  experience: number; // years
  chargePerHour?: number;
  availability?: string[];
  verified: boolean;
  trustScore: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  date: Date;
}

export interface Supplier {
  userId: string;
  businessName: string;
  gstNumber?: string;
  verified: boolean;
  categories: string[];
}

export interface Material {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  supplierId: string;
  inStock: boolean;
  stockCount?: number;
  unit: string; // kg, piece, etc.
}

export interface Booking {
  id: string;
  userId: string;
  serviceProviderId?: string;
  materialId?: string; 
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  date: Date;
  time?: string;
  totalAmount: number;
  notes?: string;
}
