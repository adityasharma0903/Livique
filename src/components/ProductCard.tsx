import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  reviews: number;
  description?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  rating,
  reviews,
  description,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();

  // ✅ Add to Cart (normal)
  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your cart.`,
    });
  };

  // ⚡ Buy Now (adds + redirects)
  const handleBuyNow = () => {
    addToCart({ id, name, price, image });
    navigate("/cart"); // Redirect to cart page
  };

  return (
<div className="bg-card rounded-lg border p-3 sm:p-4 hover:shadow-md transition-transform transform hover:-translate-y-1 flex flex-col justify-between h-[320px] sm:h-[400px]">
  {/* Image Section */}
  <div className="relative">
    <Link to={`/product/${id}`}>
      <div className="h-[130px] sm:h-[170px] w-full bg-white flex items-center justify-center rounded-md overflow-hidden">
  <img
    src={image}
    alt={name}
    className="w-full h-full object-contain p-2 cursor-pointer"
  />
</div>

    </Link>

    <button
      onClick={() => setIsWishlisted(!isWishlisted)}
      className="absolute top-2 right-2 p-2 bg-background rounded-full hover:bg-muted transition-colors border"
    >
      <Heart
        className={`h-4 w-4 ${
          isWishlisted
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground"
        }`}
      />
    </button>
  </div>

  {/* Content Section */}
  <div className="mt-3 flex flex-col items-center text-center space-y-2">
    <Link to={`/product/${id}`}>
      <h3 className="font-semibold text-sm sm:text-base hover:text-primary cursor-pointer line-clamp-1">
        {name}
      </h3>
    </Link>

    <span className="text-lg font-bold">Rs {price}</span>

    {/* Hide rating & desc on mobile */}
    <div className="hidden sm:flex items-center justify-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${
            i < rating
              ? "fill-[hsl(var(--rating))] text-[hsl(var(--rating))]"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">
        ({reviews})
      </span>
    </div>

    {description && (
      <p className="hidden sm:block text-xs text-muted-foreground line-clamp-2">
        {description}
      </p>
    )}

    {/* Buttons Section (always visible) */}
    <div className="flex flex-col sm:flex-row gap-2 w-full mt-2">
      <Button
        onClick={handleAddToCart}
        variant="outline"
        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground text-xs sm:text-sm"
        size="sm"
      >
        Add to Cart
      </Button>

      <Button
        onClick={handleBuyNow}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm"
        size="sm"
      >
        Buy Now
      </Button>
    </div>
  </div>
</div>


  );
};

export default ProductCard;
