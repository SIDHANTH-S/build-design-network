
import { User, Professional, Supplier, Material, Booking, Project, UserRole } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phoneNumber: '9876543210',
    email: 'rahul@example.com',
    roles: ['homeowner'],
    location: {
      state: 'Maharashtra',
      city: 'Mumbai',
      area: 'Andheri'
    },
    profileImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    createdAt: new Date('2023-01-15'),
    verified: true
  },
  {
    id: '2',
    name: 'Priya Patel',
    phoneNumber: '8765432109',
    email: 'priya@example.com',
    roles: ['professional'],
    location: {
      state: 'Karnataka',
      city: 'Bangalore',
      area: 'Whitefield'
    },
    profileImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    createdAt: new Date('2023-02-10'),
    verified: true,
    trustScore: 85
  },
  {
    id: '3',
    name: 'Vikram Singh',
    phoneNumber: '7654321098',
    email: 'vikram@example.com',
    roles: ['supplier'],
    location: {
      state: 'Delhi',
      city: 'New Delhi',
      area: 'Connaught Place'
    },
    profileImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    createdAt: new Date('2023-03-05'),
    verified: true
  },
  {
    id: '4',
    name: 'Ananya Reddy',
    phoneNumber: '6543210987',
    email: 'ananya@example.com',
    roles: ['professional', 'homeowner'],
    location: {
      state: 'Tamil Nadu',
      city: 'Chennai',
      area: 'T Nagar'
    },
    profileImage: 'https://randomuser.me/api/portraits/women/4.jpg',
    createdAt: new Date('2023-04-20'),
    verified: true,
    trustScore: 92
  },
  {
    id: '5',
    name: 'Arjun Kumar',
    phoneNumber: '9876543211',
    email: 'arjun@example.com',
    roles: ['supplier', 'homeowner'],
    location: {
      state: 'Gujarat',
      city: 'Ahmedabad',
      area: 'Navrangpura'
    },
    profileImage: 'https://randomuser.me/api/portraits/men/5.jpg',
    createdAt: new Date('2023-05-15'),
    verified: true
  }
];

// Mock Projects for Professionals
export const projects: Project[] = [
  {
    id: '1',
    title: 'Modern Villa Design',
    description: 'Luxurious 4 BHK villa design with swimming pool and garden area',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde'
    ],
    date: new Date('2022-05-10')
  },
  {
    id: '2',
    title: 'Budget Apartment Interior',
    description: 'Cost-effective interior design for 2 BHK apartment',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a'
    ],
    date: new Date('2022-08-15')
  },
  {
    id: '3',
    title: 'Office Space Renovation',
    description: 'Complete renovation of a 2000 sq ft office space',
    images: [
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
    ],
    date: new Date('2022-11-20')
  },
  {
    id: '4',
    title: 'Farmhouse Construction',
    description: 'Ground-up construction of a farmhouse with sustainable materials',
    images: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6',
      'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5'
    ],
    date: new Date('2023-01-05')
  },
  {
    id: '5',
    title: 'Bathroom Remodeling',
    description: 'Complete bathroom makeover with modern fittings',
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101'
    ],
    date: new Date('2023-03-10')
  }
];

// Mock Professionals
export const professionals: Professional[] = [
  {
    userId: '2',
    specialization: ['Interior Designer'],
    portfolio: [projects[0], projects[1]],
    skills: ['Space Planning', 'Color Scheme', '3D Visualization'],
    experience: 7,
    chargePerHour: 1500,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    verified: true,
    trustScore: 85
  },
  {
    userId: '4',
    specialization: ['Civil Engineer'],
    portfolio: [projects[2], projects[3]],
    skills: ['Structural Design', 'Project Management', 'AutoCAD'],
    experience: 10,
    chargePerHour: 2000,
    availability: ['Mon', 'Wed', 'Fri'],
    verified: true,
    trustScore: 92
  },
  {
    userId: '6',
    specialization: ['Plumber'],
    portfolio: [projects[4]],
    skills: ['Pipe Fitting', 'Leak Detection', 'Fixture Installation'],
    experience: 5,
    chargePerHour: 800,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    verified: true,
    trustScore: 78
  }
];

// Mock Suppliers
export const suppliers: Supplier[] = [
  {
    userId: '3',
    businessName: 'Singh Construction Materials',
    gstNumber: 'GST123456789',
    verified: true,
    categories: ['Cement', 'Steel', 'Bricks']
  },
  {
    userId: '5',
    businessName: 'Kumar Home Supplies',
    gstNumber: 'GST987654321',
    verified: true,
    categories: ['Tiles', 'Sanitary', 'Electrical']
  }
];

