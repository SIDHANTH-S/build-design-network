
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { dataService } from '@/services/mockData';
import { Professional } from '@/types';
import { Search as SearchIcon, Filter, MapPin, CheckSquare } from 'lucide-react';

const Search: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedVerification, setSelectedVerification] = useState<string>('all');
  
  useEffect(() => {
    // Load professionals
    const profs = dataService.getProfessionals();
    setProfessionals(profs);
  }, []);
  
  // Get unique specializations
  const specializations = ['all', ...new Set(
    professionals.flatMap(p => p.specialization)
  )];
  
  // Get unique locations
  const locations = ['all', ...new Set(
    professionals.map(p => {
      const user = dataService.getUserById(p.userId);
      return user?.location?.city || '';
    }).filter(city => city !== '')
  )];
  
  // Filter professionals based on search and filters
  const filteredProfessionals = professionals.filter(p => {
    const professionalUser = dataService.getUserById(p.userId);
    if (!professionalUser) return false;
    
    // Search term filter
    const matchesSearch = 
      searchTerm === '' || 
      professionalUser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.specialization.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      p.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Specialization filter
    const matchesSpecialization = 
      selectedSpecialization === 'all' || 
      p.specialization.includes(selectedSpecialization);
    
    // Location filter
    const matchesLocation = 
      selectedLocation === 'all' || 
      professionalUser.location?.city === selectedLocation;
    
    // Verification filter
    const matchesVerification = 
      selectedVerification === 'all' ||
      (selectedVerification === 'verified' && professionalUser.verified) ||
      (selectedVerification === 'unverified' && !professionalUser.verified);
    
    return matchesSearch && matchesSpecialization && matchesLocation && matchesVerification;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Find Professionals</h1>
          <p className="text-muted-foreground">Discover verified professionals for your construction needs</p>
        </div>
        
        <Card className="mb-8 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, specialization, or skills"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-48">
                  <Select 
                    value={selectedSpecialization} 
                    onValueChange={setSelectedSpecialization}
                  >
                    <SelectTrigger>
                      <span className="flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Specialization" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {specializations.map((spec) => (
                        <SelectItem key={spec} value={spec}>
                          {spec === 'all' ? 'All Specializations' : spec}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={selectedLocation} 
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Location" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc === 'all' ? 'All Locations' : loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <Select 
                    value={selectedVerification} 
                    onValueChange={setSelectedVerification}
                  >
                    <SelectTrigger>
                      <span className="flex items-center">
                        <CheckSquare className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Verification" />
                      </span>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Professionals</SelectItem>
                      <SelectItem value="verified">Verified Only</SelectItem>
                      <SelectItem value="unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in delay-200">
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((professional) => {
              const professionalUser = dataService.getUserById(professional.userId);
              if (!professionalUser) return null;
              
              return (
                <ProfileCard 
                  key={professional.userId}
                  user={professionalUser}
                  professional={professional}
                />
              );
            })
          ) : (
            <div className="col-span-3 text-center py-16">
              <SearchIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No professionals found</h3>
              <p className="text-muted-foreground mb-4">
                Try changing your search criteria or filters
              </p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedSpecialization('all');
                setSelectedLocation('all');
                setSelectedVerification('all');
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
