import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
}

const ProductCard = ({ id, name, price, image, rating, reviews, description }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  return (
    <div className="bg-card rounded-lg border p-4 hover:shadow-lg transition-shadow">
      <div className="relative mb-4">
        <Link to={`/product/${id}`}>
          <img 
            src={image} 
            alt={name} 
            className="w-full h-48 object-contain rounded-md cursor-pointer"
          />
        </Link>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-background rounded-full hover:bg-muted transition-colors border"
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`}
          />
        </button>
      </div>
      
      <div className="space-y-2">
        <Link to={`/product/${id}`}>
          <h3 className="font-semibold text-base hover:text-primary cursor-pointer line-clamp-1">{name}</h3>
        </Link>
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold">Rs {price}</span>
        </div>
        
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < rating ? 'fill-[hsl(var(--rating))] text-[hsl(var(--rating))]' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
        </div>

        {description && (
          <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
        )}

        <Button 
          onClick={handleAddToCart}
          variant="outline" 
          className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" 
          size="sm"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