// Mock Materials
export const materials: Material[] = [
  {
    id: '1',
    name: 'Premium Cement',
    description: 'High-quality cement for construction',
    price: 350,
    category: 'Cement',
    image: 'https://images.unsplash.com/photo-1595716242849-e4967367c205',
    supplierId: '3',
    inStock: true,
    stockCount: 100,
    unit: 'bag'
  },
  {
    id: '2',
    name: 'Steel Reinforcement Bars',
    description: '8mm TMT Bars for reinforcement',
    price: 75,
    category: 'Steel',
    image: 'https://images.unsplash.com/photo-1605001009383-3a9b8b8dbd2d',
    supplierId: '3',
    inStock: true,
    stockCount: 500,
    unit: 'kg'
  },
  {
    id: '3',
    name: 'Red Clay Bricks',
    description: 'Standard size red clay bricks',
    price: 8,
    category: 'Bricks',
    image: 'https://images.unsplash.com/photo-1597484661973-ee6cd0b6482c',
    supplierId: '3',
    inStock: true,
    stockCount: 1000,
    unit: 'piece'
  },
  {
    id: '4',
    name: 'Ceramic Floor Tiles',
    description: '2x2 ft ceramic tiles for flooring',
    price: 85,
    category: 'Tiles',
    image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d',
    supplierId: '5',
    inStock: true,
    stockCount: 200,
    unit: 'piece'
  },
  {
    id: '5',
    name: 'Bathroom Fixtures Set',
    description: 'Complete set of bathroom fixtures',
    price: 5000,
    category: 'Sanitary',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a',
    supplierId: '5',
    inStock: true,
    stockCount: 20,
    unit: 'set'
  }
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    serviceProviderId: '2',
    status: 'completed',
    date: new Date('2023-05-20'),
    time: '10:00 AM',
    totalAmount: 4500,
    notes: 'Interior design consultation for living room'
  },
  {
    id: '2',
    userId: '1',
    materialId: '1',
    status: 'confirmed',
    date: new Date('2023-06-15'),
    totalAmount: 3500,
    notes: 'Delivery to site address'
  },
  {
    id: '3',
    userId: '4',
    serviceProviderId: '6',
    status: 'pending',
    date: new Date('2023-07-10'),
    time: '3:00 PM',
    totalAmount: 2400,
    notes: 'Bathroom plumbing repair'
  }
];

// Authentication Service Mock
let currentUser: User | null = null;

export const authService = {
  login: (phoneNumber: string): User | null => {
    const user = users.find(u => u.phoneNumber === phoneNumber);
    if (user) {
      currentUser = user;
      return user;
    }
    return null;
  },
  
  register: (name: string, phoneNumber: string, email?: string): User => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      phoneNumber,
      email,
      roles: [],
      createdAt: new Date(),
      verified: false
    };
    
    users.push(newUser);
    currentUser = newUser;
    return newUser;
  },
  
  getCurrentUser: (): User | null => currentUser,
  
  logout: () => {
    currentUser = null;
  },
  
  verifyOTP: (otp: string): boolean => {
    // Mock OTP verification - any 6 digit code is valid
    return otp.length === 6;
  },
  
  addRole: (userId: string, role: UserRole): User | null => {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      if (!users[userIndex].roles.includes(role)) {
        users[userIndex].roles.push(role);
      }
      if (currentUser && currentUser.id === userId) {
        currentUser = users[userIndex];
      }
      return users[userIndex];
    }
    return null;
  },
  
  updateUserProfile: (userId: string, data: Partial<User>): User | null => {
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      users[userIndex] = { ...users[userIndex], ...data };
      if (currentUser && currentUser.id === userId) {
        currentUser = users[userIndex];
      }
      return users[userIndex];
    }
    return null;
  }
};

// Create mock data service
export const dataService = {
  // User related
  getUsers: () => users,
  getUserById: (id: string) => users.find(user => user.id === id),
  getUsersByRole: (role: UserRole) => users.filter(user => user.roles.includes(role)),
  
  // Professional related
  getProfessionals: () => professionals,
  getProfessionalByUserId: (userId: string) => professionals.find(p => p.userId === userId),
  getProfessionalsBySpecialization: (specialization: string) => 
    professionals.filter(p => p.specialization.includes(specialization)),
  
  // Supplier related
  getSuppliers: () => suppliers,
  getSupplierByUserId: (userId: string) => suppliers.find(s => s.userId === userId),
  getSuppliersByCategory: (category: string) => 
    suppliers.filter(s => s.categories.includes(category)),
  
  // Material related
  getMaterials: () => materials,
  getMaterialById: (id: string) => materials.find(m => m.id === id),
  getMaterialsByCategory: (category: string) => 
    materials.filter(m => m.category === category),
  getMaterialsBySupplierId: (supplierId: string) => 
    materials.filter(m => m.supplierId === supplierId),
  
  // Booking related
  getBookings: () => bookings,
  getBookingById: (id: string) => bookings.find(b => b.id === id),
  getBookingsByUserId: (userId: string) => bookings.filter(b => b.userId === userId),
  getBookingsByServiceProviderId: (providerId: string) => 
    bookings.filter(b => b.serviceProviderId === providerId),
  
  createBooking: (booking: Omit<Booking, 'id'>): Booking => {
    const newBooking: Booking = {
      ...booking,
      id: (bookings.length + 1).toString()
    };
    bookings.push(newBooking);
    return newBooking;
  },
  
  updateBookingStatus: (bookingId: string, status: Booking['status']): Booking | null => {
    const index = bookings.findIndex(b => b.id === bookingId);
    if (index >= 0) {
      bookings[index].status = status;
      return bookings[index];
    }
    return null;
  }
};
