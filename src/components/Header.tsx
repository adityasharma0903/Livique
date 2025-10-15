import { Search, User, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header>
      {/* Top promotional bar */}
      <div className="bg-[#d2b48c] text-black py-2 px-4 text-xs">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>+001234567890</span>
          </div>
          <div className="hidden md:block text-center flex-1">
            Get 50% Off on Selected Items | Shop Now
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-transparent border-none text-black text-xs">
              <option>Eng</option>
            </select>
            <select className="bg-transparent border-none text-black text-xs">
              <option>Location</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-background border-b py-4 px-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="text-2xl">🛒</div>
            <span className="text-xl font-bold">Shopcart</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button className="flex items-center gap-1 hover:text-primary">
              Categories <span>▼</span>
            </button>
            <a href="#" className="hover:text-primary">Deals</a>
            <a href="#" className="hover:text-primary">What's New</a>
            <a href="#" className="hover:text-primary">Delivery</a>
          </nav>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full px-4 py-2 border rounded-md pr-10 text-sm"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
