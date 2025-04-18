
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Professional } from '@/types';
import { Star, MapPin, Check } from 'lucide-react';

interface ProfileCardProps {
  user: User;
  professional?: Professional;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user, professional }) => {
  return (
    <Card className="w-full overflow-hidden group hover:shadow-md transition-shadow animate-fade-in">
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start mb-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.profileImage} alt={user.name} />
            <AvatarFallback>
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          {user.verified && (
            <Badge variant="secondary" className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              <span>Verified</span>
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg">{user.name}</CardTitle>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{user.location?.city}, {user.location?.state}</span>
        </div>
      </CardHeader>
      
      <CardContent className="pt-4">
        {professional && (
          <>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(professional.trustScore/20) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{professional.trustScore} Trust Score</span>
              </div>
              <span className="text-sm font-medium text-skillink-teal">
                {professional.experience} Years Exp.
              </span>
            </div>
            
            <div className="py-2">
              <p className="text-sm text-muted-foreground mb-2">
                {professional.specialization.join(', ')}
              </p>
              <div className="flex flex-wrap gap-1">
                {professional.skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-muted/50">
                    {skill}
                  </Badge>
                ))}
                {professional.skills.length > 3 && (
                  <Badge variant="outline" className="bg-muted/50">
                    +{professional.skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex gap-2">
        <Button variant="default" className="w-full" asChild>
          <Link to={`/profile/${user.id}`}>View Profile</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/chat/${user.id}`}>Message</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
