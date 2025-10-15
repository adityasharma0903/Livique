import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FilterBar from "@/components/FilterBar";
import ProductGrid from "@/components/ProductGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FilterBar />
      <ProductGrid />
    </div>
  );
};

export default Index;
