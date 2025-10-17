// Header.tsx

import React from 'react';
import { Search, ShoppingCart, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

// 1. Define the props interface, marking onSearchChange as optional
interface HeaderProps {
  onSearchChange?: (term: string) => void;
}

// 2. Assign the props type to the functional component
const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { getTotalItems } = useCart();

  // Handler to call the prop function when the input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 3. Conditional check is still necessary for runtime safety, 
    // but the TypeScript error is solved by the HeaderProps interface.
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top promotional bar */}
      <div className="bg-[#d2b48c] text-black py-2 px-4 text-xs">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3" />
            <span>+91 93505 81175</span>
          </div>
          <div className="hidden md:block text-center flex-1 font-medium">
            Get 50% Off on Selected Items | Shop Now
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b py-3 px-4 md:py-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="text-3xl">🛒</div>
            <span className="text-xl md:text-2xl font-bold text-[hsl(var(--primary))] tracking-tight">
              Livique
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <button className="flex items-center gap-1 hover:text-[hsl(var(--primary))] transition-colors">
              Categories <span>▼</span>
            </button>
            <a href="#" className="hover:text-[hsl(var(--primary))]">
              Deals
            </a>
            <a href="#" className="hover:text-[hsl(var(--primary))]">
              What's New
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full px-4 py-2 border rounded-md pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]"
                // Only attach the handler if onSearchChange was provided
                onChange={onSearchChange ? handleInputChange : undefined}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/cart">
              <Button
  variant="ghost"
  className="relative group bg-transparent hover:bg-transparent p-2" // padding adjust
>
  <ShoppingCart className="h-12 w-12 text-black group-hover:text-gray-500 transition-colors duration-300" />
  {getTotalItems() > 0 && (
    <span className="absolute -top-1 -right-1 bg-[hsl(var(--primary))] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
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