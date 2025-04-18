
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Professional, User } from '@/types';
import { Calendar, Clock, Star, Check } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  price: number;
  priceUnit: string; // per hour, per day, etc.
  serviceProvider: {
    user: User;
    professional: Professional;
  };
  availability?: string[];
  onBook: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  priceUnit,
  serviceProvider,
  availability,
  onBook
}) => {
  return (
    <Card className="w-full overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-in">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{serviceProvider.professional.trustScore}</span>
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Avatar className="h-5 w-5 mr-1">
              <AvatarImage src={serviceProvider.user.profileImage} alt={serviceProvider.user.name} />
              <AvatarFallback>
                {serviceProvider.user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{serviceProvider.user.name}</span>
          </div>
          {serviceProvider.user.verified && (
            <Badge variant="secondary" className="flex items-center gap-1 h-5 px-1">
              <Check className="h-3 w-3" />
              <span className="text-xs">Verified</span>
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-2">
          <div className="text-lg font-semibold text-skillink-teal">
            ₹{price} <span className="text-xs text-muted-foreground">{priceUnit}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>{serviceProvider.professional.experience} years exp.</span>
          </div>
        </div>
        
        {availability && (
          <div className="flex items-center text-sm mt-4">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {availability.map((day, index) => (
                <Badge key={index} variant="outline" className="bg-muted/50 px-2 py-0">
                  {day}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={onBook} className="w-full">Book Service</Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
