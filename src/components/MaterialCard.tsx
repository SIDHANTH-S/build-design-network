
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Material } from '@/types';
import { Package, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';

interface MaterialCardProps {
  material: Material;
  onAddToCart: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onAddToCart }) => {
  return (
    <Card className="w-full overflow-hidden group hover:shadow-md transition-all duration-300 animate-fade-in">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={material.image} 
          alt={material.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          className="absolute top-2 right-2"
          variant={material.category === 'Premium' ? 'default' : 'secondary'}
        >
          {material.category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{material.name}</h3>
            <p className="text-sm text-muted-foreground">{material.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-bold text-skillink-teal">
            ₹{material.price}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              per {material.unit}
            </span>
          </div>
          
          {material.inStock ? (
            <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
              <CheckCircle className="h-3 w-3" />
              <span>In Stock</span>
            </Badge>
          ) : (
            <Badge variant="outline" className="flex items-center gap-1 bg-red-50 text-red-700 border-red-200">
              <XCircle className="h-3 w-3" />
              <span>Out of Stock</span>
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Package className="h-4 w-4 mr-1" />
          {material.stockCount !== undefined ? `${material.stockCount} ${material.unit}s available` : 'Limited stock available'}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={onAddToCart} 
          disabled={!material.inStock} 
          className="w-full"
          variant={material.inStock ? 'default' : 'outline'}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {material.inStock ? 'Add to Cart' : 'Notify When Available'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaterialCard;
