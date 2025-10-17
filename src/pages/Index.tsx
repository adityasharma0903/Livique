// src/pages/Index.jsx
import React, { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  // 1. Define state to hold the search term
  const [searchTerm, setSearchTerm] = useState('');

  // 2. Function to update the search term, passed to the Header
  const handleSearchChange = (term) => {
    // We convert it to lowercase here to ensure case-insensitive filtering
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 3. Pass the setter function to the Header so it can update the state */}
      <Header onSearchChange={handleSearchChange} /> 
      
      <HeroSection />
      
      {/* 4. Pass the current search term to ProductGrid so it can filter the products */}
      <ProductGrid searchTerm={searchTerm} /> 
    </div>
  );
};

export default Index;