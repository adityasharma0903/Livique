import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-woman.jpg";

const HeroSection = () => {
  return (
    <section className="bg-[hsl(var(--hero-bg))]">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Grab Upto 50% Off On<br />
              Selected Headphone
            </h1>
            <Button size="lg" className="px-8 rounded-full">
              Buy Now
            </Button>
          </div>
          <div className="flex-1 flex justify-end">
            <img 
              src={heroImage} 
              alt="Woman wearing headphones" 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
